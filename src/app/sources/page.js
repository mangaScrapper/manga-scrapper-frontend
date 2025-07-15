'use client';

import { FaDatabase, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Sources() {
  const sources = [
    { name: 'MangaDex', type: 'Aggregator', status: 'Active', lastUpdated: '2024-06-01' },
    { name: 'MangaHere', type: 'Direct', status: 'Active', lastUpdated: '2024-05-30' },
    { name: 'MangaFox', type: 'Aggregator', status: 'Inactive', lastUpdated: '2024-05-20' },
  ];
  const total = sources.length;
  const active = sources.filter(s => s.status === 'Active').length;
  const inactive = sources.filter(s => s.status !== 'Active').length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sources</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaDatabase className="w-6 h-6 text-blue-500 mr-3" />
          <div>
            <div className="text-gray-500 text-sm">Total Sources</div>
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
      <p className="mb-4 text-gray-600 dark:text-gray-300">Manage and monitor all manga sources your bot scrapes from.</p>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400">
              <th className="py-2">Name</th>
              <th className="py-2">Type</th>
              <th className="py-2">Status</th>
              <th className="py-2">Last Updated</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((src, idx) => (
              <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                <td className="py-2">{src.name}</td>
                <td className="py-2">{src.type}</td>
                <td className="py-2">
                  {src.status === 'Active' ? (
                    <span className="flex items-center text-green-600"><FaCheckCircle className="mr-1" />Active</span>
                  ) : (
                    <span className="flex items-center text-red-600"><FaTimesCircle className="mr-1" />Inactive</span>
                  )}
                </td>
                <td className="py-2">{src.lastUpdated}</td>
                <td className="py-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">Test</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 