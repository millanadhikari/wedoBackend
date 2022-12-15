const express = require('express')
const router = express.Router();
const { insertBooking, getBookings, getBookingById, updateBookingNotes } = require("../modal/booking/Booking.modal")
const { userAuthorization } = require("../middlewares/authorization.middleware")
const { bookingEmailProcessor } = require("../helpers/email.helper");
const { getQuoteById, updateQuote } = require('../modal/quote/Quote.modal');
const connectDB = require('../db/mongoose');

router.all('/', (req, res, next) => {

    // res.json({message:"Booking details"});


    next()
})


// Adding a new booking

// router.post("/", async (req, res) => {
//     console.log(req.body)

//     try {
//         const {
//             name,
//             email,
//             bookingDate,
//             selectedService,
//             address,
//             postcode,
//             phone,
//             toilets,
//             bedrooms,
//             addonPrice,
//             totalPrice,
//             products,
//             stripeData,
//             paidStatus,
//             jobStatus

//         } = req.body
//         const userId = req.userId

//         const bookingObj = {
//             clientId: userId,
//             name,
//             email,
//             bookingDate,
//             selectedService,
//             address,
//             postcode,
//             phone,
//             toilets,
//             bedrooms,
//             addonPrice,
//             totalPrice,
//             products,
//             stripeData,
//             paidStatus,
//             jobStatus
//         }
//         const result = await insertBooking(bookingObj)
//         // result.paidStatus && await bookingEmailProcessor(bookingObj)

//         if (result._id) {
//             await bookingEmailProcessor({ bookingObj })
//         }

//         res.json({ status: "success", message: "New booking created successfully!!!" })

//     }
//     catch (error) {
//         res.json({ status: "error", message: "Unable to create new Booking, please try again latedr" })
//     }
// })

//Add booking by quote
router.post("/:_id", async (req, res) => {
    try {
        const userId = req.userId;
        const { _id } = req.params
        const sult = await getQuoteById(_id);
        const lookingObj = sult[0]
        //   const bookingObj = {
        //     quote_id : lookingObj._id,
        //     name: lookingObj.name,
        //     email: lookingObj.email,
        //     service: lookingObj.service,
        //     bedrooms: lookingObj.bedrooms,
        //     bathrooms: lookingObj.bathrooms,
        //     products:lookingObj.products,
        //     timelines:lookingObj.timelines,
        //     notes:lookingObj.notes,
        //     phone: lookingObj.phone,
        //     subtotal: lookingObj.subtotal,
        //     paid: lookingObj.paid,
        //     invoice_inr: lookingObj.invoice_inr,
        //     quoteReference: lookingObj.quoteReference,
        //     quoteCreatedAt: lookingObj.createdAt,

        //   }

        const bookingObj = {
            quote_id: lookingObj._id,
            firstName: lookingObj.firstName,
            lastName: lookingObj?.lastName,
            email: lookingObj.email,
            service: lookingObj.service,
            address1: lookingObj.address1,
            address2: lookingObj.address2,
            city: lookingObj.city,
            state: lookingObj.state,
            postcode: lookingObj.postcode,
            bookingStatus: "Not Started",
            bookingDate: lookingObj.bookingDate,
            bedrooms: lookingObj.bedrooms,
            bathrooms: lookingObj.bathrooms,
            products: lookingObj.products,
            timelines: [
                ...lookingObj.timelines,
                {
                    id: 02,
                    title: 'Booking Created',
                    date: new Date(),
                    createdBy: "Admin",
                    icon: "AiOutlinePlusCircle"
                }],
            notes: lookingObj.notes,
            phone: lookingObj.phone,
            subtotal: lookingObj.subtotal,
            paid: lookingObj.paid,
            invoice_inr: lookingObj.invoice_inr,
            quoteReference: lookingObj.quoteReference,
            quoteCreatedAt: lookingObj.createdAt,
            startHour: lookingObj.startHour,
            startMin: lookingObj.startMin,
            startMode: lookingObj.startMode,
            endHour: lookingObj.endHour,
            endMin: lookingObj.endMin,
            endMode: lookingObj.endMode,



        }

        const updatedQuotesObj = {
            _id,
            quoteStatus: 'Scheduled',
            timelines: [
                ...lookingObj.timelines,
                {
                    id: 02,
                    title: 'Booking Created',
                    date: new Date(),
                    createdBy: "Admin",
                    icon: "AiOutlinePlusCircle"
                }],
        }

        const result = await insertBooking(bookingObj)

        updateQuote(updatedQuotesObj);

        return res.json({
            status: "success",
            message: "Booking succesfully created",
            bookingReference: result.bookingReference,
        });
    } catch (error) {
        res.json({ status: "error", message: error });
    }
});

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

router.get("/all", async (req, res) => {
    const page = req.query.page
    const limit = req.query.limit
    const { search } = req.query
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const keys = ["firstName", "email"]

    const tsearch = (data) => {
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(search.toLowerCase()))
        );
    };

    try {
        const userId = req.userId;
        const result = await getBookings(userId);


        next = {
            page: page * 1 + 1,
            limit: limit,

        }

        previous = {
            page: page - 1,
            limit: limit,

        }

        let paginatedResults = result.reverse()
        if (search) {
            paginatedResults = tsearch(result)

        }

        else {
            paginatedResults = result.slice(startIndex, endIndex)
        }



        totalPages = Math.ceil(result.length / limit)


        // paginatedResults = result.slice(startIndex, endIndex)
        // totalPages = Math.ceil(result.length / limit)

        return res.json({
            status: "success",
            next,
            totalPages,
            previous,
            paginatedResults
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});

// Get a booking by its id
router.get("/:_id",  async (req, res) => {
    const { _id } = req.params;

    try {


        const clientId = req.userId;
        const result = await getBookingById(_id);


        return res.json({
            status: "success",
            result,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});

//Update booking details.

router.put("/:_id", async (req, res) => {
    try {
        // const { modifier, updates, name, email, street, suburb, postcode, state, phone, bookingDate } = req.body
        const updateBookingObj = req.body
        const { _id } = req.params;

        const userId = req.userId

        
        const updatedBookingObj = {
            _id,
            updateBookingObj
        }
        // const updatedBookingObj = {
        //     clientId: _id,
        //     name,
        //     email,
        //     street,
        //     suburb,
        //     postcode,
        //     state,
        //     phone,
        //     bookingDate,
        //     modifier,
        //     updates
        // }


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



