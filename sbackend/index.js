const cors = require("cors");
const express = require("express");
//Added a stripe key
const stripe = require("stripe")("sk_test_51INXWkAr1r9GcXUBcVOOO9b66hOtYm3S3LniKK6312TiLsODrD5q4B7Fyq79dJ0VDnKZ3PijsPVB90GkqGzxkCeJ00qYXmYmTR");
const { v4: uuidv4 } = require('uuid');
uuidv4();


const app = express();


//MIDDLEWARE

app.use(express.json());
app.use(cors());


//ROUTES
app.get("/", (req, res) => {
  res.send("It works!");
});

app.post("/payment", (req, res) => {
  const {product, token} = req.body;
  console.log("PRODUCT", product);
  console.log("PRICE", product.price);
  const idempontencyKey = uuid()


  return stripe.customers.create({
    email: token.email,
    source: token.id
  }).then(customer => {
    stripe.charges.create({
      amount: product.price *100,
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email,
      description: product.name,
      shipping: {
        name: token.card.name,
        address: {
          country: token.card.address_country
        }
      } 
    }, {idempontencyKey})
  })
  .then(result => res.status(200).json(result))
  .catch(err => console.log(err))



})


//LISTEN
app.listen(8282, () => console.log("LISTENING AT PORT 8282"));