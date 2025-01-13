import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { loadSingleThread } from '../utils/forumUtils';
import UserAvatar from '../components/UserAvatar';

const ThreadPage = () => {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchThread = async () => {
      setLoading(true);
      const threadData = await loadSingleThread(threadId);
      if (threadData) {
        setThread(threadData);
        setError(null);
      } else {
        setError('Failed to load thread');
        // Redirect after 3 seconds if thread not found
        setTimeout(() => navigate('/community'), 3000);
      }
      setLoading(false);
    };

    if (threadId) {
      fetchThread();
    }
  }, [threadId, navigate]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!replyContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Here you would add your API call to submit the reply
      console.log('Submitting reply:', replyContent);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear the form after successful submission
      setReplyContent('');
      
      // Optionally refresh thread data to show new reply
      // await fetchThread();
      
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading thread...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">{error}</div>
          <Link 
            to="/community" 
            className="text-blue-600 hover:text-blue-800 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Return to Community
          </Link>
        </div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Thread not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <Link 
            to="/community" 
            className="inline-flex items-center text-blue-200 hover:text-white transition-colors mb-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Community
          </Link>
          <h1 className="text-3xl font-bold mb-4">{thread.title}</h1>
          
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
              <UserAvatar 
                name={thread.author.name} 
                size="lg"
                className="flex-shrink-0 mr-4"
              />
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div>
                    <p className="font-medium text-lg">{thread.author.name}</p>
                    <p className="text-sm text-gray-500">{thread.author.role}</p>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{thread.content}</p>
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
            </div>
          </div>

          {/* Replies */}
          <div className="divide-y divide-gray-200">
            {thread.replies.map((reply) => (
              <div key={reply.id} className="p-6">
                <div className="flex items-start">
                  <UserAvatar 
                    name={reply.author.name} 
                    size="md"
                    className="flex-shrink-0 mr-4"
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
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Leave a Reply</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea 
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full min-h-[156px] p-4 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            />
            <div className="flex justify-start">
              <button 
                type="submit"
                disabled={!replyContent.trim() || isSubmitting}
                className={`px-6 py-2 rounded-lg text-white transition-all duration-200 ${
                  !replyContent.trim() || isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? 'Posting...' : 'Post Reply'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ThreadPage;
