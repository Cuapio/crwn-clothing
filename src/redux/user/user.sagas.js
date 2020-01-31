import {
    takeLatest,
    call,
    put,
    all
} from 'redux-saga/effects';

import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpSuccess,
    signUpFailure
} from './user.actions';

import userActionTypes from './user.types';

import {
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser
} from '../../firebase/firebase.utils';

//Utility for all sign in Methods when it is necceary to set the current user
export function* setCurrentUser(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield setCurrentUser(user);
    } catch (error) {
        //This action will catch a likely error from firebase auth library
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield setCurrentUser(user);
    } catch (error) {
        //This action will catch a likely error from firebase auth library
        yield put(signInFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield setCurrentUser(userAuth);
    } catch(error) {
        put(signInFailure(error));
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
        
    } catch(error) {
        yield put(signOutFailure(error));
    }
}

export function* signUp({ payload: { displayName, email, password } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName } }))
    } catch(error){
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUpSuccess({ payload: { user, additionalData } }) {
    yield setCurrentUser(user, additionalData);
}

// Listenig sagas

export function* onGoogleSignInStart() {
    yield takeLatest(
        userActionTypes.GOOGLE_SIGN_IN_START,
        signInWithGoogle
    );
}

export function* onEmailSignInStart() {
    yield takeLatest(
        userActionTypes.EMAIL_SIGN_IN_START,
        signInWithEmail
    );
}

export function* onCheckUserSession() {
    yield takeLatest(
        userActionTypes.CHECK_USER_SESSION,
        isUserAuthenticated
    );
}

export function* onSignOutStart() {
    yield takeLatest(
        userActionTypes.SIGN_OUT_START,
        signOut
    );
}

export function* onSignUpStart() {
    yield takeLatest(
        userActionTypes.SIGN_UP_START,
        signUp
    );
}

export function* onSignUpSuccess() {
    yield takeLatest(
        userActionTypes.SIGN_UP_SUCCESS,
        signInAfterSignUpSuccess
    );
}


//root userSaga
export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}