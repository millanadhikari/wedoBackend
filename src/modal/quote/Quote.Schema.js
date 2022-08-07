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
        // {
        //     balcony: {
        //         _id: {
        //             type: Schema.Types.ObjectId
        //         },
        //         quantity: Number,
        //         price: {
        //             type: Number,
        //             default: 2000
        //         },
        //         item: {
        //             type: String
        //         }

        //     }
        // },
        // {
        //     separateToilet: {
        //         _id: {
        //             type: Schema.Types.ObjectId
        //         },
        //         quantity: {
        //             type: Number
        //         },
        //         price: {
        //             type: Number,
        //             default: 2000
        //         },
        //         item: {
        //             type: String
        //         }
        //     }
        // },
        // {
        //     studyRoom: {
        //         _id: {
        //             type: Schema.Types.ObjectId
        //         }, quantity: Number,
        //         price: {
        //             type: Number,
        //             default: 2000
        //         },
        //         item: {
        //             type: String
        //         }
        //     }
        // },
        // {
        //     wallWash: {
        //         _id: {
        //             type: Schema.Types.ObjectId
        //         }, quantity: Number,
        //         price: {
        //             type: Number,
        //             default: 2000
        //         },
        //         item: {
        //             type: String
        //         }
        //     }
        // },
        // {
        //     fridge: {
        //         _id: {
        //             type: Schema.Types.ObjectId
        //         }, quantity: Number,
        //         price: {
        //             type: Number,
        //             default: 2000
        //         },
        //         item: {
        //             type: String
        //         }
        //     }
        // },
        // {
        //     garage: {
        //         _id: {
        //             type: Schema.Types.ObjectId
        //         }, quantity: Number,
        //         price: {
        //             type: Number,
        //             default: 2000
        //         },
        //         item: {
        //             type: String
        //         }
        //     }
        // },
        // {
        //     blinds: {
        //         _id: {
        //             type: Schema.Types.ObjectId
        //         }, quantity: Number,
        //         price: {
        //             type: Number,
        //             default: 2000
        //         },
        //         item: {
        //             type: String
        //         }
        //     }
        // },
        // {
        //     steamLiving: {
        //         _id: {
        //             type: Schema.Types.ObjectId
        //         }, quantity: Number,
        //         price: {
        //             type: Number,
        //             default: 2000
        //         },
        //         item: {
        //             type: String
        //         }
        //     }
        // },
        // {
        //     steamBedroom: {
        //         _id: {
        //             type: Schema.Types.ObjectId
        //         }, quantity: Number,
        //         price: {
        //             type: Number,
        //             default: 2000
        //         },
        //         item: {
        //             type: String
        //         }
        //     }
        // },
        // {
        //     steamHallway: {
        //         _id: {
        //             type: Schema.Types.ObjectId
        //         },
        //         quantity: Number,
        //         price: {
        //             type: Number,
        //             default: 2000
        //         },
        //         item: {
        //             type: String
        //         }
        //     }
        // },
        // {
        //     studyStairs: {
        //         _id: {
        //             type: Schema.Types.ObjectId
        //         },
        //         quantity: Number,
        //         price: {
        //             type: Number,
        //             default: 2000
        //         },
        //         item: {
        //             type: String
        //         }
        //     }
        // }
    ],

    phone: {
        type: String,
        maxlength: 30,
    },

    quoteReference: {
        type: String,
        default: 'WD'
    }



})

module.exports = {
    QuoteSchema: mongoose.model("Quote", QuoteSchema),
}