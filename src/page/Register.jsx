import React, { useRef, useState } from "react";
import "./Register.css";
import logo from "../assets/chill-logo.png";
import googleLogo from "../assets/logo-google.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Import auth from firebase.js
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Register() {
  const usernameRef = useRef(null);
  const passRef = useRef(null);
  const confpassRef = useRef(null);
  const navigate = useNavigate(); // Get the navigate function

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfPasswordVisibility = () => {
    setShowConfPassword((prevShowConfPassword) => !prevShowConfPassword);
  };

  const reg = (e) => {
    e.preventDefault();

    if (passRef.current.value !== confpassRef.current.value) {
      alert("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      usernameRef.current.value,
      passRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
        alert("Registration successful!");
        navigate("/login"); // Redirect to the login page upon successful registration
      })
      .catch((error) => {
        alert(error.message);
      });
  };

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
            <label htmlFor="username">E-mail</label>
            <input
              ref={usernameRef}
              type="text"
              id="username"
              placeholder="Masukkan e-mail"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Kata Sandi</label>
            <div className="password-input">
              <input
                ref={passRef}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Masukkan kata sandi"
              />
              <span
                className="show-password"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Konfirmasi Kata Sandi</label>
            <div className="password-input">
              <input
                ref={confpassRef}
                type={showConfPassword ? "text" : "password"}
                id="confirm-password"
                placeholder="Masukkan kata sandi"
              />
              <span
                className="show-password"
                onClick={toggleConfPasswordVisibility}
              >
                <FontAwesomeIcon icon={showConfPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          <div className="register-options">
            <a className="register-options" href="/login">
              Sudah punya akun? Masuk
            </a>
          </div>
          <button type="submit" className="register-button" onClick={reg}>
            Daftar
          </button>
          <div className="divider">Atau</div>
          <button type="button" className="google-register-button">
            <img src={googleLogo} className="google-logo" alt="Logo Google" />
            Daftar dengan Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
