import React, { useEffect, useState } from 'react';
import API from '../utils/api';

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicants, setApplicants] = useState([]);

  const token = localStorage.getItem('token');
  const user = JSON.parse(atob(token.split('.')[1])); // decode user

  const fetchJobs = async () => {
    const res = await API.get('/jobs');
    const employerJobs = res.data.filter(job => job.employerId === user.id);
    setJobs(employerJobs);
  };

  const fetchApplicants = async (jobId) => {
    const res = await API.get(`/applications/job/${jobId}`);
    setApplicants(res.data);
    setSelectedJobId(jobId);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Employer Dashboard</h1>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl mb-2">Your Job Listings</h2>
          <ul className="space-y-3">
            {jobs.map(job => (
              <li key={job._id} className="border p-3 rounded shadow hover:bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.location}</p>
                  </div>
                  <button
                    onClick={() => fetchApplicants(job._id)}
                    className="text-blue-600 underline"
                  >
                    View Applicants
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl mb-2">Applicants</h2>
          {selectedJobId ? (
            applicants.length > 0 ? (
              <ul className="space-y-3">
                {applicants.map(app => (
                  <li key={app._id} className="border p-3 rounded shadow">
                    <p><strong>Applicant ID:</strong> {app.applicantId}</p>
                    <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
                    <p className="text-xs text-gray-400">Applied on {new Date(app.createdAt).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            ) : <p>No applicants yet.</p>
          ) : <p>Select a job to view applicants.</p>}
        </div>
      </div>
    </div>
  );
}
