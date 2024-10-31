// src/auth.js
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from './config/FirebaseConfig';

const auth = getAuth(app);

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in");
  } catch (error) {
    console.error("Error logging in: ", error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out: ", error);
  }
};
