import React, { useEffect, useState } from "react";
import Row from "../component/Row";
import requests from "../services/requests";
import Banner from "../component/Banner";
import Nav from "../component/Nav";
import Footer from "../component/Footer";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import getData from "../services/getData"; // Import the getData function

function Home() {
  const [myList, setMyList] = useState([]);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchMyList = async (userId) => {
      const userData = await getData(db, "users", userId); // Use getData here
      if (userData) {
        setMyList(userData.myList || []);
      } else {
        console.log("No such document!");
      }
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchMyList(user.uid);
      }
    });
  }, [auth, db]);

  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row
        title="Melanjutkan Tonton Film"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row
        title="Top Rating Film dan Series Hari ini"
        fetchUrl={requests.fetchTrending}
        isLargeRow
      />
      <Row title="Film Trending" fetchUrl={requests.fetchTopRated} isLargeRow />
      <Row
        title="Rilis Baru"
        fetchUrl={requests.fetchActionMovies}
        isLargeRow
      />
      <Footer />
    </div>
  );
}

export default Home;
