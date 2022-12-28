const express = require('express');
const { insertBlog, getBlog } = require('../modal/blog/Blog.modal');
const router = express.Router();


router.all('/', (req, res, next) => {

    // res.json({message:"Booking details"});


    next()
})



//Create new blog
router.post("/", async (req, res) => {
    const blogObj = req.body
    try {


        const result = await insertBlog(blogObj)
        // result.paidStatus && await bookingEmailProcessor(bookingObj)

        if (result._id) {
            res.json({ status: "success", message: "New Blog created successfully!!!" })
        } else {
            console.log(error)
        }



    }
    catch (error) {
        res.json({ status: "error", message: "Unable to create new Blog, please try again latedr" })
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



