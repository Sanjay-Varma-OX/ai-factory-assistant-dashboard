import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComments, faClock, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { loadInitialThreads, loadPageThreads, preloadNextPages, formatDate, getQuickCount, loadSingleThread } from '../utils/forumUtils';
import UserAvatar from '../components/UserAvatar';

const CommunityPage = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalThreads, setTotalThreads] = useState(0);
  const [pageCache, setPageCache] = useState({});
  const threadsPerPage = 10;

  // Load initial data and setup background loading
  useEffect(() => {
    const initialize = async () => {
      try {
        // Get quick count first
        const count = await getQuickCount();
        setTotalThreads(count);

        // Load first page immediately
        const firstPageThreads = await loadInitialThreads(1);
        setThreads(firstPageThreads);
        setPageCache(prev => ({ ...prev, 1: firstPageThreads }));
        setLoading(false);

        // Preload next pages in background
        const preloadedPages = await preloadNextPages(1);
        const updatedCache = { ...pageCache };
        preloadedPages.forEach((pageThreads, index) => {
          updatedCache[index + 2] = pageThreads;
        });
        setPageCache(updatedCache);
      } catch (error) {
        console.error('Error in initialization:', error);
        setLoading(false);
      }
    };

    initialize();
  }, []);

  // Handle page changes
  const changePage = async (newPage) => {
    if (newPage === currentPage) return;
    
    setCurrentPage(newPage);
    window.scrollTo(0, 0);

    // Use cached data if available
    if (pageCache[newPage]) {
      setThreads(pageCache[newPage]);
    } else {
      setLoading(true);
      const pageThreads = await loadPageThreads(newPage);
      setThreads(pageThreads);
      setPageCache(prev => ({ ...prev, [newPage]: pageThreads }));
      setLoading(false);
    }

    // Preload next pages in background
    preloadNextPages(newPage).then(preloadedPages => {
      const updatedCache = { ...pageCache };
      preloadedPages.forEach((pageThreads, index) => {
        updatedCache[newPage + index + 1] = pageThreads;
      });
      setPageCache(updatedCache);
    });
  };

  // Rest of your existing JSX remains the same, just update the pagination logic
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Keep your existing header section */}
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Keep your existing content header */}

        {loading && threads.length === 0 ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading discussions...</p>
          </div>
        ) : threads.length > 0 ? (
          <>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Keep your existing thread mapping logic */}
            </div>

            {/* Simplified pagination */}
            {totalThreads > threadsPerPage && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                {Array.from({ length: Math.min(5, Math.ceil(totalThreads / threadsPerPage)) }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => changePage(pageNumber)}
                      className={`px-4 py-2 rounded ${
                        currentPage === pageNumber
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {Math.ceil(totalThreads / threadsPerPage) > 5 && (
                  <span className="px-2">...</span>
                )}

                <button
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === Math.ceil(totalThreads / threadsPerPage)}
                  className={`px-3 py-1 rounded ${
                    currentPage === Math.ceil(totalThreads / threadsPerPage)
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-gray-600">
            No discussions found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
