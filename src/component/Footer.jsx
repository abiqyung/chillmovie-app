import React, { useState } from "react";
import "./Footer.css";
import chillLogo from "../assets/chill-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  const [genresOpen, setGenresOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const toggleGenres = () => setGenresOpen(!genresOpen);
  const toggleHelp = () => setHelpOpen(!helpOpen);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={chillLogo} alt="Chill" className="chill-logo" />
          <p>&copy; 2023 Chill All Rights Reserved.</p>
        </div>
        <div className="footer-genres">
          <h4 className="footer-section-title" onClick={toggleGenres}>
            Genre
            <FontAwesomeIcon
              icon={genresOpen ? faAngleDown : faAngleRight}
              className="dropdown-icon"
            />
          </h4>
          <div className={`footer-genres-group ${genresOpen ? "open" : ""}`}>
            <a href="#" className="footer-genres-list">
              Aksi
            </a>
            <a href="#" className="footer-genres-list">
              Anak-anak
            </a>
            <a href="#" className="footer-genres-list">
              Anime
            </a>
            <a href="#" className="footer-genres-list">
              Britania
            </a>
            <a href="#" className="footer-genres-list">
              Drama
            </a>
            <a href="#" className="footer-genres-list">
              Fantasi Ilmiah & Fantasi
            </a>
            <a href="#" className="footer-genres-list">
              Kejahatan
            </a>
            <a href="#" className="footer-genres-list">
              KDrama
            </a>
            <a href="#" className="footer-genres-list">
              Komedi
            </a>
            <a href="#" className="footer-genres-list">
              Petualangan
            </a>
            <a href="#" className="footer-genres-list">
              Perang
            </a>
            <a href="#" className="footer-genres-list">
              Romantis
            </a>
            <a href="#" className="footer-genres-list">
              Sains & Alam
            </a>
            <a href="#" className="footer-genres-list">
              Thriller
            </a>
          </div>
        </div>
        <div className="footer-help">
          <h4 className="footer-section-title" onClick={toggleHelp}>
            Bantuan
            <FontAwesomeIcon
              icon={helpOpen ? faAngleDown : faAngleRight}
              className="dropdown-icon"
            />
          </h4>
          <ul className={`footer-help-list ${helpOpen ? "open" : ""}`}>
            <li>FAQ</li>
            <li>Kontak Kami</li>
            <li>Privasi</li>
            <li>Syarat & Ketentuan</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
