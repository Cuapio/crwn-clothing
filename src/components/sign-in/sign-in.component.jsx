import React, { Component } from 'react';
import { connect } from 'react-redux';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../costum-button/costum-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        
        const { emailSignInStart } = this.props
        const { email,  password } =this.state;
        emailSignInStart(email, password);  
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({[name]: value})
    }

    render() {
        const { googleSignInStart } = this.props;
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
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);