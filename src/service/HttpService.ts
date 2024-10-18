import { db } from "@/lib/firebaseConfig";
import { UrlsCollection } from "@/store/types";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

export const getUrls = async (userId: string) => {
  const docRef = doc(db, "urls", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap?.exists()) {
    return docSnap?.data() as UrlsCollection;
  }
  return null;
};

export const getClicks = async (userId: string) => {
  const docRef = doc(db, "clicks", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap?.exists()) {
    return docSnap?.data();
  }
  return null;
};

export const postUrls = async (
  userId: string,
  uniqueId: string,
  custom_url: string,
  original_url: string,
  qr: string,
  short_url: string,
  title: string
) => {
  const docRef = doc(db, "urls", userId);
  await updateDoc(docRef, {
    data: arrayUnion({
      id: uniqueId,
      created_at: new Date(),
      custom_url: custom_url,
      original_url: original_url,
      qr: qr,
      short_url: short_url,
      title: title,
      user_id: userId,
    }),
  });
};

export const getOriginalUrl = async (userId: string, url_id: string) => {
  const docRef = doc(db, "urls", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap?.exists()) {
    const urlData = docSnap?.data(); // add id 
    return urlData
  }
};
