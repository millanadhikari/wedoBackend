const express = require('express');
const { insertBlog, getBlog } = require('../modal/blog/Blog.modal');
const router = express.Router();
const {autoComplete} = require ('../openai/openAi')

router.all('/', (req, res, next) => {

    // res.json({message:"Booking details"});


    next()
})



//Create new blog
router.post("/", async (req, res) => {
    const question = req.body
    try {


        const result = await autoComplete(question)
        // result.paidStatus && await bookingEmailProcessor(bookingObj)

        // if (result._id) {
        //     res.json({ status: "success", message: "New Blog created successfully!!!" })
        // } else {
        //     console.log(error)
        // }

            res.json({ answer: result, message: "New Blog created successfully!!!" })

    }
    catch (error) {
        res.json({ status: "error", message: "Unable to create new Blog, please try again later" })
    }
})

router.get("/all", async (req, res) => {


    try {

        const result = await getBlog();

        let paginatedResults = result.reverse()




        return res.json({
            status: "success",
            paginatedResults
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});


module.exports = router



