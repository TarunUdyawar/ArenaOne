import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "@/src/config/FirebaseConfig";
import { Alert } from "react-native";
import { router } from "expo-router";
import {  doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user,setUser] = useState<any>()
  const LogIn = async()=>{
    const unsubscribe = onAuthStateChanged(auth,async(users)=>{
      if(users){
        // console.log(users?.email)
        await updateUser(users?.uid)
        router.replace('/(tabs)/Home')
      }else{
        setUser(null);
        router.replace('/(auth)/SignUp')
      }
    })
    return()=> unsubscribe()
  }
  const Signup = async (
    name: string,
    email: string,
    password: string,
    profileImage: string
  ) => {
    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(firestore, "users", response?.user?.uid), {
        name,
        email,
        profileImage,
      });
      if (response) {
        router.replace("/(tabs)/Home");
        // console.log(response?.user?.email);
      }
    } catch (error: any) {
      let msg = error.message;
      if (msg.includes("Firebase: Error (auth/email-already-in-use)."))
        msg = "Email already Registered";
      if (
        msg.includes(
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        )
      )
        msg = "Password should be at least 6 characters";
      if (msg.includes("Firebase: Error (auth/invalid-email)."))
        msg = "Invalid Email";
      console.log(msg);
      throw new Error(msg);
    }
  };
  const SignIn = async(email:string,password:string)=>{
    try{
    let response = await signInWithEmailAndPassword(auth,email,password)
     if (response) {
        router.replace("/(tabs)/Home");
      }
    
    } catch (error: any) {
      let msg = error.message;
      if (msg.includes("Firebase: Error (auth/invalid-credential)."))
        msg = "Invalid Credentials";
      if (msg.includes("Firebase: Error (auth/invalid-email)."))
        msg = "Invalid Email";
      console.log(msg);
      throw new Error(msg);
    }
  };
  

  const updateUser = async (uid: string) => {
    const userRef = doc(firestore, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      let data = userSnap.data();
      // console.log(data)
      const userData = {
        uid,
        name: data?.name || null,
        email: data?.email || null,
        profileImage: data?.profileImage || null,
      };
setUser(userData)
    }
  };

  const value = {
    Signup,
    LogIn,
    user,
    SignIn
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    Alert.alert("useAuth must be Wrapped Inside Auth Provider");
  }
  return context;
};
