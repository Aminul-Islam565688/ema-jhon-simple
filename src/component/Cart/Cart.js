import React from "react";

const Cart = (props) => {
  const cart = props.cart;
  // const total = cart.reduce((total, prd) => total + prd.price, 0)
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    console.log(product.quantity);
    total = total + product.price * product.quantity || 1;
  }
  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.49;
  } else if (total > 0) {
    shipping = 12.99;
  }

  const tax = total * 0.1;

  const formatNumber = (num) => {
    const toprecision = num.toFixed(2);
    return Number(toprecision);
  };
  return (
    <div>
      <h4>Order Summary</h4>
      <p>Itmes Ordered:{cart.length}</p>
      <p>Product Price:{formatNumber(total)}</p>
      <p>Tax + VAT:{formatNumber(tax)}</p>
      <p>Shipping Cost:{formatNumber(shipping)}</p>
      <p>Total Price :{formatNumber(total + shipping + tax)}</p>
      <br />
      {props.children}
    </div>
  );
};

export default Cart;
