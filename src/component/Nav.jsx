import React, { useState, useEffect } from "react";
import "./Nav.css";
import chillLogo from "../assets/chill-logo.png";
import proflie from "../assets/profile.png";
import { Link } from "react-router-dom";

function Nav() {
  const [show, handleShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__profile" onClick={toggleDropdown}>
        <img className="nav__avatar" src={proflie} alt="Profile" />
        {dropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <i className="fas fa-user dropdown-icon"></i>
              {"     "}Profil Saya
            </div>
            <div className="dropdown-item">
              <i className="fas fa-star dropdown-icon"></i>
              {"     "}Ubah Premium
            </div>
            <a href="/login">
              <div className="dropdown-item">
                <i className="fas fa-sign-out-alt dropdown-icon"></i>
                {"     "}Keluar
              </div>
            </a>
          </div>
        )}
      </div>
      <img className="nav__logo" src={chillLogo} alt="Chill_logo" />
      <a href="#" className="nav__menu">
        Series
      </a>
      <a href="#" className="nav__menu">
        Film
      </a>
      <a href="#" className="nav__menu">
        Daftar Saya
      </a>
    </div>
  );
}

export default Nav;
