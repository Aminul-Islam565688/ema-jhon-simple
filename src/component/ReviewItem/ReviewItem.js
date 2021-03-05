import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.cart
    return (
        <div style={{borderBottom:'2px solid grey', marginBottom:'10px'}}>
            <h3 className='product-name'>{name}</h3>
            <p>Quantity{quantity}</p>
            <p><small>${price}</small></p>
            <br/>
            <button 
                className='cart-button'
                onClick = {() => props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;