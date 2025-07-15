'use client';

import { FaCog, FaClock, FaRedo, FaEnvelope } from "react-icons/fa";

export default function Settings() {
  const settings = [
    { name: 'Bot Interval', value: '10 min', description: 'How often the bot scrapes new manga.' },
    { name: 'Max Retries', value: '3', description: 'Number of times to retry a failed scrape.' },
    { name: 'Notification Email', value: 'admin@example.com', description: 'Email for system notifications.' },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaClock className="w-6 h-6 text-blue-500 mr-3" />
          <div>
            <div className="text-gray-500 text-sm">Bot Interval</div>
            <div className="text-xl font-bold">10 min</div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaRedo className="w-6 h-6 text-green-500 mr-3" />
          <div>
            <div className="text-gray-500 text-sm">Max Retries</div>
            <div className="text-xl font-bold">3</div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaEnvelope className="w-6 h-6 text-yellow-500 mr-3" />
          <div>
            <div className="text-gray-500 text-sm">Notification Email</div>
            <div className="text-xl font-bold">admin@example.com</div>
          </div>
        </div>
      </div>
      <p className="mb-4 text-gray-600 dark:text-gray-300">Configure your manga bot and system preferences.</p>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400">
              <th className="py-2">Setting</th>
              <th className="py-2">Value</th>
              <th className="py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {settings.map((s, idx) => (
              <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                <td className="py-2">{s.name}</td>
                <td className="py-2">{s.value}</td>
                <td className="py-2">{s.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold">Save Settings</button>
    </div>
  );
} 