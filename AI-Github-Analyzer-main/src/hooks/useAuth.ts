// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDq4bTgfK5rNIxmZXFwyW9BJZoG8oBNjuA",
  authDomain: "githubportfolioanalyzer.firebaseapp.com",
  projectId: "githubportfolioanalyzer",
  storageBucket: "githubportfolioanalyzer.appspot.com",
  messagingSenderId: "573247961500",
  appId: "1:573247961500:web:070a7bd8e3577c054ab059",
  measurementId: "G-1MZT383SQ1"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(res.user, { displayName });
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return {
    user,
    loading,
    configError,
    signIn,
    signUp,
    logout,
    signInWithGoogle,
  };
};
