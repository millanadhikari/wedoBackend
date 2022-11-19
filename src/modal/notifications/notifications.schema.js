const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const validator = require('validator')

const NotificationsSchema = new Schema({

    notifications: {
        text: { type: String, required: true },
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
    {
        timestamps: true,
    }
);

module.exports = {
    NotificationsSchema: mongoose.model("Notifications", NotificationsSchema),
}