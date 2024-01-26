import { initializeApp } from "firebase/app";
import {
    getAuth,
    initializeAuth,
    getAuth as getFirestoreAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { getAnalytics } from "firebase/analytics";


import { getStorage } from "@firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoMCYCTEx4RbzI_QbhSuh1uf2f1oMkR84",
    authDomain: "books-b23ae.firebaseapp.com",
    projectId: "books-b23ae",
    storageBucket: "books-b23ae.appspot.com",
    messagingSenderId: "235146188362",
    appId: "1:235146188362:web:d80745536ac5df0801f8b3"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const db = getFirestore(FIREBASE_APP);
export const analytics = getAnalytics(FIREBASE_APP);
export const storage = getStorage(FIREBASE_APP);

// export const storage=getStorage()


