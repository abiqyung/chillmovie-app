// src/Login.js
import React from "react";
import "./Login.css";
import Logo from "../../assets/chill-logo.png";
import logoGoogle from "../../assets/logo-google.png";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <img src={Logo} alt="Logo" className="login-logo" />
          <h1></h1>
        </div>
        <div className="login-headergreet">
          <h2>Masuk</h2>
          <p>Selamat datang kembali!</p>
        </div>
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
          <div className="login-options">
            <a href="/register" className="register">
              Belum punya akun? Daftar
            </a>
            <a href="/forgot-password" className="forgot-password">
              Lupa kata sandi?
            </a>
          </div>
          <button type="submit" className="login-button">
            Masuk
          </button>
          <div className="divider">Atau</div>
          <button type="button" className="google-login-button">
            <img className="google-logo" src={logoGoogle} alt="Logo Google" />
            Masuk dengan Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
