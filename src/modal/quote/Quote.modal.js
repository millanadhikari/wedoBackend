const { quoteEmailProcessor } = require("../../helpers/email.helper");
const { QuoteSchema } = require("./Quote.Schema");


const getQuotes = (clientId) => {
  return new Promise((resolve, reject) => {
    try {
      QuoteSchema
        .find({}, { name: 1, email: 1, phone: 1, service: 1, quoteReference: 1, quoteStatus: 1, subtotal: 1 })
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

  const finalPrice = async (products) => {
    let mero = []
    let paisa = 0
    await products.map((item) => {
      item.quantity > 0 &&
        mero.push(item.quantity * item.amount)
    })
    paisa = mero.length > 0 && mero.reduce(function (acc, val) {
      return acc + val;
    });
    // console.log(parseInt(paisa))
    return parseInt(paisa)

  }
  const products = [
    {
      item: "TC 98",
      description: "Bedrooms",
      quantity: quoteObj.bedrooms,
      amount: quoteObj.quantity > 1 ? 10000 : 15000
    },
    {
      item: "TC 99",
      description: "Bathrooms",
      quantity: quoteObj.bathrooms,
      amount: 6000
    },
    {
      item: "TC 100",
      description: "Balcony",
      quantity: quoteObj.balcony,
      amount: 4000
    },

    {
      item: "TC 101",
      description: "Separate Toilet",
      quantity: quoteObj.separateToilet,
      amount: 6000
    },

    {
      item: "TC 102",
      description: "Study Room",
      quantity: quoteObj.studyRoom,
      amount: 5000
    },

    {
      item: "TC 103",
      description: "Wall Wash",
      quantity: quoteObj.wallWash,
      amount: 5000
    },

    {
      item: "TC 104",
      description: "Fridge",
      quantity: quoteObj.fridge,
      amount: 6000
    },

    {
      item: "TC 105",
      description: "Garage",
      quantity: quoteObj.garage,
      amount: 6000
    },

    {
      item: "TC 106",
      description: "Blinds",
      quantity: quoteObj.blinds,
      amount: 6000
    },

    {
      item: "TC 107",
      description: "Steam Living",
      quantity: quoteObj.steamLiving,
      amount: 6000
    },
    {
      item: "TC 108",
      description: "Steam Bedroom",
      quantity: quoteObj.steamBedroom,
      amount: 6000
    },
    {
      item: "TC 109",
      description: "steamBedroom",
      quantity: quoteObj.steamBedroom,
      amount: 6000
    },
    {
      item: "TC 110",
      description: "steamStairs",
      quantity: quoteObj.steamStairs,
      amount: 6000
    },
    {
      item: "TC 111",
      description: "steamHallway",
      quantity: quoteObj.steamHallway,
      amount: 6000
    },

  ]
  const oldObj = {
    name: quoteObj.name,
    email: quoteObj.email,
    phone: quoteObj.phone,
    service: quoteObj.service,
    bedrooms: quoteObj.bedrooms,
    bathrooms: quoteObj.bathrooms,
    products: products,
    timelines: [
      {
        id: 01,
        title: 'Quote Created',
        date: new Date(),
        createdBy: "Web",
        icon: "AiOutlinePlusCircle"
      }
    ],
    subtotal: await finalPrice(products),
    paid: 0,
    invoice_nr: 1234,
    quoteReference: 'WD' + laya + 1
  }
  return new Promise((resolve, reject) => {

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
  console.log('bhaiya', updateQuoteObj)

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
module.exports = { insertQuote, getQuotes, getQuoteById, updateQuote, deleteQuote }