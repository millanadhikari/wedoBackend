const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')



const SpaceSchema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId
    },
    _id:{
       
    },
    _name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    
    
   
})

module.exports = {
    SpaceSchema:mongoose.model('Space', SpaceSchema)
}