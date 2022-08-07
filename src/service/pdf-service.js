

const PDFDocument = require("pdfkit");

const invoice = {
    shipping: {
        name: "John Doe",
        address: "1234 Main Street",
        city: "San Francisco",
        state: "CA",
        country: "US",
        postal_code: 94111
    },
    items: [
        {
            item: "TC 100",
            description: "Toner Cartridge",
            quantity: 2,
            amount: 6000
        },
        {
            item: "USB_EXT",
            description: "USB Cable Extender",
            quantity: 1,
            amount: 2000
        }
    ],
    subtotal: 8000,
    paid: 0,
    invoice_nr: 1234
};
function generateHeader(doc) {
    doc
        // .image("logo.png", 50, 45, { width: 50 })
        .fillColor("#444444")
        .fontSize(20)
        .text("WeDo Services", 110, 57)
        .fontSize(10)
        .text("WeDo Cleaning Services", 200, 50, { align: "right" })
        .text("90 The Boulevarde", 200, 65, { align: "right" })
        .text("Strathfield, NSW, 2135", 200, 80, { align: "right" })
        .moveDown();
}

function generateCustomerInformation(doc, item) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Invoice", 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;

    doc
        .fontSize(10)
        .text("Quote Number:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(item.quoteReference, 150, customerInformationTop)
        .font("Helvetica")
        .text("Quote Date:", 50, customerInformationTop + 15)
        .text(formatDate(new Date()), 150, customerInformationTop + 15)
        .text("Balance Due:", 50, customerInformationTop + 30)
        // .text(
        //   formatCurrency(invoice.subtotal - invoice.paid),
        //   150,
        //   customerInformationTop + 30
        // )

        .font("Helvetica-Bold")
        .text(item.name, 300, customerInformationTop)
        .font("Helvetica")
        .text('Hornsby', 300, customerInformationTop + 15)
        .text(
            'Sydney' +
            ", " +
            'NSW' +
            ", " +
            'Australia',
            300,
            customerInformationTop + 30
        )
        .moveDown();

    generateHr(doc, 252);
}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}


function generateInvoiceTable(doc, item) {
    let i;
    const invoiceTableTop = 330;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Item",
        "Description",
        "Unit Cost",
        "Quantity",
        "Line Total"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");
    for (i = 0; i < item.products.length; i++) {
        const maya = item.products[i]
        // const cha = item.products[i].quantity > 0 && item.products[i] 
        const position = maya.quantity > 0 ? invoiceTableTop + (i + 1) * 30 : invoiceTableTop - (i - 1) * -30
        maya.quantity >= 1 ? generateTableRow(
            doc,
            position,
            maya.item,
            maya.description,
            formatCurrency(maya.amount / maya.quantity),
            maya.quantity,
            formatCurrency(maya.amount)
        ): null
        maya.quantity >= 1 && generateHr(doc, position + 20);
    }



    // const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    // generateTableRow(
    //     doc,
    //     subtotalPosition,
    //     "",
    //     "",
    //     "Subtotal",
    //     "",
    //     formatCurrency(maya.subtotal)
    // );

    // const paidToDatePosition = subtotalPosition + 20;
    // generateTableRow(
    //     doc,
    //     paidToDatePosition,
    //     "",
    //     "",
    //     "Paid To Date",
    //     "",
    //     formatCurrency(invoice.paid)
    // );

    // const duePosition = paidToDatePosition + 25;
    // doc.font("Helvetica-Bold");
    // generateTableRow(
    //     doc,
    //     duePosition,
    //     "",
    //     "",
    //     "Balance Due",
    //     "",
    //     formatCurrency(invoice.subtotal - invoice.paid)
    // );
    // doc.font("Helvetica");
}

function buildPDF(item, dataCallback, endCallback) {

    let doc = new PDFDocument({ size: "A4", margin: 50 });
    doc.on('data', dataCallback);
    generateHeader(doc);
    generateCustomerInformation(doc, item);
    generateInvoiceTable(doc, item);
    generateFooter(doc);
    doc.on('end', endCallback);
    doc.end();
}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text(
            "Payment is due within 15 days. Thank you for your business.",
            50,
            780,
            {
                align: "center",
                width: 500
            }
        );
}

function generateTableRow(
    doc,
    y,
    item,
    description,
    unitCost,
    quantity,
    lineTotal
) {
    doc
        .fontSize(10)
        .text(item, 50, y)
        .text(description, 150, y)
        .text(unitCost, 280, y, { width: 90, align: "right" })
        .text(quantity, 370, y, { width: 90, align: "right" })
        .text(lineTotal, 0, y, { align: "right" });
}



function formatCurrency(cents) {
    if (!cents) {
        return null
    } else {
        return "$" + (cents / 100).toFixed(2);
    }
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return year + "/" + month + "/" + day;
}

module.exports = {
    buildPDF
};
