// File: src/components/Navbar.js

import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Kalos Exteriors
      </Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/customers" className="nav-link">
            Customers
          </Link>
        </li>
      </ul>
    </nav>
  );
}

// CRUCIAL: Make sure this line is at the very bottom!
export default Navbar;
