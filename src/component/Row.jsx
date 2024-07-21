import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  console.log(movies);
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`row__posters__cage row__poster ${
              isLargeRow && "row__posterLarge"
            }`}
          >
            <img
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
            <div className="movie-info">
              <div className="movie-buttons">
                <button className="play-button">▶</button>
                <button className="check-button">✔</button>
                <button className="drop-button">▼</button>
              </div>
              <div className="movie-details">
                <span className="movie-age">13+</span>
                <span className="movie-duration">2j 33m</span>
                <div className="movie-genres">
                  {movie.genres &&
                    movie.genres.map((genre, index) => (
                      <span key={index} className="genre">
                        {genre.name}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
