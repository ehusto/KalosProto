// File: src/App.js
// This file acts as the main router for the entire application.

// Import necessary libraries and components
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import all the page-level components that our router will use
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import CustomerListPage from "./components/CustomerListPage";
import CustomerDetailPage from "./components/CustomerDetailPage";
import AddCustomerPage from "./components/AddCustomerPage"; // The page with the "new customer" form

function App() {
  return (
    // The <Router> component enables all the navigation functionality.
    <Router>
      <div className="App">
        {/* The Navbar is placed outside the <Routes> so it will be visible on EVERY page. */}
        <Navbar />

        <main>
          {/* 
            The <Routes> component acts like a switch. It checks the browser URL
            and renders the FIRST <Route> that has a matching path.
            The order of the routes is important.
          */}
          <Routes>
            {/* --- General Routes --- */}
            <Route path="/" element={<Dashboard />} />

            {/* --- Customer Module Routes --- */}

            {/* Route for the main customer list page */}
            <Route path="/customers" element={<CustomerListPage />} />

            {/* Route for the "Add New Customer" form. */}
            {/* This MUST come BEFORE the dynamic /:id route. */}
            {/* If it were after, the router would see "/customers/new" and think "new" is an ID. */}
            <Route path="/customers/new" element={<AddCustomerPage />} />

            {/* Dynamic route for viewing a single customer's detail page. */}
            {/* The ":id" part is a URL parameter that can be anything. */}
            <Route path="/customers/:id" element={<CustomerDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
