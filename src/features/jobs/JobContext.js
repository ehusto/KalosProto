// File: src/context/JobContext.js

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";

const JobContext = createContext();

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("JOB CONTEXT: Failed to fetch jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const addJob = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  // --- THIS IS THE NEW FUNCTION ---
  const updateJob = async (jobId, updateData) => {
    try {
      await fetch(`http://localhost:5001/api/jobs/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, ...updateData } : job
        )
      );
    } catch (error) {
      console.error("JOB CONTEXT: Failed to update job:", error);
    }
  };

  const value = useMemo(
    () => ({
      jobs,
      addJob,
      updateJob, // Expose the new function through the context
    }),
    [jobs]
  );

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

export function useJobs() {
  return useContext(JobContext);
}
