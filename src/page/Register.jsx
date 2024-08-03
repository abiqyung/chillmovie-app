import React, { useRef, useState } from "react";
import "./Register.css";
import logo from "../assets/chill-logo.png";
import googleLogo from "../assets/logo-google.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"; // Import auth and db from firebase.js
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { doc, setDoc, collection } from "firebase/firestore"; // Import Firestore functions

function Register() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const confpassRef = useRef(null);
  const navigate = useNavigate(); // Get the navigate function

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfPasswordVisibility = () => {
    setShowConfPassword((prevShowConfPassword) => !prevShowConfPassword);
  };

  const reg = async (e) => {
    e.preventDefault();

    const email = emailRef.current ? emailRef.current.value : "";
    const password = passRef.current ? passRef.current.value : "";
    const confirmPassword = confpassRef.current
      ? confpassRef.current.value
      : "";
    const username = usernameRef.current ? usernameRef.current.value : "";

    if (!email || !password || !username || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    // Simple email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Invalid email address");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true); // Start loading

    try {
      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created:", authUser.user.uid); // Debugging: Log user ID

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", authUser.user.uid), {
        username: username,
        email: email,
        createdAt: new Date().toISOString(),
      });

      console.log("User data stored in Firestore");

      // Store the username to email mapping in Firestore
      await setDoc(doc(collection(db, "usernames"), username), {
        email: email,
      });

      console.log("Username mapping stored in Firestore");

      alert("Registration successful!");
      navigate("/login"); // Redirect to the login page upon successful registration
    } catch (error) {
      console.error("Error registering user:", error); // Debugging: Log error
      alert(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
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
            <label htmlFor="username">Username</label>
            <input
              ref={usernameRef}
              type="text"
              id="username"
              placeholder="Masukkan username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              ref={emailRef}
              type="email"
              id="email"
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
          <button
            type="submit"
            className="register-button"
            onClick={reg}
            disabled={loading}
          >
            {loading ? "Loading..." : "Daftar"}
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
