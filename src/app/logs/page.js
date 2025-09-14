'use client';

import { useState, useEffect } from 'react';
import { FaInfoCircle, FaExclamationTriangle, FaTimesCircle, FaFilter, FaChevronLeft, FaChevronRight, FaSpinner } from "react-icons/fa";
import { withAuth } from "@/components/withAuth";
import { apiClient } from "@/services/api";
import moment from 'moment';

function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const pageSize = 20;

  const fetchLogs = async (page = 1, newFilters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiClient.get('/api/logs', { 
        params: { 
          page: page.toString(), 
          limit: pageSize.toString(),
          ...newFilters
        } 
      });
      console.log('result', result);
      if (result.success) {
        setLogs(result.data.data.logs || []);
        setTotal(result.data.data.total || 0);
        setTotalPages(Math.ceil((result.data.data.total || 0) / pageSize));
        setCurrentPage(page);
      } else {
        setError(result.error || 'API request failed');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(1, filters);
  }, [filters]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchLogs(page, filters);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchLogs(1, newFilters);
  };

  const logLevelBadge = (level) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    switch (level) {
      case 'INFO':
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300`}>
            <FaInfoCircle className="w-3 h-3 mr-1" />
            Info
          </span>
        );
      case 'WARN':
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`}>
            <FaExclamationTriangle className="w-3 h-3 mr-1" />
            Warn
          </span>
        );
      case 'ERROR':
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`}>
            <FaTimesCircle className="w-3 h-3 mr-1" />
            Error
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300`}>
            {level}
          </span>
        );
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, total)} of {total} results
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
          
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                page === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Logs</h1>
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Logs</h1>
      
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        View logs generated by the manga bot and its components.
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {/* Filters */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center">
              <FaFilter className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
            </div>
            
            <select
              value={filters.level || ''}
              onChange={(e) => handleFilterChange({ ...filters, level: e.target.value || null })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Levels</option>
              <option value="INFO">Info</option>
              <option value="WARN">Warning</option>
              <option value="ERROR">Error</option>
            </select>

            <select
              value={filters.category || ''}
              onChange={(e) => handleFilterChange({ ...filters, category: e.target.value || null })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="SCRAPING">Scraping</option>
              <option value="AUTH">Auth</option>
              <option value="SERVER">Server</option>
            </select>

            {(filters.level || filters.category) && (
              <button
                onClick={() => handleFilterChange({})}
                className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 font-medium">Timestamp</th>
                <th className="px-6 py-3 font-medium">Level</th>
                <th className="px-6 py-3 font-medium">Message</th>
                <th className="px-6 py-3 font-medium">Source</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center">
                      <FaSpinner className="animate-spin w-6 h-6 text-blue-500 mr-2" />
                      <span className="text-gray-500 dark:text-gray-400">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No logs found
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => (
                  <tr key={index} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {moment(log.timestamp).format('DD/MM/YYYY HH:mm:ss')}
                    </td>
                    <td className="px-6 py-4">
                      {logLevelBadge(log.level)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white max-w-md">
                        {log.message}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        {log.source}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {renderPagination()}
      </div>
    </div>
  );
}

export default withAuth(Logs); 