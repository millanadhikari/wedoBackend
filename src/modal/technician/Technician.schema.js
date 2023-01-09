const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')



const TechnicianSchema = new Schema({
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
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if (value = 0) {
                throw new Error('Phone number is not valid')

            }
        }
    },
    profilePic: {
        src: {
            type: String
        }
    },

    postcode: {
        type: String,
        trim: true,
        default: "",

    },

    address: {
        type: String,
        trim: true,
        default: "",
    },
    state: {
        type: String,
        trim: true,
        default: "",
    },

    username: {
        type: String,
        trim: true,

    },
    assigned:[]
})

module.exports = {
    TechnicianSchema: mongoose.model('Technician', TechnicianSchema)
}