import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from './firebase.config';


export const AuthShare = createContext();
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();



const AuthContext = ({ children }) => {

    const [user, setUser] = useState(null);
    const [modal, setModal] = useState({});
    const [ads, setAds] = useState({});
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const updateUser = (userInfo) => {
        return updateProfile(user, userInfo);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // console.log("object");
            setUser(currentUser);
            setLoading(false)
        });
        return () => unsubscribe();
    }, [])

    const authInfo = {
        createUser, login, logOut, modal, setModal, googleLogin, user, updateUser, loading, ads, setAds
    }


    return (

        <AuthShare.Provider value={authInfo}>
            {children}
        </AuthShare.Provider>
    );
};

export default AuthContext;