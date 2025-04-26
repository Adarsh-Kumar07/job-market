import React, { useEffect, useState } from 'react';
import API from '../utils/api';

export default function AdminPanel() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchAll = async () => {
    const jobsRes = await API.get('/jobs');
    const appsRes = await API.get('/applications');
    const usersRes = await API.get('/users'); // you'll need a backend route for this
    setJobs(jobsRes.data);
    setApplications(appsRes.data);
    setUsers(usersRes.data);
  };

  const deleteJob = async (id) => {
    if (window.confirm('Delete this job?')) {
      await API.delete(`/jobs/${id}`);
      fetchAll();
    }
  };

  const deleteApplication = async (id) => {
    if (window.confirm('Delete this application?')) {
      await API.delete(`/applications/${id}`);
      fetchAll();
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Delete this user?')) {
      await API.delete(`/users/${id}`);
      fetchAll();
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Jobs</h2>
        <div className="space-y-2">
          {jobs.map(job => (
            <div key={job._id} className="border p-3 rounded shadow flex justify-between items-center">
              <div>
                <h3 className="font-bold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company} — {job.location}</p>
              </div>
              <button className="text-red-600" onClick={() => deleteJob(job._id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Applications</h2>
        <div className="space-y-2">
          {applications.map(app => (
            <div key={app._id} className="border p-3 rounded shadow flex justify-between">
              <div>
                <p><strong>Applicant:</strong> {app.applicantId}</p>
                <p><strong>Job:</strong> {app.jobId}</p>
              </div>
              <button className="text-red-600" onClick={() => deleteApplication(app._id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <div className="space-y-2">
          {users.map(user => (
            <div key={user._id} className="border p-3 rounded shadow flex justify-between">
              <div>
                <p><strong>{user.name}</strong> — {user.role}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <button className="text-red-600" onClick={() => deleteUser(user._id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
