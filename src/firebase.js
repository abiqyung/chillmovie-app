// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPwSuySuMJdz_lOcR-fa3Tw1oZAyCihEo",
  authDomain: "chillmovie-app.firebaseapp.com",
  projectId: "chillmovie-app",
  storageBucket: "chillmovie-app.appspot.com",
  messagingSenderId: "712118141745",
  appId: "1:712118141745:web:51e3d8ccb29e87c6262610",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp); // Initialize Firebase Storage

export { auth, db, storage }; // Export auth, db, and storage
