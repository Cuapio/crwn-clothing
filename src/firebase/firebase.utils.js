import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD6pY9Ord4Nbx16CYHZrV7Ckp1CNoTR6qo",
    authDomain: "store-db-766d0.firebaseapp.com",
    databaseURL: "https://store-db-766d0.firebaseio.com",
    projectId: "store-db-766d0",
    storageBucket: "store-db-766d0.appspot.com",
    messagingSenderId: "8112803989",
    appId: "1:8112803989:web:f67f4bc2ab6894ab24cb9c",
    measurementId: "G-5C3PLDC5L0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, extraData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...extraData 
            })
        } catch(error) {
            console.log('error creating user', error.massage)
        }
    }

    return userRef; 
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;