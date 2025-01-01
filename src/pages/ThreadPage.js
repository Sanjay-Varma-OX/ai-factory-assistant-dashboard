import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const ThreadPage = () => {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadThread = async () => {
      try {
        const response = await fetch(`/src/data/forum/thread-${threadId}.json`);
        const data = await response.json();
        setThread(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading thread:', error);
        setLoading(false);
      }
    };

    loadThread();
  }, [threadId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading thread...</div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Thread not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <Link to="/community" className="inline-flex items-center text-blue-200 hover:text-white mb-4">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Community
          </Link>
          <h1 className="text-3xl font-bold mb-4">{thread.title}</h1>
          
          {/* Thread Meta Info */}
          <div className="flex flex-wrap items-center text-sm text-blue-200 space-x-6">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              {thread.author.name} ({thread.author.role})
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              {formatDate(thread.created_at)}
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              {thread.views} views
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Original Post */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start">
              <img 
                src={thread.author.avatar}
                alt={thread.author.name}
                className="w-12 h-12 rounded-full mr-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/48';
                }}
              />
              <div className="flex-1">
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{thread.content}</p>
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
            </div>
          </div>

          {/* Replies */}
          <div className="divide-y divide-gray-200">
            {thread.replies.map((reply) => (
              <div key={reply.id} className="p-6">
                <div className="flex items-start">
                  <img 
                    src={reply.author.avatar}
                    alt={reply.author.name}
                    className="w-12 h-12 rounded-full mr-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/48';
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-medium">{reply.author.name}</span>
                        <span className="text-gray-500 text-sm ml-2">{reply.author.role}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(reply.created_at)}
                      </span>
                    </div>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-wrap">{reply.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reply Form */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Leave a Reply</h3>
          <form className="space-y-4">
            <textarea 
              className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share your thoughts..."
            />
            <button 
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post Reply
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ThreadPage;
