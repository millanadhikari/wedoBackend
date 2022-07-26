

const express = require('express');
const { insertQuote } = require('../modal/quote/Quote.modal');
const router = express.Router();




router.all('/', (req, res, next) => {

    // res.json({message:"Booking details"});


    next()
})

router.post("/", async (req, res) => {
    console.log(req.body)

    try {
        const {
            fullName,
            email,
            phone,
            service,
            address,
            bedrooms,
            bathrooms,
            balcony,
            separateToilet,
            studyRoom,
            wallWash,
            fridge,
            garage,
            blinds,
            steamLiving,
            steamHallway,
            steamBedroom,
            steamStairs,

        
        } = req.body
        const userId = req.userId

        const quoteObj = {
            name:fullName,
            email,
            phone,
            service,
            bedrooms,
            bathrooms,
            balcony,
            separateToilet,
            studyRoom,
            wallWash,
            fridge,
            garage,
            blinds,
            steamLiving,
            steamHallway,
            steamBedroom,
            steamStairs,
        }
        const result = await insertQuote(quoteObj)
        // result.paidStatus && await bookingEmailProcessor(bookingObj)

        if (result._id) {
            res.json({ status: "success", message: "New Quote created successfully!!!" })
        } else {
            console.log(error)
        }

        

    }
    catch (error) {
        res.json({ status: "error", message: "Unable to create new Booking, please try again latedr" })
    }
})


module.exports = router