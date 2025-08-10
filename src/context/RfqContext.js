// File: src/context/RfqContext.js
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";

const RfqContext = createContext();

export function RfqProvider({ children }) {
  const [rfqs, setRfqs] = useState([]);

  useEffect(() => {
    const fetchRfqs = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/rfqs");
        const data = await response.json();
        setRfqs(data);
      } catch (error) {
        console.error("RFQ CONTEXT: Failed to fetch RFQs:", error);
      }
    };
    fetchRfqs();
  }, []);

  const addRfq = (newRfq) => {
    setRfqs((prevRfqs) => [...prevRfqs, newRfq]);
  };

  const updateRfq = async (rfqId, updateData) => {
    try {
      const response = await fetch(`http://localhost:5001/api/rfqs/${rfqId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) throw new Error("Update failed on server");

      // We re-fetch the single, updated RFQ to get the absolute latest data from the DB
      const updatedRfqFromServer = await fetch(
        `http://localhost:5001/api/rfqs/${rfqId}`
      ).then((res) => res.json());

      setRfqs((prevRfqs) => {
        if (updatedRfqFromServer.isArchived) {
          // If archived, remove it from the active list
          return prevRfqs.filter((rfq) => rfq._id !== rfqId);
        }
        // Otherwise, replace the old version with the new one from the server
        return prevRfqs.map((rfq) =>
          rfq._id === rfqId ? updatedRfqFromServer : rfq
        );
      });
    } catch (error) {
      console.error("RFQ CONTEXT: Failed to update RFQ:", error);
    }
  };

  const value = useMemo(() => ({ rfqs, addRfq, updateRfq }), [rfqs]);

  return <RfqContext.Provider value={value}>{children}</RfqContext.Provider>;
}

export function useRfqs() {
  return useContext(RfqContext);
}
