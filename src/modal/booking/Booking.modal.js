const { BookingSchema } = require('./Booking.schema')


const insertBooking = async (bookingObj) => {
  console.log('shankar', bookingObj)
  let maya = await getBookings()
  laya = maya.length
  bookingObj.bookingReference = 'WD' + laya + 1
  console.log('hey', bookingObj)
  return new Promise((resolve, reject) => {
    BookingSchema(bookingObj)
      .save()
      .then((data) => resolve(data))
      .catch(error => reject(console.log(error)));


  })

}
const getBookings = (clientId) => {
  return new Promise((resolve, reject) => {
    try {
      BookingSchema
        .find({}, { firstName: 1, assignedTech: 1, lastName: 1, email: 1, phone: 1, service: 1, address1: 1, address2: 1, city: 1, state: 1, postcode: 1, bookingReference: 1, bookingStatus: 1, assignedTech: 1, subtotal: 1, bookingDate: 1 })
        .then((data) => {
          resolve(data)
        })
        .catch((error) => reject(error))

    } catch (error) {
      reject(error)
    }
  })
}
const getBookingByFilter = (bookingDate, to) => {
  console.log('hy', bookingDate.slice(0, bookingDate.length + 1))
  let lx = '2022-12-30'
  let tomorrow = new Date(bookingDate)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return new Promise((resolve, reject) => {
    try {
      BookingSchema.find({
        bookingDate: { $gte: bookingDate, $lte: to }
      })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};



const getBookingByDesired = (filter, word) => {
  let field = filter
  let value = word
  let liter = {}
  liter[field] = value
  return new Promise((resolve, reject) => {
    try {
      BookingSchema.find(liter
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getBookingById = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      BookingSchema.find({ _id })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const updateBookingNotes = (updateBookingObj) => {
  let _id = updateBookingObj._id
  console.log('lamadev', updateBookingObj)
  return new Promise((resolve, reject) => {
    try {
      BookingSchema.findOneAndUpdate(
        { _id },
        {
          $set: updateBookingObj.updateBookingObj
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

const deleteBooking = ({ _id, clientId }) => {
  return new Promise((resolve, reject) => {
    try {
      BookingSchema.findOneAndDelete({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};




module.exports = { getBookingByFilter, insertBooking, getBookings, getBookingById, updateBookingNotes, deleteBooking, getBookingByDesired }




