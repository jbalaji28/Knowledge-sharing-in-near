// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Remove Analytics if not used
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBszByvHQJECqmXpJnbzfEV_gaJUhylokg",
  authDomain: "expe-ddbbb.firebaseapp.com",
  projectId: "expe-ddbbb",
  storageBucket: "expe-ddbbb.appspot.com",
  messagingSenderId: "167024099414",
  appId: "1:167024099414:web:e4858b6cdeac309f63fbf7",
  measurementId: "G-QMX4H4YT3B", // Optional if you don't use analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// If using analytics, uncomment the following line
// const analytics = getAnalytics(app);

export { db };
