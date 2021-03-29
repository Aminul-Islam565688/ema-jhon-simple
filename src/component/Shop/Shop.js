import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  //   const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  //geting data from mongodb
  useEffect(() => {
    fetch("http://localhost:10000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const productValue = Object.values(savedCart);
    if (products.length > 0) {
      const previousCart = productKeys.map((existingKey) => {
        const product = products.find((pd) => pd.key === existingKey);
        product.quantity = savedCart[existingKey];
        return product;
      });
      setCart(previousCart);
    }
  }, [products]);

  const handleAddProduct = (Product) => {
    const toBeAddedkey = Product.key;

    const sameProduct = cart.find((pd) => pd.key === toBeAddedkey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedkey);
      newCart = [...others, sameProduct];
    } else {
      Product.quantity = 1;
      newCart = [...cart, Product];
    }
    setCart(newCart);

    addToDatabaseCart(Product.key, count);
  };
  return (
    <div className="twin-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            key={product.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={product}
          >
            {}
          </Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="cart-button">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
