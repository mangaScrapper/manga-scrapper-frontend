'use client';

import { useState, useEffect } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight, FaSpinner, FaBook, FaImage, FaTag } from "react-icons/fa";
import { withAuth } from "@/components/withAuth";
import { apiClient } from "@/services/api";
import Image from 'next/image'

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allResults, setAllResults] = useState([]); // Tüm API sonuçlarını saklamak için
  const [paginatedResults, setPaginatedResults] = useState([]); // Sayfalanmış sonuçlar
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const pageSize = 10; // Sayfa başına 10 sonuç

  // İstemci tarafında sayfalama fonksiyonu
  const paginateResults = (results, page = 1) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    // Her API'nin sonuçlarını ayrı ayrı sayfala
    const paginated = results.map(apiResult => ({
      ...apiResult,
      results: apiResult.results.slice(startIndex, endIndex)
    }));
    
    setPaginatedResults(paginated);
  };

  const performSearch = async (query, page = 1) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiClient.get('/api/manga-validation/search', { 
        params: { 
          q: query,
          page: page.toString(), 
          limit: pageSize.toString() 
        } 
      });
      
      console.log('search result', result);
      if (result.success) {
        setSearchData(result.data);
        setAllResults(result.data.data.apiResults || []); // Tüm sonuçları sakla
        
        // Toplam sonuç sayısını ve sayfa sayısını hesapla
        const totalResults = result.data.data.totalResults || 0;
        setTotal(totalResults);
        setTotalPages(Math.ceil(totalResults / pageSize));
        setCurrentPage(page);
        
        // İstemci tarafında sayfalama yap
        paginateResults(result.data.data.apiResults || [], page);
      } else {
        setError(result.error || 'Search failed');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error searching:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      performSearch(searchTerm, 1);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && searchTerm.trim()) {
      setCurrentPage(page);
      paginateResults(allResults, page); // Mevcut sonuçları yeniden sayfala
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

  const renderMangaCard = (manga, apiName) => (
    <div key={`${manga.id}-${apiName}`} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex space-x-4">
        {manga.coverUrl && (
          <div className="flex-shrink-0">
            <Image
              src={manga.coverUrl}
              alt={manga.title}
              className="w-20 h-28 object-cover rounded"
              width={80}
              height={28}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {manga.title}
            </h3>
            <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded-full">
              {apiName}
            </span>
          </div>
          
          {manga.alternativeTitles && manga.alternativeTitles.length > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Also known as: {manga.alternativeTitles.join(', ')}
            </p>
          )}
          
          {manga.description && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-3">
              {manga.description.length > 200 
                ? `${manga.description.substring(0, 200)}...` 
                : manga.description
              }
            </p>
          )}
          
          {manga.genres && manga.genres.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {manga.genres.slice(0, 5).map((genre, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full"
                >
                  <FaTag className="w-3 h-3 mr-1" />
                  {genre}
                </span>
              ))}
              {manga.genres.length > 5 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{manga.genres.length - 5} more
                </span>
              )}
            </div>
          )}
          
          {manga.status && (
            <div className="mt-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                manga.status === 'RELEASING' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : manga.status === 'FINISHED'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {manga.status}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Manga Search</h1>
      
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Search for manga across multiple external APIs.
      </p>

      {/* Search Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <form onSubmit={handleSearch} className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for manga (e.g., One Piece, Naruto...)"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !searchTerm.trim()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <FaSpinner className="animate-spin w-5 h-5 mr-2" />
            ) : (
              <FaSearch className="w-5 h-5 mr-2" />
            )}
            Search
          </button>
        </form>
      </div>

      {/* Search Stats */}
      {searchData && (
        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                Search Results for "{searchData.searchTerm}"
              </h3>
              <p className="text-blue-700 dark:text-blue-300">
                Found {searchData.totalResults} results from {searchData.totalApis} APIs
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Max Results: {searchData.maxResultsRequested}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
          Error: {error}
        </div>
      )}

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <FaSpinner className="animate-spin w-8 h-8 text-blue-500 mr-3" />
          <span className="text-gray-500 dark:text-gray-400">Searching...</span>
        </div>
      ) : paginatedResults.length > 0 ? (
        <div className="space-y-6">
          {paginatedResults.map((apiResult) => (
            <div key={apiResult.apiId} className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                    <FaBook className="w-5 h-5 mr-2 text-blue-500" />
                    {apiResult.apiName}
                  </h2>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm rounded-full">
                    {apiResult.results.length} results
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid gap-4">
                  {apiResult.results.map((manga) => renderMangaCard(manga, apiResult.apiName))}
                </div>
              </div>
            </div>
          ))}
          
          {renderPagination()}
        </div>
      ) : searchTerm && !loading ? (
        <div className="text-center py-12">
          <FaBook className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No results found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try searching with different keywords or check your spelling.
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <FaSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Start searching</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Enter a manga title to search across multiple APIs.
          </p>
        </div>
      )}
    </div>
  );
}

export default withAuth(Search);