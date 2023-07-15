import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1Y8rhHEFvsqSUMEYhRDLJ0yW521R8IoQ",
  authDomain: "finca-project.firebaseapp.com",
  projectId: "finca-project",
  storageBucket: "finca-project.appspot.com",
  messagingSenderId: "162401457799",
  appId: "1:162401457799:web:287b5c5cb28cb444a44a22",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  doc,
  collection,
  getDoc,
};
