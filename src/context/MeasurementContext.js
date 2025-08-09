// File: src/context/MeasurementContext.js

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";

const MeasurementContext = createContext();

export function MeasurementProvider({ children }) {
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        // This line is now active
        const response = await fetch("http://localhost:5001/api/measurements");
        const data = await response.json();
        setMeasurements(data);
        console.log("MEASUREMENT CONTEXT: Fetched measurements", data);
      } catch (error) {
        console.error(
          "MEASUREMENT CONTEXT: Failed to fetch measurements:",
          error
        );
      }
    };
    // This line is now active
    fetchMeasurements();
  }, []);

  const addMeasurement = (newMeasurement) => {
    setMeasurements((prevMeasurements) => [
      ...prevMeasurements,
      newMeasurement,
    ]);
  };

  const value = useMemo(
    () => ({
      measurements,
      addMeasurement,
    }),
    [measurements]
  );

  return (
    <MeasurementContext.Provider value={value}>
      {children}
    </MeasurementContext.Provider>
  );
}

export function useMeasurements() {
  return useContext(MeasurementContext);
}
