// File: src/components/JobFilterDropdown.js
import React, { useState, useEffect, useRef } from "react";
import { useJobs } from "../features/jobs/JobContext";
import { useFilters } from "../context/FilterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import "./JobFilterDropdown.css"; // <-- We'll create this

function JobFilterDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { jobs } = useJobs();
  const { jobFilters, updateJobFilters, clearJobFilters } = useFilters();
  const dropdownRef = useRef(null);

  // Logic to close dropdown when clicking outside
  useEffect(() => {
    // ... (This is the same click-outside logic as our search palette)
  }, []);

  const uniqueSalesmen = ["All", ...new Set(jobs.map((job) => job.salesman))];
  const uniqueStatuses = [
    "All",
    ...new Set(jobs.map((job) => job.status || "Scheduled")),
  ];
  const uniqueCities = [
    "All",
    ...new Set(jobs.map((job) => job.job_site_address?.city).filter(Boolean)),
  ];

  return (
    <div className="filter-dropdown-container" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="filter-toggle-btn">
        <FontAwesomeIcon icon={faFilter} />
        <span>Filter Jobs</span>
      </button>

      {isOpen && (
        <div className="filter-dropdown-menu">
          <div className="filter-group">
            <label>Salesman:</label>
            <select
              value={jobFilters.salesman}
              onChange={(e) => updateJobFilters({ salesman: e.target.value })}
            >
              {uniqueSalesmen.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Status:</label>
            <select
              value={jobFilters.status}
              onChange={(e) => updateJobFilters({ status: e.target.value })}
            >
              {uniqueStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>City:</label>
            <select
              value={jobFilters.city}
              onChange={(e) => updateJobFilters({ city: e.target.value })}
            >
              {uniqueCities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <button onClick={clearJobFilters} className="clear-filters-btn">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
export default JobFilterDropdown;
