// src/Register.js
import React from "react";
import "./Register.css";
import logo from "../../assets/chill-logo.png";
import googleLogo from "../../assets/logo-google.png";

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <img src={logo} alt="Logo" className="register-logo" />
          <h1></h1>
        </div>
        <h2>Daftar</h2>
        <p>Selamat datang!</p>
        <form>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Masukkan username" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Kata Sandi</label>
            <div className="password-input">
              <input
                type="password"
                id="password"
                placeholder="Masukkan kata sandi"
              />
              <span className="show-password">👁️</span>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Konfirmasi Kata Sandi</label>
            <div className="password-input">
              <input
                type="password"
                id="confirm-password"
                placeholder="Masukkan kata sandi"
              />
              <span className="show-password">👁️</span>
            </div>
          </div>
          <div className="register-options">
            <a className="register-options" href="/login">
              Sudah punya akun? Masuk
            </a>
          </div>
          <button type="submit" className="register-button">
            Daftar
          </button>
          <div className="divider">Atau</div>
          <button type="button" className="google-register-button">
            <img src={googleLogo} className="google-logo" />
            Daftar dengan Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
