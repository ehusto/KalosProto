// File: src/components/SearchPalette.js

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { COMMANDS } from "../core/commands"; // Import our command list
import "./SearchPalette.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchPalette() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const searchRef = useRef(null); // To detect clicks outside the component

  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const filteredCommands = COMMANDS.filter((cmd) =>
        cmd.title.toLowerCase().includes(lowerCaseQuery)
      );
      setResults(filteredCommands);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef]);

  const handleLinkClick = () => {
    setQuery("");
  };

  return (
    <div className="search-palette" ref={searchRef}>
      <div className="search-input-wrapper">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search actions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {query && results.length > 0 && (
        <ul className="search-results">
          {results.map((cmd) => (
            <li key={cmd.path + cmd.title}>
              <Link
                to={cmd.path}
                className="result-item"
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon icon={cmd.icon} className="result-icon" />
                <span className="result-title">{cmd.title}</span>
                <span className="result-module">{cmd.module}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchPalette;
