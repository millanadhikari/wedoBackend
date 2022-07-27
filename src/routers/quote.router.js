

const express = require('express');
const { insertQuote, getQuotes } = require('../modal/quote/Quote.modal');
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

//Get all the quotes for a specific user

router.get("/all", async (req, res) => {
    const page = req.query.page
    const limit = req.query.limit
    const search = req.query.search
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const keys = ["name", "email"]
    const tsearch = (data) => {
        return data.filter((item) => 
        keys.some((key) => item[key].toLowerCase().includes(search))
        )
    }

    try {
        const userId = req.userId;
        const result = await getQuotes(userId);


        next = {
            page: page * 1 + 1,
            limit: limit,

        }

        previous = {
            page: page - 1,
            limit: limit,

        }
            let paginatedResults = result

            if(search) {
                paginatedResults = tsearch(result)
            } else {
            paginatedResults = result.slice(startIndex, endIndex)
            }

      
             totalPages = Math.ceil(result.length / limit)

        
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

module.exports = router