const express = require('express')
const router = express.Router();
const { userAuthorization } = require("../middlewares/authorization.middleware")


const connectDB = require('../db/mongoose');
const { insertTechnician, deleteTechnician, updateTechnician, getAllTechnicians, getTechnicianByDesired } = require('../modal/technician/Technician.model');


//Create new technician
router.post("/", async (req, res) => {

    const techObj = req.body
    try {
        const result = await insertTechnician(techObj)

        if (result._id) {

            res.json({ status: "success", message: "New technician has been created successfully!!!" })
        } else {
            console.log(error)
        }

    }
    catch (error) {
        res.json({ status: "error", message: "Unable to create new Booking, please try again latedr" })
    }
})

router.delete("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const clientId = req.userId;

        const result = await deleteTechnician({ _id, clientId });

        return res.json({
            status: "success",
            message: "Technician has been deleted",
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});

router.get('/all', async (req, res, next) => {
    const page = req.query.page
    const limit = req.query.limit
    const { search } = req.query
    const { filter } = req.query
    const { word } = req.query

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const keys = ["firstName", "email"]

    const tsearch = (data) => {
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(search.toLowerCase()))
        );
    };

    try {

        // let result = filter ? await getBookingByFilter(bookingDate, to) : filter ? await getBookingByDesired(filter, word) : await getBookings(userId)

        let result = filter ? await getTechnicianByDesired(filter, word) : await getAllTechnicians()
        console.log('lakjwefkljsdf', result)
        let paginatedResults = result.reverse()
        if (search) {
            paginatedResults = tsearch(result)
            console.log(paginatedResults)

        }

        else {
            paginatedResults = result.slice(startIndex, endIndex)
        }

        totalPages = Math.ceil(result.length / limit)


        next = {
            page: page >= totalPages ? 0 : page * 1 + 1,
            limit: limit,

        }

        previous = {
            page: page <= 0 ? 0 : page - 1,
            limit: limit,

        }
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

router.put("/:_id", async (req, res) => {
    try {
        // const { modifier, updates, name, email, street, suburb, postcode, state, phone, bookingDate } = req.body
        const updateTechObj = req.body
        const { _id } = req.params;

        const updatedTechnicianObj = {
            _id,
            updateTechObj
        }


        const result = await updateTechnician(updatedTechnicianObj);

        if (result._id) {
            return res.json({
                status: "success",
                message: "your quotes updated",
            });
        }
        res.json({ status: "error", message: "Unable to update your message please try again later" })

    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});
module.exports = router



