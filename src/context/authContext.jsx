import { createContext, useContext, useEffect, useState } from "react";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import app from "../config/firebase";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const provider = new GoogleAuthProvider();

  const auth = getAuth(app);

  const Registration = (email, password) => {
    console.log(email, password);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const SignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const GoogleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

  const Logout = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
        unsubscribe()
    }
  }, []);

  const AuthInfo = {
    user,
    SignIn,
    Registration,
    GoogleSignIn,
    Logout,
    loading
  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;