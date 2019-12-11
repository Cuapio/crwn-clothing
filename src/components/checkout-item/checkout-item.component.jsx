import React from 'react';
import { connect } from 'react-redux';

import './checkout-item.styles.scss';

import { addItem } from '../../redux/cart/cart.actions';

const CheckoutItem = ({ cartItem: { imageUrl, name, quantity, price }}) => (
    <div className="checkout-item">
        <div className="image-container">
            <img src={imageUrl} alt={name} />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">{quantity}</span>
        <span className="price">{price}</span>
        <div className="remove-button">&#10005;</div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    addItem: (item) => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem);
