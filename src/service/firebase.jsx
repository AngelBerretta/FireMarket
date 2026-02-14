import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp6x3Lj13JNUr5eu9gl7jbViwE23XxhWk",
  authDomain: "fire-market-8ce6e.firebaseapp.com",
  projectId: "fire-market-8ce6e",
  storageBucket: "fire-market-8ce6e.firebasestorage.app",
  messagingSenderId: "379657217876",
  appId: "1:379657217876:web:2216f441b75951dd3d0ac1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app)