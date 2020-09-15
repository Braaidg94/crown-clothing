import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDVWPPbGb73ZrHVQTGB6oTscTPLu8_y6lw",
    authDomain: "crown-db-97280.firebaseapp.com",
    databaseURL: "https://crown-db-97280.firebaseio.com",
    projectId: "crown-db-97280",
    storageBucket: "crown-db-97280.appspot.com",
    messagingSenderId: "166345735876",
    appId: "1:166345735876:web:96e444e2e726edc8b09391",
    measurementId: "G-R0R59MSZXG"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef= firestore.doc(`users/${userAuth.uid}`);
    const snapShot= await userRef.get();
    
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch(error) {
            console.log('errorrrrr', error.message);
        }
    }
    
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;