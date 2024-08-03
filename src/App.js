import React, { useEffect, useState } from "react";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Profile from "./page/Profilepage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser, selectUser } from "./features/userSlice";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // Logged in
        console.log(userAuth);
        const fetchUserData = async () => {
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
        };
        fetchUserData();
      } else {
        // Logged out
        dispatch(logoutUser());
      }
      setLoading(false); // Set loading to false once the auth state is resolved
    });

    return unsubscribe;
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              user ? <ProtectedRoutes /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

function ProtectedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
