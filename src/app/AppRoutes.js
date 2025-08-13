// src/routes/AppRoutes.js

import React from "react";
import { Routes, Route } from "react-router-dom";

// Import all page components needed for routing
import Dashboard from "../pages/dashboard/Dashboard";
import CustomerListPage from "../features/customers/CustomerListPage";
import AddCustomerPage from "../features/customers/AddCustomerPage";
import CustomerDetailPage from "../features/customers/CustomerDetailPage";
import JobListPage from "../features/jobs/JobListPage";
import AddJobPage from "../features/jobs/AddJobPage";
import JobDetailPage from "../features/jobs/JobDetailPage";
import CalendarPage from "../features/calendar/CalendarPage";
import RfqListPage from "../features/rfqs/RfqListPage";
import AddRfqPage from "../features/rfqs/AddRfqPage";
import RfqDetailPage from "../features/rfqs/RfqDetailPage";
import RfqArchivePage from "../features/rfqs/RfqArchivePage";
import MeasurementListPage from "../features/measurements/MeasurementListPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/customers" element={<CustomerListPage />} />
      <Route path="/customers/new" element={<AddCustomerPage />} />
      <Route path="/customers/:id" element={<CustomerDetailPage />} />
      <Route path="/jobs" element={<JobListPage />} />
      <Route path="/jobs/new" element={<AddJobPage />} />
      <Route path="/jobs/:id" element={<JobDetailPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/rfqs" element={<RfqListPage />} />
      <Route path="/rfqs/new" element={<AddRfqPage />} />
      <Route path="/rfqs/archive" element={<RfqArchivePage />} />
      <Route path="/rfqs/:id" element={<RfqDetailPage />} />
      <Route path="/measurements" element={<MeasurementListPage />} />
    </Routes>
  );
};
