import { createContext, useContext, useEffect, useState } from "react";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../config/firebase";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const provider = new GoogleAuthProvider();

  const auth = getAuth(app);

  const Registration = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const SignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const GoogleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const Logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const userInfo = { email: user.email };
        axiosPublic.post(import.meta.env.VITE_EXPRESS_API + "/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem("access-token");
        setUser(null);
        setLoading(false);
      }
      
    });

    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  const AuthInfo = {
    user,
    SignIn,
    Registration,
    GoogleSignIn,
    Logout,
    updateUserProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
