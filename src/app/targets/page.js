'use client';

import { FaBullseye, FaCloud, FaMobileAlt, FaExclamationTriangle } from "react-icons/fa";

export default function Targets() {
  const targets = [
    { name: 'MyMangaReader', type: 'Website', status: 'Active', lastSync: '2024-06-01' },
    { name: 'MangaApp', type: 'Mobile App', status: 'Active', lastSync: '2024-05-29' },
    { name: 'MangaCloud', type: 'Cloud', status: 'Inactive', lastSync: '2024-05-15' },
  ];
  const websiteCount = targets.filter(t => t.type === 'Website').length;
  const mobileCount = targets.filter(t => t.type === 'Mobile App').length;
  const cloudCount = targets.filter(t => t.type === 'Cloud').length;
  const failedSyncs = targets.filter(t => t.status !== 'Active');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Targets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaBullseye className="w-6 h-6 text-blue-500 mr-3" />
          <div>
            <div className="text-gray-500 text-sm">Websites</div>
            <div className="text-xl font-bold">{websiteCount}</div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaMobileAlt className="w-6 h-6 text-green-500 mr-3" />
          <div>
            <div className="text-gray-500 text-sm">Mobile Apps</div>
            <div className="text-xl font-bold">{mobileCount}</div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaCloud className="w-6 h-6 text-purple-500 mr-3" />
          <div>
            <div className="text-gray-500 text-sm">Cloud</div>
            <div className="text-xl font-bold">{cloudCount}</div>
          </div>
        </div>
      </div>
      {failedSyncs.length > 0 && (
        <div className="flex items-center p-3 mb-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
          <FaExclamationTriangle className="w-5 h-5 mr-2" />
          <span>Some targets have failed their last sync. Please check their status.</span>
        </div>
      )}
      <p className="mb-4 text-gray-600 dark:text-gray-300">Define and monitor where your scraped manga content is delivered.</p>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400">
              <th className="py-2">Name</th>
              <th className="py-2">Type</th>
              <th className="py-2">Status</th>
              <th className="py-2">Last Sync</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {targets.map((tgt, idx) => (
              <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                <td className="py-2">{tgt.name}</td>
                <td className="py-2">{tgt.type}</td>
                <td className="py-2">{tgt.status}</td>
                <td className="py-2">{tgt.lastSync}</td>
                <td className="py-2">
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs">Sync Now</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 