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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
