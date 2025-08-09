// File: src/context/CustomerContext.js

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";

const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/customers");
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("CONTEXT: Failed to fetch customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  const addCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  const value = useMemo(() => ({ customers, addCustomer }), [customers]);

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomers() {
  return useContext(CustomerContext);
}
