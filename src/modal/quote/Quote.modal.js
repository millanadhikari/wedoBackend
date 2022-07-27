const {QuoteSchema} = require("./Quote.Schema");



const insertQuote = (quoteObj) => {
    return new Promise ((resolve, reject) => {
            QuoteSchema(quoteObj)
                .save()
                .then((data) => resolve(data))
                .catch(error=> reject(reject(error)));
            
        })
    
    }

    const getQuotes = (clientId) => {
        return new Promise ((resolve, reject) => {
            try { 
                QuoteSchema
                    .find({}, {name:1, email:1, phone:1, service:1})
                    .then((data) => {
                        resolve(data)
                    })
                    .catch((error) => reject(error))
    
            } catch (error) {
                reject(error)
            }
        })
    }

module.exports = {insertQuote, getQuotes}