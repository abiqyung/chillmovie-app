import React, { useRef, useState } from "react";
import "./Login.css";
import Logo from "../assets/chill-logo.png";
import logoGoogle from "../assets/logo-google.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Import auth from firebase.js
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const usernameRef = useRef(null);
  const passRef = useRef(null);
  const navigate = useNavigate(); // Get the navigate function

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const logged = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      usernameRef.current.value,
      passRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
        navigate("/"); // Redirect to the home page upon successful login
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      logged(e);
    }
  };

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
        <form onKeyPress={handleKeyPress}>
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
          <div className="login-options">
            <a href="/register" className="register">
              Belum punya akun? Daftar
            </a>
            <a href="/forgot-password" className="forgot-password">
              Lupa kata sandi?
            </a>
          </div>
          <button type="submit" className="login-button" onClick={logged}>
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
}

export default Login;
