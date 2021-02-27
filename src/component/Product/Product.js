import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    const {img , name, seller, price, stock} = props.product
    return (
        <div>
            <div className='product'>
                <div className=''>
                    <img src={img} alt="" />
                </div>
                <div>
                    <h4 className='product-name'>{name}</h4>
                    <br/>
                    <p>by:{seller}</p>
                    <p>${price}</p>
                    <p>Only {stock} left in stock - order soon</p>
                    <button onClick={() => props.handleAddProduct(props.product)} className='cart-button'><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default Product;