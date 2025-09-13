'use client';

import { withAuth } from "@/components/withAuth";
import { FaUser, FaBook, FaRobot, FaServer, FaCheckCircle, FaTimesCircle, FaGlobe, FaExclamationTriangle } from "react-icons/fa";

const summaryCards = [
    { icon: <FaUser className="text-blue-500 w-6 h-6" />, subtitle: "Users", value: 1200 },
    { icon: <FaBook className="text-green-500 w-6 h-6" />, subtitle: "Manga", value: 340 },
    { icon: <FaRobot className="text-purple-500 w-6 h-6" />, subtitle: "Active Bots", value: 5 },
    { icon: <FaServer className="text-yellow-500 w-6 h-6" />, subtitle: "Servers", value: 3 },
];

const scrapStatus = [
    { name: "Bot A", status: "Active", lastTime: "2024-06-01 12:00" },
    { name: "Bot B", status: "Idle", lastTime: "2024-06-01 11:45" },
    { name: "Bot C", status: "Error", lastTime: "2024-06-01 11:30" },
];

const proxyStatus = [
    { ip: "192.168.1.1", status: "Online", response: "120ms" },
    { ip: "192.168.1.2", status: "Offline", response: "-" },
    { ip: "192.168.1.3", status: "Online", response: "98ms" },
];

const lastContent = [
    { title: 'One Piece', chapter: 1000, time: '2024-06-01 12:00' },
    { title: 'Naruto', chapter: 1000, time: '2024-06-01 12:00' },
    { title: 'Bleach', chapter: 1000, time: '2024-06-01 12:00' },
    { title: 'One Punch Man', chapter: 1000, time: '2024-06-01 12:00' },
    { title: 'Attack on Titan', chapter: 1000, time: '2024-06-01 12:00' },
    { title: 'My Hero Academia', chapter: 1000, time: '2024-06-01 12:00' },
    { title: 'Dragon Ball', chapter: 1000, time: '2024-06-01 12:00' },
]

const errorAndWarning = [
    { text: 'Proxy Error', time: '2024-06-01 12:00', type: 'error' },
    { text: 'Proxy Warning', time: '2024-06-01 12:00', type: 'warning' },
    { text: 'Proxy Error', time: '2024-06-01 12:00', type: 'error' },
]

function Dashboard() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {summaryCards.map((card, idx) => (
                    <div key={idx} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
                        <div className="mr-4">{card.icon}</div>
                        <div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm">{card.subtitle}</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Status Cards Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Scrap Status Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center mb-4">
                        <FaRobot className="text-purple-500 w-5 h-5 mr-2" />
                        <span className="font-semibold text-lg text-gray-900 dark:text-white">Scrap Status</span>
                    </div>
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="text-gray-500 dark:text-gray-400">
                                <th className="py-2">Scrap Bot Name</th>
                                <th className="py-2">Status</th>
                                <th className="py-2">Last Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scrapStatus.map((row, idx) => (
                                <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                                    <td className="py-2">{row.name}</td>
                                    <td className="py-2">
                                        {row.status === "Active" && <span className="flex items-center text-green-600"><FaCheckCircle className="mr-1" />Active</span>}
                                        {row.status === "Idle" && <span className="flex items-center text-yellow-500"><FaTimesCircle className="mr-1" />Idle</span>}
                                        {row.status === "Error" && <span className="flex items-center text-red-600"><FaTimesCircle className="mr-1" />Error</span>}
                                    </td>
                                    <td className="py-2">{row.lastTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Proxy Status Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center mb-4">
                        <FaGlobe className="text-blue-500 w-5 h-5 mr-2" />
                        <span className="font-semibold text-lg text-gray-900 dark:text-white">Proxy Status</span>
                    </div>
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="text-gray-500 dark:text-gray-400">
                                <th className="py-2">IP</th>
                                <th className="py-2">Status</th>
                                <th className="py-2">Response Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proxyStatus.map((row, idx) => (
                                <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                                    <td className="py-2">{row.ip}</td>
                                    <td className="py-2">
                                        {row.status === "Online" && <span className="flex items-center text-green-600"><FaCheckCircle className="mr-1" />Online</span>}
                                        {row.status === "Offline" && <span className="flex items-center text-red-600"><FaTimesCircle className="mr-1" />Offline</span>}
                                    </td>
                                    <td className="py-2">{row.response}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Last Content Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center mb-4">
                        <FaBook className="text-blue-500 w-5 h-5 mr-2" />
                        <span className="font-semibold text-lg text-gray-900 dark:text-white">Last Content</span>
                    </div>
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="text-gray-500 dark:text-gray-400">
                                <th className="py-2">Title</th>
                                <th className="py-2">Chapter</th>
                                <th className="py-2">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lastContent.map((row, idx) => (
                                <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                                    <td className="py-2">{row.title}</td>
                                    <td className="py-2">{row.chapter}</td>
                                    <td className="py-2">{row.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Error and Warning Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center mb-4">
                        <FaExclamationTriangle className="text-red-500 w-5 h-5 mr-2" />
                        <span className="font-semibold text-lg text-gray-900 dark:text-white">Error and Warning</span>
                    </div>

                    {/* Scrollable Alert Container */}
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {errorAndWarning.map((item, idx) => {
                            const isError = item.type === 'error';
                            const bgColor = isError ? 'bg-red-100 dark:bg-red-900' : 'bg-yellow-100 dark:bg-yellow-900';
                            const textColor = isError ? 'text-red-800 dark:text-red-300' : 'text-yellow-800 dark:text-yellow-300';
                            const iconColor = isError ? 'text-red-500' : 'text-yellow-500';

                            return (
                                <div
                                    key={idx}
                                    className={`flex items-center p-3 rounded-md shadow-sm ${bgColor} ${textColor}`}
                                >
                                    <FaExclamationTriangle className={`w-5 h-5 mr-2 mt-1 ${iconColor}`} />
                                    <div>
                                        <div className="font-semibold">{item.text}</div>
                                        <div className="text-xs">{item.time}</div>
                                        <div className="text-xs italic">{item.type}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(Dashboard);