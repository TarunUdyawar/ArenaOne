import { initializeApp } from "firebase/app";
//@ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBJV1-S3yng9Y7yPoRXahKS4IkpoUIXVaw",
  authDomain: "arenaone.firebaseapp.com",
  projectId: "arenaone",
  storageBucket: "arenaone.firebasestorage.app",
  messagingSenderId: "863739557675",
  appId: "1:863739557675:web:396d7aacb0724e1818b76e",
  measurementId: "G-P9678SXTFM",
};
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const firestore = getFirestore(app);
