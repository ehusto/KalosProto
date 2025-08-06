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

  const value = useMemo(
    () => ({
      jobs,
      addJob,
    }),
    [jobs]
  );

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

export function useJobs() {
  return useContext(JobContext);
}
