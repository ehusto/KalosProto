// File: src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CustomerProvider } from "./context/CustomerContext";
import "./App.css";

// Import shared and page components
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CustomerListPage from "./pages/customers/CustomerListPage";
import AddCustomerPage from "./pages/customers/AddCustomerPage";
import CustomerDetailPage from "./pages/customers/CustomerDetailPage";
// --- THESE ARE THE MISSING IMPORTS ---
import JobListPage from "./pages/jobs/JobListPage";
import AddJobPage from "./pages/jobs/AddJobPage";

function App() {
  return (
    <CustomerProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              {/* The Dashboard route is simple again and needs no props */}
              <Route path="/" element={<Dashboard />} />

              <Route path="/customers" element={<CustomerListPage />} />
              <Route path="/customers/new" element={<AddCustomerPage />} />
              <Route path="/customers/:id" element={<CustomerDetailPage />} />
              <Route path="/jobs" element={<JobListPage />} />
              <Route path="/jobs/new" element={<AddJobPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CustomerProvider>
  );
}

export default App;
