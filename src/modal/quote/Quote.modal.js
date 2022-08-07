const { QuoteSchema } = require("./Quote.Schema");


const data = [
  {
    id: 123,
    title: "Study Room",
    quantity: 0,
    complete: false,
    price: 50,
  },
  {
    id: 223,
    title: "Laundry",
    quantity: 0,
    complete: false,
    price: 50,
  },
  {
    id: 323,
    title: "Separate Toilet",
    quantity: 0,
    complete: false,
    price: 50,
  },
  {
    id: 423,
    title: "Balcony",
    quantity: 0,
    complete: false,
    price: 40,
  },
  {
    id: 523,
    title: "Blinds",
    quantity: 0,
    complete: false,
    price: 40,
  },
  {
    id: 623,
    title: "Walls",
    quantity: 0,
    complete: false,
    price: 30,
  },
];
const getQuotes = (clientId) => {
  return new Promise((resolve, reject) => {
    try {
      QuoteSchema
        .find({}, { name: 1, email: 1, phone: 1, service: 1 })
        .then((data) => {
          resolve(data)
        })
        .catch((error) => reject(error))

    } catch (error) {
      reject(error)
    }
  })
}

// const priceCalculator = async (quoteObj) => {
//     return new Promise((resolve, reject) => {
//         try {
//          data.map((item, i) => {})
//             .then((data) => resolve(data))
//             .catch((error) => reject(error));
//         } catch (error) {
//           reject(error);
//         }
//       });
//     };
const insertQuote = async (quoteObj) => {
  let maya = await getQuotes()
  laya = maya.length


  return new Promise((resolve, reject) => {
    const newObj = {
      name: quoteObj.name,
      email: quoteObj.email,
      phone: quoteObj.phone,
      service: quoteObj.service,
      bedrooms: quoteObj.bedrooms,
      bathrooms: quoteObj.bathrooms,
      balcony: quoteObj.balcony,
      separateToilet: quoteObj.separateToilet,
      studyRoom: quoteObj.studyRoom,
      wallWash: quoteObj.wallWash,
      fridge: quoteObj.fridge,
      garage: quoteObj.garage,
      blinds: quoteObj.blinds,
      steamLiving: quoteObj.steamLiving,
      steamHallway: quoteObj.steamHallway,
      steamBedroom: quoteObj.steamBedroom,
      steamStairs: quoteObj.steamStairs,
      quoteReference: 'WD' + laya + 1
    }
    const oldObj = {
      name: quoteObj.name,
      email: quoteObj.email,
      phone: quoteObj.phone,
      service: quoteObj.service,
      bedrooms: quoteObj.bedrooms,
      bathrooms: quoteObj.bathrooms,
      products: [

        {
          item: "TC 100",
          description: "Balcony",
          quantity: quoteObj.balcony,
          amount: 6000
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
          amount: 6000
        },

        {
          item: "TC 103",
          description: "Wall Wash",
          quantity: quoteObj.wallWash,
          amount: 6000
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

      ],
      quoteReference: 'WD' + laya + 1
    }
    console.log(oldObj)

    QuoteSchema(oldObj)

      .save()
      .then((data) => resolve(data))
      .catch(error => console.log(error));

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

  return new Promise((resolve, reject) => {
    try {
      QuoteSchema.findOneAndUpdate(
        updateQuoteObj._id,
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