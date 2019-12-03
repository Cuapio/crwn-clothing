import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from  './pages/shop/shop.component';
import SigInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Contact from './pages/contact/contact.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: null
    }
  }

  unsubcribeFromAuth = null;
  
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            })
        });
      } else {
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }

  render(){
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/contact" component={Contact} />
          <Route path="/signin" component={SigInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
