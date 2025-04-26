import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Briefcase, Settings } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: <Home size={18} />, path: '/dashboard' },
  { name: 'My Applications', icon: <Briefcase size={18} />, path: '/dashboard/applications' },
  { name: 'Profile', icon: <User size={18} />, path: '/dashboard/profile' },
  { name: 'Settings', icon: <Settings size={18} />, path: '/dashboard/settings' }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 min-h-screen bg-gray-100 border-r p-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">User Panel</h2>
      <ul className="space-y-3">
        {navItems.map(item => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-200 transition ${
                location.pathname === item.path ? 'bg-blue-100 text-blue-600' : ''
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
