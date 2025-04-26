import React from 'react';

export default function FilterBar({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex gap-4 flex-wrap mb-4">
      <input type="text" name="search" placeholder="Search by title" onChange={handleChange} className="border p-2 w-1/3" />
      <input type="text" name="location" placeholder="Location" onChange={handleChange} className="border p-2 w-1/3" />
      <select name="category" onChange={handleChange} className="border p-2 w-1/3">
        <option value="">All Categories</option>
        <option value="Engineering">Engineering</option>
        <option value="Marketing">Marketing</option>
        <option value="Design">Design</option>
      </select>
    </div>
  );
}
