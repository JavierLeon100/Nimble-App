// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI7Lal6j6hkoOXMDRISpXlV1bAuqj3AzU",
  authDomain: "nimble-auth-87b5f.firebaseapp.com",
  projectId: "nimble-auth-87b5f",
  storageBucket: "nimble-auth-87b5f.appspot.com",
  messagingSenderId: "910642886814",
  appId: "1:910642886814:web:0bc627705af2154416e38f"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig)
// let app; 
// if (firebase.apps.length === 0) {
//     app = initializeApp(firebaseConfig);

// } else {
//     app = firebase.app();
// }

// const auth = firebase.auth(); 
const auth = getAuth()

export {app, auth};
