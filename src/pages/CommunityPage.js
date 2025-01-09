import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComments, faClock, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { 
  loadInitialThreads, 
  loadRemainingThreads, 
  loadSingleThread, 
  formatDate,
  getTotalThreadCount
} from '../utils/forumUtils';
import UserAvatar from '../components/UserAvatar'; 

const CommunityPage = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalThreads, setTotalThreads] = useState(0);
  const [pageData, setPageData] = useState({});
  const threadsPerPage = 10;
  const preloadPages = 5;


   // Separate useEffect for getting total count immediately
  useEffect(() => {
    const getCount = async () => {
      const count = await getTotalThreadCount();
      setTotalThreads(count);
    };
    getCount();
  }, []);
  
  // Modified initial load effect
  useEffect(() => {
    const initializeThreads = async () => {
      setLoading(true);
      try {
        // Load first 50 threads immediately
        const initialThreads = await loadInitialThreads(preloadPages);
        
        // Organize threads into pages
        const pages = {};
        initialThreads.forEach((thread, index) => {
          const pageNumber = Math.floor(index / threadsPerPage) + 1;
          if (!pages[pageNumber]) pages[pageNumber] = [];
          pages[pageNumber].push(thread);
        });

        setPageData(pages);
        setThreads(pages[1] || []); // Set first page
        
        // Start loading remaining threads in background
        loadRemainingThreadsInBackground(initialThreads.length);
      } catch (error) {
        console.error('Error in initial load:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeThreads();
  }, []);

const startThread = (currentPage - 1) * threadsPerPage + 1;
const endThread = Math.min(startThread + threadsPerPage - 1, totalThreads);
  
// Background loading of remaining threads
  const loadRemainingThreadsInBackground = async (startFromId) => {
    try {
      const remainingThreads = await loadRemainingThreads(startFromId + 1);
      if (remainingThreads.length > 0) {
        // Update total count
        setTotalThreads(prev => prev + remainingThreads.length);
        
        // Organize new threads into pages
        const newPages = { ...pageData };
        remainingThreads.forEach((thread, index) => {
          const pageNumber = Math.floor((index + startFromId) / threadsPerPage) + 1;
          if (!newPages[pageNumber]) newPages[pageNumber] = [];
          newPages[pageNumber].push(thread);
        });

        setPageData(newPages);
      }
    } catch (error) {
      console.error('Error loading remaining threads:', error);
    }
  };

  // Handle page changes
  const changePage = (newPage) => {
    setCurrentPage(newPage);
    setThreads(pageData[newPage] || []);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">OxMaint Community</h1>
          <p className="text-lg text-blue-100">
            Join the conversation with maintenance professionals and industry experts
          </p>
        </div>
      </div>

        {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold">Recent Discussions</h2>
            <p className="text-gray-600 mt-1">
              {totalThreads > 0 
                ? `Showing ${((currentPage - 1) * threadsPerPage) + 1}-${Math.min(currentPage * threadsPerPage, totalThreads)} of ${totalThreads} threads`
                : 'Loading threads...'}
            </p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Start New Discussion
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading discussions...</p>
          </div>
        ) : threads.length > 0 ? (
          <>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {threads.map((thread) => (
  <div 
    key={thread.id}
    className="border-b border-gray-200 p-6 hover:bg-gray-50 transition-colors"
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">
          <Link to={`/community/thread/${thread.id}`} className="hover:text-blue-700">
            {thread.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{thread.content}</p>
        
        <div className="flex items-center text-sm text-gray-500 space-x-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faEye} className="mr-2" />
            {thread.views} views
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faComments} className="mr-2" />
            {thread.replies?.length || 0} replies
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            {formatDate(thread.last_activity)}
          </div>
        </div>
      </div>

      <div className="ml-6 flex items-center">
        <UserAvatar 
          name={thread.author.name} 
          size="md"
          className="flex-shrink-0"
        />
        <div className="ml-3">
          <p className="text-sm font-medium">{thread.author.name}</p>
          <p className="text-xs text-gray-500">{thread.author.role}</p>
        </div>
      </div>
    </div>

    <div className="mt-4 flex flex-wrap gap-2">
      {thread.tags.map((tag) => (
        <span 
          key={tag}
          className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
))}
            </div>


{/* Pagination */}
{totalThreads > 0 && (
  <div className="flex items-center justify-center space-x-2 mt-8">
    {/* Previous button */}
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

    {/* Page numbers */}
    {currentPage > 3 && (
      <>
        <button
          onClick={() => changePage(1)}
          className="px-3 py-1 rounded hover:bg-gray-100"
        >
          1
        </button>
        {currentPage > 4 && <span className="px-2">...</span>}
      </>
    )}

    {Array.from({ length: Math.ceil(totalThreads / threadsPerPage) }, (_, i) => {
      const pageNumber = i + 1;
      // Show current page and 2 pages before and after
      if (
        pageNumber === 1 ||
        pageNumber === Math.ceil(totalThreads / threadsPerPage) ||
        (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
      ) {
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
      } else if (
        pageNumber === currentPage - 3 ||
        pageNumber === currentPage + 3
      ) {
        return <span key={pageNumber} className="px-2">...</span>;
      }
      return null;
    })}

    {/* Next button */}
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

    {/* Go to page input */}
    <div className="flex items-center ml-4">
      <span className="text-sm text-gray-600 mr-2">Go to page</span>
      <input
        type="number"
        min="1"
        max={Math.ceil(totalThreads / threadsPerPage)}
        className="w-16 px-2 py-1 border rounded text-sm"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const page = parseInt(e.target.value);
            if (page >= 1 && page <= Math.ceil(totalThreads / threadsPerPage)) {
              changePage(page);
              e.target.value = '';
            }
          }
        }}
      />
      <button 
        className="ml-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
      >
        Go
      </button>
    </div>
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
