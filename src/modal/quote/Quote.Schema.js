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
    balcony: {
        type: Number,
        trim: true,
        lowercase: true,
    },
    separateToilet: {
        type: Number,
        default: false
    },
   
    phone: {
        type:String,
        maxlength: 30,
        
     
    },
    studyRoom: {
        type: Number,
        maxlength: 30,
    },
    wallWash: {
        type: Number,
        maxlength: 30,
    },
    fridge: {
        type: Number,
        maxlength: 30,
    },
    garage: {
        type: Number,
        maxlength: 30,
    },
    blinds: {
        type: Number,
        maxlength: 30,
    },
    steamLiving: {
        type: Number,
        maxlength: 30,
    },
    steamBedroom: {
        type: Number,
        maxlength: 30,
    },
    steamHallway: {
        type: Number,
        maxlength: 30,
    },
    studyStairs: {
        type: Number,
        maxlength: 30,
    },
    quoteReference:{
        type:String,
        default:'WD'
    }

  

})

module.exports = {
    QuoteSchema: mongoose.model("Quote", QuoteSchema),
}