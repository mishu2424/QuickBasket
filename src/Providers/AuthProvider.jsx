/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import AuthContext from "./AuthContext";
import { app } from "../Firebase/firebase.config";
import axios from "axios";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  let [theme, setTheme] = useState("light");

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      console.log('CurrentUser-->', currentUser)
      if(currentUser?.email){
        const user={email:currentUser.email};
        axios.post(`${import.meta.env.VITE_API_URL}/jwt`,user,{withCredentials:true})
        .then((res)=>{
          console.log(res.data);
          setLoading(false);
        })
      }else{
        // console.log('entered');
        axios.post(`${import.meta.env.VITE_API_URL}/logOut`,{},{withCredentials:true})
        .then(res=>{
          console.log(res.data);
          setLoading(false);
        })
      }
    })
    return () => {
      return unsubscribe()
    }
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    theme,
    setTheme
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
