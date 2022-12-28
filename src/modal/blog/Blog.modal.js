const { BlogSchema } = require('./Blog.schema')


const insertBlog = (blogObj) => {

    let newObj = {
        ...blogObj,
        author: {
            ...blogObj.author,
            createdDate: new Date()
        }
    }
    return new Promise((resolve, reject) => {
        BlogSchema(blogObj)
            .save()
            .then((data) => resolve(data))
            .catch(error => reject(error));


    })

}


const getBlog = () => {
    return new Promise((resolve, reject) => {
        try {
            BlogSchema
                .find({}, { title: 1, label: 1, img: 1, subTitle: 1, author: 1, tags: 1 })
                .then((data) => {
                    resolve(data)
                })
                .catch((error) => reject(error))

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    insertBlog,
    getBlog
}

