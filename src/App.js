// File: src/App.js (Fully Refactored)

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProviders } from "./providers/AppProviders";
import { AppRoutes } from "./routes/AppRoutes";
import Navbar from "./components/navbar/Navbar";
import "./App.css";

function App() {
  return (
    <AppProviders>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <AppRoutes />
          </main>
        </div>
      </Router>
    </AppProviders>
  );
}

export default App;
