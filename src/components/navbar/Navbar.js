// File: src/components/Navbar.js

import React from "react";
import { Link, useLocation } from "react-router-dom";
import SearchPalette from "../searchPalette/SearchPalette";
import JobFilterDropdown from "../../features/jobs/JobFilterDropdown";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Kalos Exteriors
      </Link>

      <div className="navbar-center">
        <SearchPalette />
      </div>

      {location.pathname === "/jobs" && <JobFilterDropdown />}

      <ul className="navbar-nav"></ul>
    </nav>
  );
}

export default Navbar;
