import firebase from "firebase/compat/app";
import { getFirestore } from 'firebase/firestore/lite';

import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxHq5rGAxxK26AKEI--JLimqXv0fYQIeg",
  authDomain: "galviz-react-7a488.firebaseapp.com",
  projectId: "galviz-react-7a488",
  storageBucket: "galviz-react-7a488.appspot.com",
  messagingSenderId: "330438688845",
  appId: "1:330438688845:web:e9549f9976fe44bf225c04"
};


const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);


export {
    app,
    db
};