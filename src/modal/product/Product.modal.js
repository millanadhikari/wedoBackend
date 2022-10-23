const { ProductSchema } = require("./Product.Schema");



const insertProduct = async (productObj) => {
    return new Promise((resolve, reject) => {
        try {


            ProductSchema(productObj)
                .save()
                .then((data) => resolve(data))
                .catch(error => console.log(error))

        } catch (error) {
            reject(error)
        }
    })
}


const getProducts = () => {
    return new Promise((resolve, reject) => {
        try {
            ProductSchema
                .find({})
                .then((data) => {
                    resolve(data)
                })
                .catch((error) => reject(error))

        } catch (error) {
            reject(error)
        }
    })
}

const updateProduct = (updateProductObj) => {
    let _id = updateProductObj._id
    console.log('bhaiya', updateProductObj)

    return new Promise((resolve, reject) => {
        try {
            ProductSchema.findOneAndUpdate(
                { _id },
                {
                    $set: updateProductObj.updateProductObj
                },

                { new: true }
            )
                .then((data) => resolve(data))

                .catch((error) => reject(error));
        } catch (error) {
            reject(error);
        }
    });
};

const deleteProduct = ({ _id, clientId }) => {
    return new Promise((resolve, reject) => {
        try {
            ProductSchema.findOneAndDelete({ _id, clientId })
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = { insertProduct, getProducts, updateProduct, deleteProduct }