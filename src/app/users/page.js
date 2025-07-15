'use client';

import { FaUser, FaCheckCircle, FaTimesCircle, FaUserClock } from "react-icons/fa";

export default function Users() {
  const users = [
    { username: 'admin', role: 'Administrator', status: 'Active', lastLogin: '2024-06-01' },
    { username: 'mangabot', role: 'Bot', status: 'Active', lastLogin: '2024-06-01' },
    { username: 'guest', role: 'Viewer', status: 'Inactive', lastLogin: '2024-05-20' },
    { username: 'editor', role: 'Editor', status: 'Active', lastLogin: '2024-05-31' },
    { username: 'testuser', role: 'Viewer', status: 'Inactive', lastLogin: '2024-05-15' },
  ];
  const total = users.length;
  const active = users.filter(u => u.status === 'Active').length;
  const inactive = users.filter(u => u.status !== 'Active').length;
  const recentLogins = users.slice(0, 3);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaUser className="w-6 h-6 text-blue-500 mr-3" />
          <div>
            <div className="text-gray-500 text-sm">Total Users</div>
            <div className="text-xl font-bold">{total}</div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaCheckCircle className="w-6 h-6 text-green-500 mr-3" />
          <div>
            <div className="text-gray-500 text-sm">Active</div>
            <div className="text-xl font-bold">{active}</div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaTimesCircle className="w-6 h-6 text-red-500 mr-3" />
          <div>
            <div className="text-gray-500 text-sm">Inactive</div>
            <div className="text-xl font-bold">{inactive}</div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Recent Logins</h2>
        <ul className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 divide-y divide-gray-200 dark:divide-gray-700">
          {recentLogins.map((u, idx) => (
            <li key={idx} className="flex items-center py-2">
              <FaUserClock className="w-5 h-5 text-blue-400 mr-2" />
              <span className="font-semibold text-gray-900 dark:text-white mr-2">{u.username}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{u.lastLogin}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mb-4 text-gray-600 dark:text-gray-300">Manage users and their permissions for the manga bot platform.</p>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400">
              <th className="py-2">Username</th>
              <th className="py-2">Role</th>
              <th className="py-2">Status</th>
              <th className="py-2">Last Login</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                <td className="py-2">{u.username}</td>
                <td className="py-2">{u.role}</td>
                <td className="py-2">{u.status}</td>
                <td className="py-2">{u.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 