import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXuK8BnpJy2BAOTCR0Z4dWH2COVWgvd30",
  authDomain: "kingoauth-25355.firebaseapp.com",
  projectId: "kingoauth-25355",
  storageBucket: "kingoauth-25355.appspot.com",
  messagingSenderId: "350746585050",
  appId: "1:350746585050:web:eff874ed702455505ec2e3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const provider1 = new FacebookAuthProvider();
export const provider2 = new GithubAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);

