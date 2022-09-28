const {BookingSchema} = require ('./Booking.schema')


const insertBooking = async (bookingObj) => {
  let maya = await getBookings()
  laya = maya.length
     bookingObj.bookingReference='WD' + laya + 1
  console.log('hey', bookingObj)
    return new Promise ((resolve, reject) => {
            BookingSchema(bookingObj)
                .save()
                .then((data) => resolve(data))
                .catch(error=> reject(console.log(error)));
            
            
        })
    
    }
const getBookings = (clientId) => {
    return new Promise ((resolve, reject) => {
        try { 
            BookingSchema
                .find({}, {name:1, email:1, phone:1})
                .then((data) => {
                    resolve(data)
                })
                .catch((error) => reject(error))

        } catch (error) {
            reject(error)
        }
    })
}
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

    return new Promise((resolve, reject) => {
      try {
        BookingSchema.findOneAndUpdate(
          updateBookingObj._id,
          {
            $set: updateBookingObj
          },
        
            {new:true }
            )
          .then((data) => resolve(data))
         
          .catch((error) => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  };

  

module.exports = { insertBooking, getBookings, getBookingById, updateBookingNotes}  




