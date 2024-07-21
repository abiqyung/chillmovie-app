import React from "react";
import Row from "../../component/Row";
import requests from "../../requests";
import Banner from "../../component/Banner";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";

function Home() {
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
