import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCrYniFNprgACBCPdX3nym8uIfKpekB5qI",
  authDomain: "vue-muso-ninjas-2a7af.firebaseapp.com",
  projectId: "vue-muso-ninjas-2a7af",
  storageBucket: "vue-muso-ninjas-2a7af.appspot.com",
  messagingSenderId: "654278065246",
  appId: "1:654278065246:web:4c9abb69bed9f1945d48cf",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
export const projectFirestore = firebase.firestore();
export const projectAuth = firebase.auth();
export const projectStorage = firebase.storage();

// timestamp
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
