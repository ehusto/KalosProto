// File: src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CustomerProvider } from "./features/customers/CustomerContext";
import { JobProvider } from "./features/jobs/JobContext";
import { RfqProvider } from "./features/rfqs/RfqContext";
import { MeasurementProvider } from "./features/measurements/MeasurementContext";
import { FilterProvider } from "./store/FilterContext"; // <-- IMPORT THE MISSING PROVIDER
import "./App.css";

// Import all page components
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/Dashboard";
import CustomerListPage from "./features/customers/CustomerListPage";
import AddCustomerPage from "./features/customers/AddCustomerPage";
import CustomerDetailPage from "./features/customers/CustomerDetailPage";
import JobListPage from "./features/jobs/JobListPage";
import AddJobPage from "./features/jobs/AddJobPage";
import JobDetailPage from "./features/jobs/JobDetailPage";
import CalendarPage from "./features/calendar/CalendarPage";
import RfqListPage from "./features/rfqs/RfqListPage";
import AddRfqPage from "./features/rfqs/AddRfqPage";
import RfqDetailPage from "./pages/rfqs/RfqDetailPage";
import RfqArchivePage from "./features/rfqs/RfqArchivePage";
import MeasurementListPage from "./features/measurements/MeasurementListPage";

function App() {
  return (
    // We wrap all the providers at the top level of the application
    <CustomerProvider>
      <JobProvider>
        <RfqProvider>
          <MeasurementProvider>
            <FilterProvider>
              <Router>
                <div className="App">
                  <Navbar />
                  <main>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/customers" element={<CustomerListPage />} />
                      <Route
                        path="/customers/new"
                        element={<AddCustomerPage />}
                      />
                      <Route
                        path="/customers/:id"
                        element={<CustomerDetailPage />}
                      />
                      <Route path="/jobs" element={<JobListPage />} />
                      <Route path="/jobs/new" element={<AddJobPage />} />
                      <Route path="/jobs/:id" element={<JobDetailPage />} />
                      <Route path="/calendar" element={<CalendarPage />} />
                      <Route path="/rfqs" element={<RfqListPage />} />
                      <Route path="/rfqs/new" element={<AddRfqPage />} />
                      <Route
                        path="/rfqs/archive"
                        element={<RfqArchivePage />}
                      />
                      <Route path="/rfqs/:id" element={<RfqDetailPage />} />
                      <Route
                        path="/measurements"
                        element={<MeasurementListPage />}
                      />
                    </Routes>
                  </main>
                </div>
              </Router>
            </FilterProvider>
          </MeasurementProvider>
        </RfqProvider>
      </JobProvider>
    </CustomerProvider>
  );
}

export default App;
