import React, { useState } from 'react';
import { connect } from 'react-redux';

import './sign-up.styles.scss';

import { signUpStart } from '../../redux/user/user.actions'

import FormInput from '../form-input/form-input.component';
import CustomButton from '../costum-button/costum-button.component';

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert('password do not match');
            return;
        }

        signUpStart(displayName, email, password);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserCredentials({ ...userCredentials, [name]: value})
    } 

    return (
        <div className="sign-up">
            <h2 className="title">Sign Up </h2>    
            <span>I do not have an account</span>            
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleInputChange}
                    label="Display Name"
                    required
                />
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    label="Email"
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    label="Password"
                    required
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleInputChange}
                    label="Confirm Password"
                    required
                />
                <CustomButton type="submit">SIGN UP</CustomButton>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (displayName, email, password) => dispatch(signUpStart({ displayName, email, password }))
})

export default connect(null, mapDispatchToProps)(SignUp);
