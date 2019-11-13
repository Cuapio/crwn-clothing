import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from  './pages/shop/shop.component';
import SigInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Contact from './pages/contact/contact.component';

import { auth } from './firebase/firebase.utils';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: null
    }
  }

  unsubcribeFromAuth = null;
  
  componentDidMount() {
    this.unsubcribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser:user});

      console.log(user);
    })
  }

  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }

  render(){
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser}/>
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

export default App;
