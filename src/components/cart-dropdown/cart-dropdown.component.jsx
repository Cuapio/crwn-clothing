import React from 'react';
import { connect } from 'react-redux';

import './cart-dropdown.styles.scss';

import CustomButton from '../costum-button/costum-button.component';
import CartItem from '../cart-item/cart-item.component';

import { cartItemsSelector } from '../../redux/cart/cart.selectors';

const CartDropdown = ({ cartItems }) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem}/>
                ))
            }
        </div> 
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
);

const mapStateToProps = (state) => ({
    cartItems: cartItemsSelector(state)
})


export default connect(mapStateToProps)(CartDropdown);
