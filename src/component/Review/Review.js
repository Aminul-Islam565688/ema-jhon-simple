import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import happyImage from "../../images/giphy.gif";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const history = useHistory();

  const handleProccedCheckout = () => {
    history.push("/shipment");
  };

  const removeProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    console.log(productKeys);

    //Review using data from mongodb
    fetch("http://localhost:10000/productsByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));

    //Review using fake data
    // const cartProducts = productkeys.map(key => {
    //     const product = fakeData.find(pd => pd.key === key)
    //     product.quantity = savedCart[key];
    //     return product;
    // })
    // setCart(cartProducts);
  }, []);
  let thankYou;
  if (orderPlaced) {
    thankYou = <img src={happyImage} alt="" />;
  }
  return (
    <div className="twin-container">
      <div className="product-container">
        <h1>Card Items : {cart.length}</h1>
        {cart.map((cart) => (
          <ReviewItem
            key={cart.key}
            removeProduct={removeProduct}
            cart={cart}
          ></ReviewItem>
        ))}
        {thankYou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProccedCheckout} className="cart-button">
            Procced Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
