import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";

const firebaseapp = initializeApp(firebaseConfig);

export default firebaseapp;