import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';
import { createStructuredSelector } from 'reselect'

import './header.styles.scss';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from  './header.styles';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { cartHiddenSelector } from '../../redux/cart/cart.selectors';
import { currentUserSelector } from '../../redux/user/user.selectors';

const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to="/" >
            <Logo />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop" >
                SHOP
            </OptionLink>
            <OptionLink to="/contact" >
                CONTACT
            </OptionLink>
            {currentUser ? (
                <OptionLink as='div' onClick={() => auth.signOut()}>
                    SING OUT
                </OptionLink> 
            ) : (
                <OptionLink to="/signin" >
                    SIGN IN
                </OptionLink>
            )
            }
            <CartIcon />   
        </OptionsContainer>
        {
            hidden ? null
            : <CartDropdown />
        }
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector,
    hidden: cartHiddenSelector
});

export default connect(mapStateToProps)(Header);