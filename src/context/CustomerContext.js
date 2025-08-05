// File: src/context/CustomerContext.js

import React, { createContext, useState, useEffect, useContext } from "react";

const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/customers");
        const data = await response.json();

        console.log("CONTEXT: Data successfully fetched from API:", data);

        setCustomers(data);
      } catch (error) {
        console.error("CONTEXT: Failed to fetch customers from API:", error);
      }
    };
    fetchCustomers();
  }, []);

  const addCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  const value = {
    customers,
    addCustomer,
  };

  console.log("CONTEXT: Providing this value to children:", value);

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomers() {
  return useContext(CustomerContext);
}
