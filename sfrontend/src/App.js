import React, {useState} from 'react';
import './App.css';
import StripeCheckout from "react-stripe-checkout"





function App() {

  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10000,
    productBy: "facebook"
  });




  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }

    return fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("RESPONSE", response)
      const {status} = response;
      console.log("STATUS", status)
    })
    .catch(err => console.log(err))
  }



  return (
    <div className="App">
      <header className="App-header">
      
        
        <a
          className="App-link"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          
        >
          Payment integration module
          
        </a>
        <StripeCheckout 
        stripeKey="pk_test_51INXWkAr1r9GcXUBfiJTCENQkui82SqtomDVyf4gY08u21VtBI5Wb2uErv5eviiYtbibfSh1KMLLhDiskL9X3inx005WmXScr9" 
        token={makePayment} 
        name="Buy React"
        amount={product.price*100}
        shippingAddress
        billingAddress
        >
          <button className="btn-large-blue">Buy react in {product.price} Rs</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
