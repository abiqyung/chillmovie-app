import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUser } from "../features/userSlice";
import "./Profilepage.css";
import Navbar from "../component/Nav";
import defaultProfile from "../assets/profile.png";
import subscript from "../assets/subs.png";
import { auth } from "../firebase";
import { updatePassword } from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase"; // Import storage correctly
import { doc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(defaultProfile);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    if (user.profilePicture) {
      setProfilePicture(user.profilePicture);
    }
  }, [user]);

  const handleSave = async () => {
    // Update username and email
    dispatch(updateUser({ name, email }));

    // Update password if provided
    if (password) {
      try {
        await updatePassword(auth.currentUser, password);
        alert("Password updated successfully");
      } catch (error) {
        console.error("Error updating password:", error);
        alert(error.message);
      }
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
    await uploadBytes(storageRef, file);

    const photoURL = await getDownloadURL(storageRef);
    setProfilePicture(photoURL);

    // Update the user's profile picture in Firestore
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      profilePicture: photoURL,
    });

    dispatch(updateUser({ ...user, profilePicture: photoURL }));
  };

  const handleProfilePictureRemove = async () => {
    const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
    await deleteObject(storageRef);

    setProfilePicture(defaultProfile);

    // Update the user's profile picture in Firestore
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      profilePicture: "",
    });

    dispatch(updateUser({ ...user, profilePicture: "" }));
  };

  return (
    <>
      <div className="profilepage">
        <Navbar />
        <div className="profile">
          <div className="profile-container">
            <h2>Profil Saya</h2>
            <div className="profile-picture">
              <img src={profilePicture} alt="Profile" />
              <div className="profile-button">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  style={{ display: "none" }}
                  id="profilePictureUpload"
                />
                <label
                  htmlFor="profilePictureUpload"
                  className="profile-upload-button"
                >
                  Ubah Foto
                </label>
                <button onClick={handleProfilePictureRemove}>Hapus Foto</button>
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
                  placeholder="Masukkan kata sandi baru"
                />
              </label>
            </div>
            <button className="save-button" onClick={handleSave}>
              Simpan
            </button>
          </div>
          <div className="subscription-status">
            <img
              src={subscript}
              className="subscription-img"
              alt="Subscription"
            />
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
