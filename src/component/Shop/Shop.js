import "./Shop.css";
import fakeData from '../../fakeData'
import { useEffect, useState } from 'react';
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey)
            product.quantity = savedCart[existingKey]
            return product
        })
        setCart(previousCart);
    }, [])

    const handleAddProduct = (Product) => {

        const toBeAddedkey = Product.key;

        const sameProduct = cart.find(pd => pd.key === toBeAddedkey)
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedkey);
            newCart = [...others, sameProduct];
        }
        else {
            Product.quantity = 1;
            newCart = [...cart, Product];
        }
        setCart(newCart);

        addToDatabaseCart(Product.key, count)
    }
    return (
        <div className='twin-container'>
            <div className="product-container">
                {
                    products.map(product =>
                        <Product
                            key={product.key}
                            showAddToCart={true}
                            handleAddProduct={handleAddProduct}
                            product={product}>{ }
                        </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className='cart-button'>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;