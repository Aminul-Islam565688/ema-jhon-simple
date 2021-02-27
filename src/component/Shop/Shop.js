import "./Shop.css";
import fakeData from '../../fakeData'
import { useState } from 'react';
import Product from "../Product/Product";
import Cart from "../Cart/Cart";

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([])
    const handleAddProduct = (Product) => {
        const newCart = [...cart , Product]
        console.log('Product Clicked', Product, newCart);
        setCart(newCart)
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product =>
                         <Product  
                            handleAddProduct={handleAddProduct}
                            product={product}>{}
                         </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;