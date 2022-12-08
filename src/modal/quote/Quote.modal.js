const { quoteEmailProcessor } = require("../../helpers/email.helper");
const { QuoteSchema } = require("./Quote.Schema");


const getQuotes = (clientId) => {
  return new Promise((resolve, reject) => {
    try {
      QuoteSchema
        .find({}, { firstName: 1, lastName: 1, email: 1, phone: 1, service: 1, quoteReference: 1, quoteStatus: 1, subtotal: 1, createdAt: 1 })
        .then((data) => {
          resolve(data)
        })
        .catch((error) => reject(error))

    } catch (error) {
      reject(error)
    }
  })
}


const insertQuote = async (quoteObj) => {
  let maya = await getQuotes()
  laya = maya.length
  let calculateProduct = quoteObj.products

  const finalPrice = async () => {
    let mero = []
    let paisa = 0
    await quoteObj.products.map((item) => {
      item.quantity > 0 &&
        mero.push(item.quantity * item.price)
    })
    paisa = mero.length > 0 && mero.reduce(function (acc, val) {
      return acc + val;
    });
    console.log(parseInt(paisa))
    return parseInt(paisa)

  }
  const oldObj = {
    firstName: quoteObj.firstName,
    lastName: quoteObj.lastName,
    email: quoteObj.email,
    phone: quoteObj.phone,
    service: quoteObj.service,
    bedrooms: quoteObj.bedrooms,
    bathrooms: quoteObj.bathrooms,
    address1: quoteObj.address1,
    address2: quoteObj.address2,
    city: quoteObj.city,
    state: quoteObj.state,
    postcode: quoteObj.postcode,
    products: quoteObj.products,
    startHour: quoteObj.startHour,
    startMin: quoteObj.startMin,
    startMode: quoteObj.startMode,
    endHour: quoteObj.endHour,
    endMin: quoteObj.endMin,
    endMode: quoteObj.endMode,
    timelines: [
      {
        id: 01,
        title: 'Quote Created',
        date: new Date(),
        createdBy: "Web",
        icon: "AiOutlinePlusCircle"
      }
    ],
    subtotal: await finalPrice(),
    paid: 0,
    invoice_nr: 1234,
    bookingDate: quoteObj?.bookingDate ? quoteObj.bookingDate : new Date(),
    quoteReference: 'WD' + laya + 1
  }
  return new Promise((resolve, reject) => {
    console.log(oldObj)
    QuoteSchema(oldObj)

      .save()
      .then((data) => resolve(data))
      .catch(error => console.log(error))


  })

}


const getQuoteById = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      QuoteSchema.find({ _id })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const updateQuote = (updateQuoteObj) => {
  let _id = updateQuoteObj._id
  console.log('bhaiya', updateQuoteObj.updateQuoteObj)

  return new Promise((resolve, reject) => {
    try {
      QuoteSchema.findOneAndUpdate(
        { _id },
        {
          $set: updateQuoteObj.updateQuoteObj
        },

        { new: true }
      )
        .then((data) => resolve(data))

        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const deleteQuote = ({ _id, clientId }) => {
  return new Promise((resolve, reject) => {
    try {
      QuoteSchema.findOneAndDelete({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const deleteQuotes = ({ _id, clientId }) => {
  const objects = { ..._id }
  return new Promise((resolve, reject) => {
    try {
      QuoteSchema.deleteMany({
        _id: {
          $in: _id
        }
      },)
        .then((data) => console.log(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { insertQuote, getQuotes, getQuoteById, updateQuote, deleteQuote, deleteQuotes }