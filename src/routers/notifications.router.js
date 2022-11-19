const { insertSpace, getSpaceById } = require("../modal/space/Space.model");
const express = require('express')
const router = express.Router();
const { userAuthorization } = require("../middlewares/authorization.middleware");
const { addNotification } = require("../modal/notifications/notifications.modal");





router.all('/', (req, res, next) => {
    next()
})

// router.post("/addNotification", addNotification);


router.post('/addNotification', async (req, res) => {
    console.log(req.body)
    const { from, to, notifications } = req.body;
    const notObj =req.body
    try {
        const result = await addNotification(notObj)

        if (result._id) {
            res.json({ status: "success", message: "New notification added successfully!!!" })
        } else {
            console.log(error)
        }
    } catch (e) {
        console.log(e)
    }
})

module.exports = router