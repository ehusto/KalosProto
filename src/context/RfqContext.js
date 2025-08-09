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

  // This is the function for adding a new RFQ to the state
  const addRfq = (newRfq) => {
    setRfqs((prevRfqs) => [...prevRfqs, newRfq]);
  };

  // This is the function for updating an existing RFQ
  const updateRfq = async (rfqId, updateData) => {
    try {
      await fetch(`http://localhost:5001/api/rfqs/${rfqId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      setRfqs((prevRfqs) => {
        if (updateData.isArchived) {
          return prevRfqs.filter((rfq) => rfq._id !== rfqId);
        }
        return prevRfqs.map((rfq) =>
          rfq._id === rfqId ? { ...rfq, ...updateData } : rfq
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
