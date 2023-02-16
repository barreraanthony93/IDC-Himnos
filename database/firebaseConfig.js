import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD8Qayetgloc58XGhc6N3nIJcKDKCVkkXU",
  authDomain: "idcauth.firebaseapp.com",
  databaseURL: "https://idcauth.firebaseio.com",
  projectId: "idcauth",
  storageBucket: "idcauth.appspot.com",
  messagingSenderId: "742620069595",
  appId: "1:742620069595:web:69ceb5194922e97c7116fe",
  measurementId: "G-Q9DTTNSLSL"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);