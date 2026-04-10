// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVRh_6bS1KibI4goYVwyePB1ICxJmkKcI",
  authDomain: "book-heaven-4eb51.firebaseapp.com",
  projectId: "book-heaven-4eb51",
  storageBucket: "book-heaven-4eb51.firebasestorage.app",
  messagingSenderId: "832532141612",
  appId: "1:832532141612:web:1fb456144f1a52254b2389"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
