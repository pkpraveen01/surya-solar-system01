// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await axios.get("/api/admin/verify", { withCredentials: true });
        setIsAdmin(res.data.isAdmin);
      } catch (err) {
        setIsAdmin(false);
      }
    };

    verifyAdmin();
  }, []);

  if (isAdmin === null) return <p>Loading...</p>;
  return isAdmin ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
