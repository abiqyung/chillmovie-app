import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow, movies: propMovies }) {
  const [movies, setMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    if (propMovies) {
      setMovies(propMovies);
    } else {
      async function fetchData() {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        return request;
      }
      fetchData();
    }
  }, [fetchUrl, propMovies]);

  useEffect(() => {
    const fetchUserMovies = async (userId) => {
      const userDoc = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDoc);
      if (userDocSnap.exists()) {
        setUserMovies(userDocSnap.data().myList || []);
      }
    };

    const user = auth.currentUser;
    if (user) {
      fetchUserMovies(user.uid);
    }
  }, [auth, db]);

  const toggleMyList = async (movie) => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const userDoc = doc(db, "users", userId);
      const updatedMovies = [...userMovies];

      try {
        const userDocSnap = await getDoc(userDoc);
        const currentUserMovies = userDocSnap.exists()
          ? userDocSnap.data().myList || []
          : [];
        if (currentUserMovies.some((m) => m.id === movie.id)) {
          // Movie exists in list, remove it
          await updateDoc(userDoc, {
            myList: arrayRemove(movie),
          });
          setUserMovies(updatedMovies.filter((m) => m.id !== movie.id));
          alert(`${movie.title} has been removed from your list.`);
        } else {
          // Movie does not exist in list, add it
          await updateDoc(userDoc, {
            myList: arrayUnion(movie),
          });
          setUserMovies([...updatedMovies, movie]);
          alert(`${movie.title} has been added to your list.`);
        }
      } catch (error) {
        console.error("Error updating movie in list:", error);
      }
    } else {
      alert("Please log in to add or remove movies from your list.");
    }
  };

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
                <button className="play-button">
                  <i className="fas fa-play"></i>
                  <span className="tooltip">Mulai</span>
                </button>

                <button
                  className="checklist-button"
                  onClick={() => toggleMyList(movie)}
                >
                  <i
                    className={
                      userMovies.some((m) => m.id === movie.id)
                        ? "fas fa-check"
                        : "fa-solid fa-plus"
                    }
                  ></i>
                  <span className="tooltip">
                    {userMovies.some((m) => m.id === movie.id)
                      ? "Keluarkan dari daftar saya"
                      : "Tambah ke daftar saya"}
                  </span>
                </button>

                <button
                  className="dropdown-button"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-caret-down"></i>
                  <span className="tooltip">Info</span>
                </button>
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
