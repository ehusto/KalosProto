// File: src/pages/CalendarPage.js

import React from "react";
import { useJobs } from "../context/JobContext";
import { useCustomers } from "../context/CustomerContext";
import { useNavigate } from "react-router-dom";

// --- FULLCALENDAR JAVASCRIPT IMPORTS (These are correct) ---
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// --- CSS IMPORTS HAVE BEEN REMOVED ---
// The styles are now loaded globally from index.html

function CalendarPage() {
  const { jobs } = useJobs();
  const { customers } = useCustomers();
  const navigate = useNavigate();

  // Transform our job data into the "event" format FullCalendar needs
  const events = jobs.map((job) => {
    const customer = customers.find((c) => c._id === job.customer_id);
    const customerName = customer ? customer.name : "Unknown";
    return {
      id: job._id,
      title: `${job.job_id}: ${customerName}`,
      start: job.scheduled_start_date,
    };
  });

  // Navigate to the job's detail page when an event is clicked
  const handleEventClick = (clickInfo) => {
    navigate(`/jobs/${clickInfo.event.id}`);
  };

  return (
    <div className="page-content default-background">
      <h2 style={{ textAlign: "left", marginBottom: "2rem" }}>Job Calendar</h2>

      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4.2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={events}
          eventClick={handleEventClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
        />
      </div>
    </div>
  );
}

export default CalendarPage;
