import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';
import { createStructuredSelector } from 'reselect'

import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { cartHiddenSelector } from '../../redux/cart/cart.selectors';
import { currentUserSelector } from '../../redux/user/user.selectors';

const Header = ({ currentUser, hidden }) => (
    <div className="header">
        <Link  className="logo-container" to="/" >
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to="/shop" >
                SHOP
            </Link>
            <Link className="option" to="/contact" >
                CONTACT
            </Link>
            {currentUser ? (
                <div className="option" onClick={() => auth.signOut()}>
                    SING OUT
                </div> 
            ) : (
                <Link className="option" to="/signin" >
                    SIGN IN
                </Link>
            )
            }
            <CartIcon />   
        </div>
        {
            hidden ? null
            : <CartDropdown />
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector,
    hidden: cartHiddenSelector
});

export default connect(mapStateToProps)(Header);