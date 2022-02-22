    const express = require('express')
    const router = express.Router();
    const { insertBooking, getBookings, getBookingById, updateBookingNotes } = require("../modal/booking/Booking.modal")
    const { userAuthorization } = require("../middlewares/authorization.middleware")

    router.all('/', (req, res, next) => {

        // res.json({message:"Booking details"});


        next()
})


// Adding a new booking

router.post("/", userAuthorization, async (req, res) => {

    try {
        const { name, email, address, phone, bookingDate, products, totalPrice, paidStatus, jobStatus, stripeData } = req.body
        const userId = req.userId

        const bookingObj = {
            clientId: userId,
            name,
            email,
            address,
            phone,
            totalPrice, 
            paidStatus, 
            jobStatus,
            bookingDate,
            products,
            stripeData
        }
        console.log(bookingObj)
        const result = await insertBooking(bookingObj)


        if (result._id) {
            return res.json({ status: "success", message: "Booking has been created!!!" })
        }

        res.json({ status: "error", message: "Unable to create new Booking Again, please try again later" })

    }
    catch (error) {
        res.json({ status: "error", message: "Unable to create new Booking, please try again latedr" })
    }
})

// //Get all the Patients
// router.get("/patient", userAuthorization, async (req, res) => {
//     try {
//         const userId = req.userId;

//         const result = await getPatients(userId)

//         return res.json({ status: "success", result })

//     } catch (error) {
//         res.json({ status: "error", message: error.message })
//     }

// })

//Get all the bookings for a specific user

router.get("/all",  async (req, res) => {
   const page = req.query.page
   const limit = req.query.limit

   const startIndex = (page - 1) * limit
   const endIndex = page * limit
    try {
      const userId = req.userId;
      const result = await getBookings(userId);


      next = {
          page:page * 1 + 1,
          limit : limit,
         
      }

      previous = {
        page:page - 1,
        limit : limit,
       
    }
      paginatedResults = result.slice(startIndex, endIndex)
      totalPages = Math.ceil(result.length / limit)
      
      return res.json({
        status:"success",
        next,
        totalPages,
        previous,
        paginatedResults
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  });
router.get("/:_id", userAuthorization, async (req, res) => {
    try {


        const clientId = req.userId;
        const result = await getBookingById(clientId);


        return res.json({
            status: "success",
            result,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});

//Update booking details.

router.put("/:_id", userAuthorization, async (req, res) => {
    try {
        const { modifier, updates, name, email, street, suburb, postcode, state, phone, bookingDate } = req.body
        const { _id } = req.params;

        const userId = req.userId

        const updatedBookingObj = {
            clientId: _id,
            name,
            email,
            street,
            suburb,
            postcode,
            state,
            phone,
            bookingDate,
            modifier,
            updates
        }


        const result = await updateBookingNotes(updatedBookingObj);

        if (result._id) {
            return res.json({
                status: "success",
                message: "your bookings updated",
            });
        }
        res.json({ status: "error", message: "Unable to update your message please try again later" })

    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});


module.exports = router



