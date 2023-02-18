const express = require("express")
const router = express.Router()
const stripe = require("stripe")('sk_test_51MSmdGHZRxytopYK72hjUw6WKPEfQKPS9ODLPd1ELYwouQ1NHXweOlxhv2W50qGhWW7AxYEBcCiPrgYJo1FSLLbG00JpqI39qY')


router.post("/payment", (req, res) => {


   stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          res.status(500).json(stripeErr);
        } else {
          res.status(200).json(stripeRes);
        }
      }
    );
  });





module.exports = router