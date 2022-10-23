const express = require('express');
const { insertProduct, getProducts, deleteProduct, updateProduct } = require('../modal/product/Product.modal');
const router = express.Router();


router.all('/', (req, res, next) => {


    // res.json({message:"Booking details"});


    next()
})

router.post('/', async (req, res) => {
    const productObj = req.body
    try {
        const result = await insertProduct(productObj)

        if (result._id) {
            res.json({ status: "success", message: "New Product created successfully!!!" })
        } else {
            console.log(error)
        }
    } catch (e) {
        console.log(e)
    }
})


router.get('/', async (req, res, next) => {

    try {
        const result = await getProducts()
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
        const updateProductObj = req.body
        const { _id } = req.params;

        const updatedProductObj = {
            _id,
            updateProductObj
        }


        const result = await updateProduct(updatedProductObj);
        console.log(result)
        if (result._id) {
            return res.json({
                status: "success",
                message: "your products updated",
            });
        }
        res.json({ status: "error", message: "Unable to update your message please try again later" })

    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});
// Delete a product
router.delete("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const clientId = req.userId;

        const result = await deleteProduct({ _id, clientId });

        return res.json({
            status: "success",
            message: "The product has been deleted",
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});

module.exports = router




