import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import { Link } from 'react-router-dom';


export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ category: '', location: '', search: '' });

  const fetchJobs = async () => {
    const params = new URLSearchParams(filters);
    const res = await API.get(`/jobs?${params.toString()}`);
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <FilterBar filters={filters} setFilters={setFilters} />
      <div className="grid gap-4">
        {jobs.map(job => <JobCard key={job._id} job={job} />)}
        {jobs.length === 0 && <p>No jobs found.</p>}
      </div>
    </div>
  );
}
