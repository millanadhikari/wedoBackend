const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const validator = require('validator')


const BookingSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    lastName: {
        type: String,
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
    bookingStatus: {
        type: String,
        default: 'Not Started'
    },
    quoteReference: {
        type: String,
        default: 'WD'
    },
    startHour: {
        type: String,
        default: "09"
    },
    startMin: {
        type: String,
        default: "00"
    },
    startMode: {
        type: String,
        default: "AM"
    },
    endHour: {
        type: String,
        default: "12"
    },
    endMin: {
        type: String,
        default: "00"
    },
    endMode: {
        type: String,
        default: "PM"
    },
    bookingReference: {
        type: String
    },
    bookingDate: {
        type: Date,
        default: ""
    },
    assignedTech: {
        type: String
    },
    
    
    modifiers: [
        {
            modifier: {
                type: String,
                maxlength: 1000,
                default: "",
            },
            modifiedAt: {
                type: Date,
                default: Date.now(),

                updates: {
                    type: String,
                    maxlength: 1000,
                    default: "",
                },
            }
        }
    ],



}, { timestamps: true })

module.exports = {
    BookingSchema: mongoose.model("Booking", BookingSchema),
}