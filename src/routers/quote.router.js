

const express = require('express');
const { userAuthorization } = require('../middlewares/authorization.middleware');
const {getQuoteById, insertQuote, getQuotes, updateQuote, deleteQuote } = require('../modal/quote/Quote.modal');
const router = express.Router();




router.all('/', (req, res, next) => {

    // res.json({message:"Booking details"});


    next()
})


//Create new Quote
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

//Get Quote by id
router.get("/:_id", async (req, res) => {
    const { _id } = req.params;

    try {


        const clientId = req.userId;
        const result = await getQuoteById(_id);


        return res.json({
            status: "success",
            result,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});

router.put("/:_id", async (req, res) => {
    try {
        // const { modifier, updates, name, email, street, suburb, postcode, state, phone, bookingDate } = req.body
        const updateQuoteObj = req.body
        const { _id } = req.params;


        const userId = req.userId

        const updatedBookingObj = {
            clientId: _id,
           updateQuoteObj
        }


        const result = await updateQuote(updatedBookingObj);

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
      // Delete a quoet
      router.delete("/:_id",  async (req, res) => {
        try {
          const { _id } = req.params;
          const clientId = req.userId;
      
          const result = await deleteQuote({ _id, clientId });
      
          return res.json({
            status: "success",
            message: "The quote has been deleted",
          });
        } catch (error) {
          res.json({ status: "error", message: error.message });
        }
      });

module.exports = router