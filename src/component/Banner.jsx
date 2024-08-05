import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import requests from "../services/requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovies(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
        <div className="banner__buttons">
          <div>
            <button className="banner__buttonleft banner__button__start">
              Mulai
            </button>
            <button className="banner__buttonleft banner__button__more">
              Selengkapnya
            </button>
            <button className="banner__buttonleft banner__button__age">
              18+
            </button>
          </div>
          <button className="banner__buttonright">🔊</button>
        </div>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
}

export default Banner;
