const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const validator = require('validator')


const BookingSchema = new Schema({
//    clientId: {
//         type: Schema.Types.ObjectId
//     },
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    address : {
        
    },
    stripeData:[],
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    bookingDate: {
        type: String,
        trim: true,

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

    paidStatus: {
        type: Boolean,
        default: false
    },
    jobStatus: {
        type: String,
        maxlength: 30,
        default: "Waiting for confirmation"
    },
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
    quoteReference: {
        type: String,
        default: 'WD'
    },
    quote_id: {
        type: String,
        
    },
    quoteCreatedAt:{
        type:String,
        },
    bookingReference:{
        type: String,
        
    },
    modifiers : [
        {
           modifier: {
                type: String,
                maxlength : 1000,
                default: "",
                },
            modifiedAt: {
                type: Date,
                default: Date.now(),

            updates: {
                type: String,
                maxlength : 1000,
                default: "",        
                },
            }
        }
    ]

}, {timestamps:true})

module.exports = {
    BookingSchema: mongoose.model("Booking", BookingSchema),
}