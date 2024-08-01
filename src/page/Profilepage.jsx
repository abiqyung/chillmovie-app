import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUser } from "../features/userSlice";
import "./Profilepage.css";
import Navbar from "../component/Nav";
import profile from "../assets/profile.png";
import subscript from "../assets/subs.png";

const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  const handleSave = () => {
    dispatch(updateUser({ name, email, password }));
  };

  return (
    <>
      <div className="profilepage">
        <Navbar />
        <div className="profile">
          <div className="profile-container">
            <h2>Profil Saya</h2>
            <div className="profile-picture">
              <img src={profile} />
              <div className="profile-button">
                <button>Ubah Foto</button>
                <div className="ubah-foto-text">Maksimal 2MB</div>
              </div>
            </div>
            <div className="profile-info">
              <label>
                Nama Pengguna
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                Kata Sandi
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <button className="save-button" onClick={handleSave}>
              Simpan
            </button>
          </div>
          <div className="subscription-status">
            <img src={subscript} className="subscription-img" />
            <div className="subscription-text">
              <div className="subscription-title">
                Saat ini anda belum berlangganan
              </div>
              <div className="subscription-description">
                Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan
                Kamu!
              </div>
              <button
                className="subscription-button"
                onClick={() => dispatch({ type: "user/subscribe" })}
              >
                Mulai Berlangganan
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
