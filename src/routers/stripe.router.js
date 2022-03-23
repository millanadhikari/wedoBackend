const express = require('express')
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);


router.all('/', (req, res, next) => {
  next()
})


router.post("/", async (req, res) => {
  const { items } = req.body;

  const customer = await stripe.customers.create();

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer.id,
    setup_future_usage: "off_session",
    amount: 200,
    currency: "aud",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  //  (stripeErr, stripeRes) => {
  //     if (stripeErr) {
  //       res.status(500).json({stripeErr, successfull:"false"});
  //     } else {
  //       res.status(200).json({message:"succeeded", body:stripeRes, successfull:"true", client_secret:paymentIntent.client_secret});
  //     }
  //   }
  // ;
  console.log(customer)
  res.send({
    clientSecret: paymentIntent.client_secret,
    customer:customer,
    
  });
  
});


// router.post("/", (req, res) => {
//   const {paymentIntent} = stripe.paymentIntents.create(
    
//     {
//       // source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "aud",
//       payment_method_types:['card']
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).json({stripeErr, successfull:"false"});
//       } else {
//         res.status(200).json({message:"Payment successfull", body:stripeRes, successfull:"true", client_secret:paymentIntent.client_secret});
//       }
//     }
//   );
  
// });

module.exports = router;