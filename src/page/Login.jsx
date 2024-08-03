import React, { useRef, useState } from "react";
import "./Login.css";
import Logo from "../assets/chill-logo.png";
import logoGoogle from "../assets/logo-google.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { loginUser } from "../features/userSlice";

function Login() {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const logged = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;

    try {
      const authUser = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", authUser);

      // Retrieve user data from Firestore
      const userDoc = await getDoc(doc(db, "users", authUser.user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data from Firestore:", userData); // Debugging
        dispatch(
          loginUser({
            id: authUser.user.uid,
            username: userData.username,
            email: userData.email,
          })
        );
      }

      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert(error.message);
    }
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
