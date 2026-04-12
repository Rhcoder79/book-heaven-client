import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const googleProvider=new GoogleAuthProvider();

const AuthProvider = ({children}) => {
   const [user,setUser]=useState(null);
   const [loading,setLoading]=useState(true);
    
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
  const updateUserProfile = (updatedData) => {
        // এখানে updatedData হবে { displayName: name, photoURL: photo }
        return updateProfile(auth.currentUser, updatedData);
    };
    const signInUser=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signInWithGoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }
    const signOutUser=()=>{
      setLoading(true);
      return signOut(auth)
    }
    useEffect(()=>{
   const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser);
    setLoading(false);
   })
   return ()=>{
    unsubscribe()
   }
    },[])
    const authInfo={
      createUser,
      signInUser,
      signInWithGoogle,
      signOutUser,
      updateUserProfile,
      user,
      loading
    }
    return (
      <AuthContext value={authInfo}>
    {children}
      </AuthContext>
    );
};

export default AuthProvider;