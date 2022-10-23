const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const validator = require('validator')

const QuoteSchema = new Schema({

    firstName: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    lastName: {
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
    address1: {
        type: String,
        trim: true,
        lowercase: true,

    },
    address2: {
        type: String,
        trim: true,
        lowercase: true,

    },
    city: {
        type: String,
        trim: true,
        lowercase: true,

    },
    state: {
        type: String,
        trim: true,
        lowercase: true,

    },
    postcode: {
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
    notes: [],

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
    quoteStatus: {
        type: String,
        default: 'Not Started'
    },
    quoteReference: {
        type: String,
        default: 'WD'
    },
    bookingReference: {
        type: String
    },
}, { timestamps: true })

module.exports = {
    QuoteSchema: mongoose.model("Quote", QuoteSchema),
}