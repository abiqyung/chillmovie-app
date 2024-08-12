import React, { useEffect, useState } from "react";
import Row from "../component/Row";
import Nav from "../component/Nav";
import Footer from "../component/Footer";
import { getFirestore, doc, onSnapshot } from "firebase/firestore"; // Import onSnapshot
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Daftarsaya.module.css";

function Daftarsaya() {
  const [myList, setMyList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
        const userDoc = doc(db, "users", user.uid);

        // Listen for real-time updates to the myList field
        const unsubscribeSnapshot = onSnapshot(userDoc, (docSnap) => {
          if (docSnap.exists()) {
            setMyList(docSnap.data().myList || []);
          } else {
            console.log("No such document!");
          }
        });

        // Cleanup the snapshot listener when the component unmounts or user changes
        return () => unsubscribeSnapshot();
      } else {
        setIsLoggedIn(false); // User is not logged in
        setMyList([]); // Clear the list when the user logs out
      }
    });

    // Cleanup the auth listener when the component unmounts
    return () => unsubscribeAuth();
  }, [auth, db]);

  return (
    <div className="app">
      <Nav />
      <h2>Daftar Saya</h2>
      {isLoggedIn ? (
        myList.length > 0 ? (
          <Row title="My List" movies={myList} isLargeRow />
        ) : (
          <p>Your list is empty.</p>
        )
      ) : (
        <p>Please log in to view your list.</p>
      )}
      <Footer />
    </div>
  );
}

export default Daftarsaya;
