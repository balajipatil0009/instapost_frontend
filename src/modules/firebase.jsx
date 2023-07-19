// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl5brvYD6pq8t_4JxGyXbqVVekt9TVXds",
  authDomain: "instapost-19166.firebaseapp.com",
  projectId: "instapost-19166",
  storageBucket: "instapost-19166.appspot.com",
  messagingSenderId: "338563828302",
  appId: "1:338563828302:web:2246a4908e13aff243511f",
  measurementId: "G-32FP060ZVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);