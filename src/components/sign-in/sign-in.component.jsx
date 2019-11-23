import React, { Component } from 'react';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../costum-button/costum-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        
        this.setState({email:'', password:''})
    }

    handleInputChange = e => {
        const { name, value } = e.target;

        this.setState({[name]: value})
    }

    render() {
        return (
            <div className="sign-in" >
                <h2 className='title'>Sign in</h2>
                <span>I already have an account</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="email" 
                        type="email" 
                        handleChange={this.handleInputChange}
                        label="email"
                        value={this.state.email} 
                        required 
                    />
                    <FormInput 
                        name="password" 
                        type="password" 
                        handleChange={this.handleInputChange}
                        label="password"
                        value={this.state.password} 
                        required 
                    />
                    <div className="buttons">
                        <CustomButton type="submit">
                            Sign in 
                        </CustomButton> 
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            Sign in with Google 
                        </CustomButton> 
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;