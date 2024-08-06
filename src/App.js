import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Profile from "./page/Profilepage";
import Daftarsaya from "./page/Daftarsaya";
import { loginUser, logoutUser, selectUser } from "./features/userSlice";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userDoc = await getDoc(doc(db, "users", userAuth.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          dispatch(
            loginUser({
              id: userAuth.uid,
              username: userData.username,
              email: userData.email,
              profilePicture: userData.profilePicture || "",
            })
          );
        }
      } else {
        dispatch(logoutUser());
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/daftarsaya"
            element={<ProtectedRoute element={<Daftarsaya />} />}
          />
          <Route
            path="*"
            element={<Navigate to={user ? "/" : "/login"} replace />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
