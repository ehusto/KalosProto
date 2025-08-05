// File: src/context/CustomerContext.js

import React, { createContext, useState, useEffect, useContext } from "react";

// 1. Create the context itself
const CustomerContext = createContext();

// 2. Create the Provider component (the "Wi-Fi router")
// This component will wrap our entire application.
export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([]);

  // Fetch the initial data when the provider first loads
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/customers");
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Failed to fetch customers from API:", error);
      }
    };
    fetchCustomers();
  }, []);

  // Function to add a customer to our state
  const addCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  // The value object is what we "broadcast" to all child components
  const value = {
    customers,
    addCustomer,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

// 3. Create a custom hook for easy consumption
// This is a shortcut so components don't have to import 'useContext' and 'CustomerContext' every time.
export function useCustomers() {
  return useContext(CustomerContext);
}
