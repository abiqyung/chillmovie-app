// src/ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "./features/userSlice";

const ProtectedRoute = ({ element }) => {
  const user = useSelector(selectUser);
  return user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
