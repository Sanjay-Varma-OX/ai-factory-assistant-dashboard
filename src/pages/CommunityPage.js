import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComments, faClock } from '@fortawesome/free-solid-svg-icons';

const CommunityPage = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadThreads = async () => {
      try {
        const threadIds = ['001', '002', '003', '004'];
        const loadedThreads = await Promise.all(
          threadIds.map(async (id) => {
            try {
              // Using window.fs.readFile API instead of fetch
              const response = await window.fs.readFile(`/src/data/forum/thread-${id}.json`, { encoding: 'utf8' });
              return JSON.parse(response);
            } catch (error) {
              console.error(`Error loading thread-${id}.json:`, error);
              return null;
            }
          })
        );

        const validThreads = loadedThreads.filter(Boolean);
        const sortedThreads = validThreads.sort((a, b) => 
          new Date(b.last_activity) - new Date(a.last_activity)
        );
        
        setThreads(sortedThreads);
      } catch (error) {
        console.error('Error loading threads:', error);
      } finally {
        setLoading(false);
      }
    };

    loadThreads();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading discussions...</div>
      </div>
    );
  }

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
          <h2 className="text-2xl font-semibold">Recent Discussions</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Start New Discussion
          </button>
        </div>

        {threads.length > 0 ? (
          <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
            {threads.map((thread) => (
              <div 
                key={thread.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">
                      <Link 
                        to={`/community/thread/${thread.id}`} 
                        className="hover:text-blue-700 transition-colors"
                      >
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
