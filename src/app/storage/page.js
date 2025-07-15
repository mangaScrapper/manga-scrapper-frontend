'use client';

import { FaHdd, FaCloud, FaExclamationTriangle } from "react-icons/fa";

export default function Storage() {
  const storages = [
    { name: 'Local Disk', type: 'SSD', usage: 120, total: 500, status: 'Healthy' },
    { name: 'AWS S3', type: 'Cloud', usage: 2000, total: 5000, status: 'Healthy' },
    { name: 'Backup Drive', type: 'HDD', usage: 800, total: 1000, status: 'Warning' },
  ];
  const total = storages.reduce((sum, s) => sum + s.total, 0);
  const used = storages.reduce((sum, s) => sum + s.usage, 0);
  const free = total - used;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Storage</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaHdd className="w-6 h-6 text-blue-500 mr-3" />
          <div>
            <div className="text-gray-500 text-sm">Total Storage</div>
            <div className="text-xl font-bold">{total} GB</div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaHdd className="w-6 h-6 text-green-500 mr-3" />
          <div>
            <div className="text-gray-500 text-sm">Used</div>
            <div className="text-xl font-bold">{used} GB</div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaHdd className="w-6 h-6 text-yellow-500 mr-3" />
          <div>
            <div className="text-gray-500 text-sm">Free</div>
            <div className="text-xl font-bold">{free} GB</div>
          </div>
        </div>
      </div>
      <p className="mb-4 text-gray-600 dark:text-gray-300">Monitor and manage all storage locations for your manga content.</p>
      <div className="mb-6 space-y-4">
        {storages.map((stg, idx) => {
          const percent = Math.round((stg.usage / stg.total) * 100);
          return (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center mb-2">
                {stg.type === 'Cloud' ? <FaCloud className="w-5 h-5 text-blue-400 mr-2" /> : <FaHdd className="w-5 h-5 text-gray-500 mr-2" />}
                <span className="font-semibold text-gray-900 dark:text-white">{stg.name}</span>
                {stg.status === 'Warning' && (
                  <span className="flex items-center ml-3 text-yellow-600"><FaExclamationTriangle className="mr-1" />Warning</span>
                )}
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
                <div
                  className={`h-3 rounded-full ${percent > 80 ? 'bg-red-500' : percent > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{stg.usage} GB used of {stg.total} GB</div>
            </div>
          );
        })}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400">
              <th className="py-2">Name</th>
              <th className="py-2">Type</th>
              <th className="py-2">Usage</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {storages.map((stg, idx) => (
              <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                <td className="py-2">{stg.name}</td>
                <td className="py-2">{stg.type}</td>
                <td className="py-2">{stg.usage} GB</td>
                <td className="py-2">{stg.total} GB</td>
                <td className="py-2">{stg.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 