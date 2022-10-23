const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const validator = require('validator')

const ProductSchema = new Schema({

    title: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        trim: true,
    },
    icon1: {
        type: String,
    },
    icon2: {
        type: String
    }
},
    { timestamps: true })

module.exports = {
    ProductSchema: mongoose.model("Product", ProductSchema),
}