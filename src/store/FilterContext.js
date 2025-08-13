// File: src/context/FilterContext.js

import React, { createContext, useState, useContext, useMemo } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  // State for all possible filters
  const [jobFilters, setJobFilters] = useState({
    salesman: "All",
    status: "All",
    city: "All",
  });

  // Function to update the filters
  const updateJobFilters = (newFilters) => {
    setJobFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  // Function to clear all filters back to their default state
  const clearJobFilters = () => {
    setJobFilters({ salesman: "All", status: "All", city: "All" });
  };

  const value = useMemo(
    () => ({
      jobFilters,
      updateJobFilters,
      clearJobFilters,
    }),
    [jobFilters]
  );

  return (
    // --- THIS IS THE CORRECTED CLOSING TAG ---
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

// Custom hook for easy consumption
export function useFilters() {
  return useContext(FilterContext);
}
