// File: src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CustomerProvider } from "./context/CustomerContext";
import { JobProvider } from "./context/JobContext";
import "./App.css";

// --- Shared Components ---
import Navbar from "./components/Navbar";

// --- Page Components ---
import Dashboard from "./pages/Dashboard";
// Customer Pages
import CustomerListPage from "./pages/customers/CustomerListPage";
import AddCustomerPage from "./pages/customers/AddCustomerPage";
import CustomerDetailPage from "./pages/customers/CustomerDetailPage";
// Job Pages
import JobListPage from "./pages/jobs/JobListPage";
import AddJobPage from "./pages/jobs/AddJobPage";
import JobDetailPage from "./pages/jobs/JobDetailPage"; // This path must match the file system

function App() {
  return (
    <CustomerProvider>
      <JobProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                {/* All routes use the components imported above */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/customers" element={<CustomerListPage />} />
                <Route path="/customers/new" element={<AddCustomerPage />} />
                <Route path="/customers/:id" element={<CustomerDetailPage />} />
                <Route path="/jobs" element={<JobListPage />} />
                <Route path="/jobs/new" element={<AddJobPage />} />
                <Route path="/jobs/:id" element={<JobDetailPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </JobProvider>
    </CustomerProvider>
  );
}

export default App;
