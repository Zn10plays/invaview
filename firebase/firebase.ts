// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxK38T_hd6fJjE-7IzW31YESofQy0gkdI",
  authDomain: "invadev-368018.firebaseapp.com",
  projectId: "invadev-368018",
  storageBucket: "invadev-368018.appspot.com",
  messagingSenderId: "745258602314",
  appId: "1:745258602314:web:cc74cfc97820d7ce8f7bb3",
  measurementId: "G-V0XCTWV53T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, auth};