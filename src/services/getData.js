// services/getData.js
import { doc, getDoc } from "firebase/firestore";

// Generic function to get data from Firestore
const getData = async (db, collection, documentId) => {
  const docRef = doc(db, collection, documentId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export default getData;
