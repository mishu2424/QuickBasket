// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARWkaBTGr8U8JG7AVlqsbukXEEfp7di7M",
  authDomain: "quickbasket-auth.firebaseapp.com",
  projectId: "quickbasket-auth",
  storageBucket: "quickbasket-auth.firebasestorage.app",
  messagingSenderId: "1064218216615",
  appId: "1:1064218216615:web:ea595e799ccfaf1876f382"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);