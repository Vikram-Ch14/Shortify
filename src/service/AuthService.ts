import { auth, db } from "@/lib/firebaseConfig";
import { UserData } from "@/store/types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const createUserAcc = async (email: string, password: string) => {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  return response;
};

export const userData = async (
  userId: string,
  username: string,
  email: string
) => {
  await setDoc(doc(db, "usercollection", userId), {
    username,
    email,
    id: userId,
  });
};

export const loginUser = async (email: string, password: string) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
};

export const fetchUserInfo = async (userId: string) => {
  const docRef = doc(db, "usercollection", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap?.exists()) {
    return docSnap?.data() as UserData;
  }
  return null;
};
