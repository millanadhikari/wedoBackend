const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')



const BlogSchema = new Schema({
    title: {
        type: String,
        trim: true,
    },
    subTitle: {
        type: String,
        trim: true,
    },
    img: {
        src: {
            type: String
        }
    },
    author: {
        userId: {
            type: String
        },
        profilePic: {
            src: {
                type: String
            }
        },
        name: {
            type: String
        },
        createDate: {
            type: Date
        },
        minRead: {
            type: String
        }
    },
    tags: [],
    label: {
        type: String
    },
    text: [
        {
            subheader: {
                type: String
            },
            paragraph: [

            ],
            image: {
                src: {
                    type: String
                }
            },
            image2: {
                src: {
                    type: String
                }
            }
        }
    ]
})

module.exports = {
    BlogSchema: mongoose.model('Blog', BlogSchema)
}