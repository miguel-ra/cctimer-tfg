import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_r2Owa5Wu63auVADfWdAqROYFKXubFM4",
  authDomain: "cctimer-17649.firebaseapp.com",
  projectId: "cctimer-17649",
  storageBucket: "cctimer-17649.appspot.com",
  messagingSenderId: "318597892790",
  appId: "1:318597892790:web:9b394da1cec47cdc373417",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };
export default app;
