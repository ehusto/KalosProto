// File: src/components/Navbar.js

// --- IMPORTS go at the top ---
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// --- FUNCTION DEFINITION starts here ---
// The 'return' statement MUST be inside these curly braces.
function Navbar() {
  // The 'return' statement with the JSX for the component.
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Kalos Exteriors
      </Link>

      <ul className="navbar-nav">
        {/* Only the Dashboard link remains */}
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
} // --- FUNCTION DEFINITION ends here ---

// --- EXPORT statement goes at the bottom ---
export default Navbar;
