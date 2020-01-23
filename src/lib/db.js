import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Rebase from 're-base';

// Initialize Firebase
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMIAN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGIN_SENDER_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}

const firestore = firebase.firestore();
const auth = firebase.auth();

const base = Rebase.createClass(firestore);

export default base;

// named export
export { firebase, auth, firestore };
