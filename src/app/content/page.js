'use client';

import { FaBookOpen, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

export default function Content() {
  const contents = [
    { title: 'One Piece', chapters: 1080, source: 'MangaDex', status: 'Ongoing' },
    { title: 'Naruto', chapters: 700, source: 'MangaHere', status: 'Completed' },
    { title: 'Attack on Titan', chapters: 139, source: 'MangaFox', status: 'Completed' },
    { title: 'Jujutsu Kaisen', chapters: 230, source: 'MangaDex', status: 'Ongoing' },
    { title: 'Bleach', chapters: 686, source: 'MangaFox', status: 'Completed' },
  ];
  const total = contents.length;
  const ongoing = contents.filter(c => c.status === 'Ongoing').length;
  const completed = contents.filter(c => c.status === 'Completed').length;
  const popular = contents.slice(0, 3);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Content</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaBookOpen className="w-6 h-6 text-blue-500 mr-3" />
          <div>
            <div className="text-gray-500 text-sm">Total Manga</div>
            <div className="text-xl font-bold">{total}</div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaHourglassHalf className="w-6 h-6 text-yellow-500 mr-3" />
          <div>
            <div className="text-gray-500 text-sm">Ongoing</div>
            <div className="text-xl font-bold">{ongoing}</div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FaCheckCircle className="w-6 h-6 text-green-500 mr-3" />
          <div>
            <div className="text-gray-500 text-sm">Completed</div>
            <div className="text-xl font-bold">{completed}</div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Popular Manga</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {popular.map((manga, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 flex flex-col items-center">
              <div className="w-16 h-20 bg-gray-200 dark:bg-gray-700 rounded mb-2 flex items-center justify-center text-2xl font-bold text-gray-400">
                {manga.title[0]}
              </div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{manga.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{manga.chapters} chapters</div>
            </div>
          ))}
        </div>
      </div>
      <p className="mb-4 text-gray-600 dark:text-gray-300">View and manage all manga content scraped by your bot.</p>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400">
              <th className="py-2">Title</th>
              <th className="py-2">Chapters</th>
              <th className="py-2">Source</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {contents.map((c, idx) => (
              <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                <td className="py-2">{c.title}</td>
                <td className="py-2">{c.chapters}</td>
                <td className="py-2">{c.source}</td>
                <td className="py-2">{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 