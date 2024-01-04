const catchAsyncError = require("../middleware/catchAsyncError");
require('dotenv').config({ path: './.env' })

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51OTGxBJu2FcGxJrR5MWIEGbKVzqWvUXOgmt7eT1d8odpGGHp0i31cntLWIGhk4XXgzHrICzpj9u3QEiqFu24TchF00eL5YhUKJ');
exports.processPayment = catchAsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});