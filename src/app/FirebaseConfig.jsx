// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb5H_c1AUWeDxE0HnOTFwwHr8SD6292FM",
  authDomain: "educational-website-75ac7.firebaseapp.com",
  projectId: "educational-website-75ac7",
  storageBucket: "educational-website-75ac7.appspot.com",
  messagingSenderId: "756683041176",
  appId: "1:756683041176:web:09f4403a80a0d72e6423ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app}