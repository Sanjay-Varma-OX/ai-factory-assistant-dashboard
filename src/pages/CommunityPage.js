import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComments, faClock, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { 
  loadInitialThreads, 
  loadRemainingThreads, 
  loadSingleThread, 
  formatDate 
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

  // Initial load of first 50 threads
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
        setTotalThreads(initialThreads.length);
        
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
      <div className="mt-8 flex justify-center items-center space-x-2">
        <button
          onClick={() => changePage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        
        {Array.from({ length: Math.ceil(totalThreads / threadsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => changePage(i + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 hover:bg-blue-50'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => changePage(Math.min(currentPage + 1, Math.ceil(totalThreads / threadsPerPage)))}
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
