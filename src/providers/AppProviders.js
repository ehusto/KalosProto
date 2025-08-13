// src/providers/AppProviders.js

import React from "react";
import { CustomerProvider } from "../features/customers/CustomerContext";
import { JobProvider } from "../features/jobs/JobContext";
import { RfqProvider } from "../features/rfqs/RfqContext";
import { MeasurementProvider } from "../features/measurements/MeasurementContext";
import { FilterProvider } from "../store/FilterContext";

// This component takes all our individual providers and composes them in one place
export const AppProviders = ({ children }) => {
  return (
    <CustomerProvider>
      <JobProvider>
        <RfqProvider>
          <MeasurementProvider>
            <FilterProvider>{children}</FilterProvider>
          </MeasurementProvider>
        </RfqProvider>
      </JobProvider>
    </CustomerProvider>
  );
};
