import React, { useState, useEffect, useRef } from "react";
import "./Nav.css";
import chillLogo from "../assets/chill-logo.png";
import defaultProfile from "../assets/profile.png"; // Use this as a default profile picture
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "../features/userSlice"; // Corrected import
import { auth } from "../firebase";

function Nav() {
  const [show, handleShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const user = useSelector(selectUser); // Get user from Redux state

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logging out..."); // Debugging
    auth
      .signOut()
      .then(() => {
        console.log("Logout successful"); // Debugging
        dispatch(logoutUser());
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <a href="/">
        <img className="nav__logo" src={chillLogo} alt="Chill_logo" />
      </a>
      <a href="#" className="nav__menu">
        Series
      </a>
      <a href="#" className="nav__menu">
        Film
      </a>
      <a href="/daftarsaya" className="nav__menu">
        Daftar Saya
      </a>
      <div className="nav__profile" ref={dropdownRef}>
        {user.id ? (
          <>
            <img
              className="nav__avatar"
              src={user.profilePicture || defaultProfile}
              alt="Profile"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/Profile" className="dropdown-item">
                  <i className="fas fa-user dropdown-icon"></i>
                  {"     "}Profil Saya
                </Link>
                <div className="dropdown-item">
                  <i className="fas fa-star dropdown-icon"></i>
                  {"     "}Ubah Premium
                </div>
                <div onClick={handleLogout} className="dropdown-item">
                  <i className="fas fa-sign-out-alt dropdown-icon"></i>
                  {"     "}Keluar
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            className="nav__loginButton"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Nav;
