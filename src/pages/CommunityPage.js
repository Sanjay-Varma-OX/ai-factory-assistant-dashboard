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
        // Hard-coded thread data for testing
        const threadsData = [
          {
            id: "001",
            title: "Best Practices for Implementing Predictive Maintenance in Manufacturing",
            content: "I'm looking to implement a predictive maintenance program in our manufacturing facility...",
            author: {
              name: "John Anderson",
              role: "Maintenance Manager",
              avatar: "/avatars/john.jpg"
            },
            created_at: "2024-01-15T08:30:00Z",
            last_activity: "2024-01-15T14:45:00Z",
            views: 234,
            replies: [
              // ... replies data
            ],
            tags: ["predictive-maintenance", "manufacturing", "best-practices"]
          },
          // Add more thread data here...
        ];

        setThreads(threadsData);
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
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Start New Discussion
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading discussions...</div>
        ) : threads.length > 0 ? (
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
