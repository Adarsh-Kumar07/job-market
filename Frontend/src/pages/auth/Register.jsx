import React, { useState } from 'react';
import API from '../../utils/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'jobseeker' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registered! Now login.');
    } catch (err) {
      alert('Error registering');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full border p-2" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full border p-2" />
        <select name="role" onChange={handleChange} className="w-full border p-2">
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
}
