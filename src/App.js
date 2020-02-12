import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from  './pages/shop/shop.component';
import SigInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Contact from './pages/contact/contact.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';

import { checkUserSession } from './redux/user/user.actions'
import { currentUserSelector } from './redux/user/user.selectors';

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route path="/contact" component={Contact} />
        <Route 
          exact
          path="/signin" 
          render={() => currentUser ? (<Redirect to='/' />) : (<SigInAndSignUp />)} 
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: currentUserSelector
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
