import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';

export default function ApplyJob() {
  const { id } = useParams(); // jobId from URL
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);
      setJob(res.data);
    } catch {
      alert('Job not found');
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = JSON.parse(atob(token.split('.')[1]));

    try {
      await API.post('/applications', {
        jobId: id,
        applicantId: user.id,
        coverLetter
      });
      alert('Applied successfully!');
      navigate('/');
    } catch {
      alert('Error applying');
    }
  };

  if (!job) return <p className="p-4">Loading job...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-2">Apply for {job.title}</h1>
      <p className="mb-4 text-sm text-gray-600">{job.company} — {job.location}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows={6}
          placeholder="Write your cover letter here..."
          className="w-full border p-2"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit Application</button>
      </form>
    </div>
  );
}
