const express = require('express')
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);


router.all('/', (req, res, next) => {
  next()
})


router.post("/", (req, res) => {
  const {paymentIntent} = stripe.paymentIntents.create(
    
    {
      // source: req.body.tokenId,
      amount: req.body.amount,
      currency: "aud",
      payment_method_types:['card']
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json({stripeErr, successfull:"false"});
      } else {
        res.status(200).json({message:"Payment successfull", body:stripeRes, successfull:"true", client_secret:paymentIntent.client_secret});
      }
    }
  );
  
});

module.exports = router;