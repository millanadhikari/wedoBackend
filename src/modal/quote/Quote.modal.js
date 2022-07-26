const {QuoteSchema} = require("./Quote.Schema");



const insertQuote = (quoteObj) => {
    return new Promise ((resolve, reject) => {
            QuoteSchema(quoteObj)
                .save()
                .then((data) => resolve(data))
                .catch(error=> reject(reject(error)));
            
        })
    
    }



module.exports = {insertQuote}