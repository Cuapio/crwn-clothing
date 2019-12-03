import React, { Component } from 'react';

import './sign-up.styles.scss';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../costum-button/costum-button.component';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword) {
            alert('password do not match');
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch(error) {
            console.error(error);
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target
        this.setState({[name]: value})
    } 

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className="sign-up">
                <h2 className="title">Sign Up </h2>    
                <span>I do not have an account</span>            
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={this.handleInputChange}
                        label="Display Name"
                        required
                    />
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleInputChange}
                        label="Email"
                        required
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleInputChange}
                        label="Password"
                        required
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleInputChange}
                        label="Confirm Password"
                        required
                    />
                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;
