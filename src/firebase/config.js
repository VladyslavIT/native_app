// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEfPla6GNEf1S2OihMGakdfuuJ-GltHpk",
  authDomain: "nativeapp-1dad6.firebaseapp.com",
  projectId: "nativeapp-1dad6",
  storageBucket: "nativeapp-1dad6.appspot.com",
  messagingSenderId: "230918258399",
  appId: "1:230918258399:web:219025f1df5d81cb29b36a",
  measurementId: "G-VVG4PEZLF0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);