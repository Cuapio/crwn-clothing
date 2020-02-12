import React, { useState } from 'react';
import { connect } from 'react-redux';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../costum-button/costum-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setUserCredentials] = useState({
        email: '', 
        password: ''
    });
    const { email, password } = userCredentials;

    const handleSubmit = async e => {
        e.preventDefault();
        emailSignInStart(email, password);  
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <div className="sign-in" >
            <h2 className='title'>Sign in</h2>
            <span>I already have an account</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    name="email" 
                    type="email" 
                    handleChange={handleInputChange}
                    label="email"
                    value={email} 
                    required 
                />
                <FormInput 
                    name="password" 
                    type="password" 
                    handleChange={handleInputChange}
                    label="password"
                    value={password} 
                    required 
                />
                <div className="buttons">
                    <CustomButton type="submit">
                        Sign in 
                    </CustomButton> 
                    <CustomButton 
                        type='button' 
                        onClick={googleSignInStart} 
                        isGoogleSignIn
                    >
                        Sign in with Google 
                    </CustomButton> 
                </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);