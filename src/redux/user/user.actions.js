import userActionTypes from './user.types';

export const checkUserSession = () => ({
    type: userActionTypes.CHECK_USER_SESSION
});

//Utility actions for all sign in methods (with google, 
//with email and password)
export const signInSuccess = (user) => ({
    type: userActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = (error) => ({
    type: userActionTypes.SIGN_IN_FAILURE,
    payload: error
});

//Sign in actions
export const googleSignInStart = () => ({
    type: userActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = emailAndPassword => ({
    type: userActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

//Sign up actions
export const signUpStart = userCredentials => ({
    type: userActionTypes.SIGN_UP_START,
    payload: userCredentials
});

export const signUpSuccess = ({ user, additionalData }) => ({
    type: userActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
});

export const signUpFailure = error => ({
    type: userActionTypes.SIGN_UP_FAILURE,
    payload: error
});

//SignOut actions
export const signOutStart = () => ({
    type: userActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
    type: userActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = (error) => ({
    type: userActionTypes.SIGN_OUT_FAILURE,
    payload: error
});