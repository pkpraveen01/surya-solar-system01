import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">☀️ SURYA SOLAR SYSTEM</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/inquire">Inquiry</Link>
          <Link to="/about">About</Link>
          <Link to="/support">Support</Link>

          {/* ✅ Admin Login Link */}
          <Link to="/admin/login" className="admin-link">Admin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
