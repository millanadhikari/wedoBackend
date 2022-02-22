const { insertSpace, getSpaceById } = require("../modal/space/Space.model");
const express = require('express')
const router = express.Router();
const { userAuthorization } = require("../middlewares/authorization.middleware");





router.all('/', (req, res, next) => {
    next()
})


router.post("/create_new", userAuthorization, async (req, res) => {
    console.log(req)

    try {
        const { _name, _id} = req.body
        const userId = req.userId

        const spaceObj = {
            clientId:userId,
            _id:_id,
            _name:_name
        }
        const result = await insertSpace(spaceObj)

        if (result._name) {
            return res.json({ status: "success", message: "Space has been created!!!" })
        }

        res.json({ status: "error", message: "Unable to create new Space, please try again later" })

    }
    catch (error) {
        res.json({ status: "error", message: "Unable to create new Space, please try again latedr" })
    }
})

router.get("/all", userAuthorization, async (req, res) => {
    try {


        const clientId = req.userId;
        const result = await getSpaceById(clientId);


        return res.json({
            status: "success",
            result,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});


module.exports = router