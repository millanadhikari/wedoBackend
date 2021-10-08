const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const validator = require('validator')


const BookingSchema = new Schema({
   clientId: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
     street: {
            type:String,
            trim:true,
            lowercase: true
        },
        suburb: {
            type:String,
            trim:true,
            lowercase: true
        },
        postcode: {
            type:Number,
            trim:true,
            lowercase: true
        },
        state: {
            type:String,
            trim:true,
            lowercase: true
        },   
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
        type: Date,
        trim: true,

    },
    primaryService: {
        type: String,
        trim: true,
        lowercase: true,
    },
    secondaryService: {
        type: String,
        trim: true,
        lowercase: true,
    },
    additionalService: {
        type: String,
        trim: true,
        lowercase: true,
    },
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
        type: Number,
        maxlength: 30,
        
     
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

})

module.exports = {
    BookingSchema: mongoose.model("Booking", BookingSchema),
}