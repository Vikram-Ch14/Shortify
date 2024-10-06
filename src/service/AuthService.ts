import { auth } from "@/lib/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const createUserAcc = async (email: string, password: string) => {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  return response;
};

export const loginUser = async (email: string, password: string) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
};
