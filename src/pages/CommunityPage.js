import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComments, faClock } from '@fortawesome/free-solid-svg-icons';

// Import thread data directly
import thread1 from '../data/forum/thread-001.json';
import thread2 from '../data/forum/thread-002.json';
import thread3 from '../data/forum/thread-003.json';
import thread4 from '../data/forum/thread-004.json';

const CommunityPage = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Combine all threads
    const allThreads = [thread1, thread2, thread3, thread4];
    
    // Sort threads by last activity
    const sortedThreads = allThreads.sort((a, b) => 
      new Date(b.last_activity) - new Date(a.last_activity)
    );
    
    setThreads(sortedThreads);
    setLoading(false);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
        {/* Filters and Search - To be implemented */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Recent Discussions</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Start New Discussion
          </button>
        </div>

        {/* Thread List */}
        {loading ? (
          <div className="text-center py-8">Loading discussions...</div>
        ) : (
          <div className="bg-white rounded-lg shadow">
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
                    
                    {/* Thread Meta Info */}
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

                  {/* Author Info */}
                  <div className="ml-6 flex items-center">
                    <img 
                      src={thread.author.avatar} 
                      alt={thread.author.name}
                      className="w-10 h-10 rounded-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/40';
                      }}
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium">{thread.author.name}</p>
                      <p className="text-xs text-gray-500">{thread.author.role}</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
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
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
