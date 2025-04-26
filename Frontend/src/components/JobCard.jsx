import React from 'react';

export default function JobCard({ job }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <h2 className="text-lg font-bold">{job.title}</h2>
      <p className="text-sm text-gray-600">{job.company}</p>
      <p className="text-sm">{job.location}</p>
      <p className="mt-2 text-sm">{job.description.slice(0, 100)}...</p>
    </div>
  );
}
