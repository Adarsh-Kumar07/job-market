import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function DashboardHome() {
  return <div>Welcome to your dashboard 🎉</div>;
}

function MyApplications() {
  const [applications, setApplications] = React.useState([]);

  React.useEffect(() => {
    const fetchApps = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/applications/mine', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setApplications(data);
    };

    fetchApps();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Applications</h2>
      <ul className="space-y-4">
        {applications.map((app) => (
          <li key={app._id} className="border p-4 rounded shadow">
            <p><strong>Job ID:</strong> {app.jobId}</p>
            <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
            <p className="text-sm text-gray-500">Applied on {new Date(app.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MyJobs() {
  const [jobs, setJobs] = React.useState([]);

  React.useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(atob(token.split('.')[1])); // decode payload
      const res = await fetch('/api/jobs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allJobs = await res.json();
      const myJobs = allJobs.filter((job) => job.employerId === user.id);
      setJobs(myJobs);
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Posted Jobs</h2>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job._id} className="border p-4 rounded shadow">
            <p><strong>Title:</strong> {job.title}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Description:</strong> {job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Profile() {
  const [uploading, setUploading] = React.useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('resume', file);

    setUploading(true);
    const token = localStorage.getItem('token');
    await fetch('/api/users/upload-resume', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    setUploading(false);
    alert('Resume uploaded!');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>
      <label className="block mb-2 font-medium">Upload Resume (PDF):</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleUpload}
        className="block p-2 border rounded"
      />
      {uploading && <p className="text-sm text-blue-500 mt-2">Uploading...</p>}
    </div>
  );
}

export default function UserDashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-white">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="my-jobs" element={<MyJobs />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
