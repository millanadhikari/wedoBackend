const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const validator = require('validator')

const QuoteSchema = new Schema({

    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },


    email: {
        type: String,
        trim: true,
        lowercase: true,

    },

    service: {
        type: String,
        trim: true,
        lowercase: true,
    },
    bedrooms: {
        type: Number,
        trim: true,
        lowercase: true,
    },
    bathrooms: {
        type: Number,
        trim: true,
        lowercase: true,

    },
    products: [

    ],
    timelines: [],
    notes:[],

    phone: {
        type: String,
        maxlength: 30,
    },
    subtotal: {
        type: Number,
        default: 0
    },
    paid: {
        type: Number,
        default: 0
    },
    invoice_inr: {
        type: Number,
        default: 12
    },
    quoteStatus:{
        type:String,
        default:'Not Started'
    },
    quoteReference: {
        type: String,
        default: 'WD'
    },
    bookingReference:{
        type:String
    },
}, { timestamps: true })

module.exports = {
    QuoteSchema: mongoose.model("Quote", QuoteSchema),
}