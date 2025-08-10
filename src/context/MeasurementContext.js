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
    fetchMeasurements();
  }, []);

  const addMeasurement = (newMeasurement) => {
    setMeasurements((prevMeasurements) => [
      ...prevMeasurements,
      newMeasurement,
    ]);
  };

  // ---BOM Generation---
  const calculateBOM = async (measurementId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/measurements/${measurementId}/calculate-bom`,
        {
          method: "POST",
        }
      );
      if (!response.ok) throw new Error("BOM calculation failed");
      const newBom = await response.json();

      // Update our local state to include the new BOM
      setMeasurements((prev) =>
        prev.map((m) =>
          m._id === measurementId ? { ...m, billOfMaterials: newBom } : m
        )
      );
    } catch (error) {
      console.error("CONTEXT: Failed to calculate BOM:", error);
    }
  };

  const value = useMemo(
    () => ({
      measurements,
      addMeasurement,
      calculateBOM,
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
