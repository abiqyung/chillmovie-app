// src/Footer.js
import React from "react";
import "./Footer.css";
import chillLogo from "../assets/chill-logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={chillLogo} alt="Chill" className="chill-logo" />
          <p>&copy; 2023 Chill All Rights Reserved.</p>
        </div>
        <div className="footer-genres">
          <h4>Genre</h4>
          <div className="footer-genres-group">
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
          <h4>Bantuan</h4>
          <ul>
            <li className="footer-help-list">FAQ</li>
            <li className="footer-help-list">Kontak Kami</li>
            <li className="footer-help-list">Privasi</li>
            <li className="footer-help-list">Syarat & Ketentuan</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
