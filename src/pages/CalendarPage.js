// File: src/pages/CalendarPage.js

import React, { useState } from "react";
import { useJobs } from "../features/jobs/JobContext";
import { useCustomers } from "../features/customers/CustomerContext";
import EventDetailModal from "../components/EventDetailModal/EventDetailModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// The CSS for FullCalendar is correctly loaded in your public/index.html

function CalendarPage() {
  const { jobs } = useJobs();
  const { customers } = useCustomers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const events = jobs.map((job) => {
    const customer = customers.find((c) => c._id === job.customer_id);
    const customerName = customer ? customer.name : "Unknown";

    return {
      id: job._id,
      title: `${job.job_id}: ${customerName}`,
      start: job.scheduled_start_date,
    };
  });

  const handleEventClick = (clickInfo) => {
    const job = jobs.find((j) => j._id === clickInfo.event.id);
    if (job) {
      setSelectedJob(job);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const selectedCustomer = customers.find(
    (c) => c._id === selectedJob?.customer_id
  );

  return (
    <div className="page-content default-background">
      <h2 style={{ textAlign: "left", marginBottom: "2rem" }}>Job Calendar</h2>

      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          position: "relative",
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
        />
      </div>

      {isModalOpen && (
        <EventDetailModal
          job={selectedJob}
          customer={selectedCustomer}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default CalendarPage;
