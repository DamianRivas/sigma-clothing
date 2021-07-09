import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAJFs66AdWdpxAZx2tSf5njAtXN4EdzAh0",
  authDomain: "sigma-db-l33t.firebaseapp.com",
  projectId: "sigma-db-l33t",
  storageBucket: "sigma-db-l33t.appspot.com",
  messagingSenderId: "1061056715848",
  appId: "1:1061056715848:web:363a836f62aa5bda7ecc7d",
  measurementId: "G-8SR3D81YYY",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Set up and export the Google Auth provider
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
