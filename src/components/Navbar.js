// File: src/components/Navbar.js

import React from "react";
import { Link, useLocation } from "react-router-dom";
import SearchPalette from "./SearchPalette";
import JobFilterDropdown from "./JobFilterDropdown";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      {/* The brand logo now serves as the primary "home" button */}
      <Link to="/" className="navbar-brand">
        Kalos Exteriors
      </Link>

      <div className="navbar-center">
        <SearchPalette />
      </div>

      {location.pathname === "/jobs" && <JobFilterDropdown />}

      {/* The entire <ul> for the right-side links can now be removed,
          or kept empty if you plan to add other links later (like a "Log Out" button).
          Let's remove it for maximum cleanliness. */}
      <ul className="navbar-nav">
        {/* The <li> for the "Dashboard" link has been deleted. */}
      </ul>
    </nav>
  );
}

export default Navbar;
