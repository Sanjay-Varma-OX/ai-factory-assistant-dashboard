import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { loadSingleThread } from '../utils/forumUtils';
import UserAvatar from '../components/UserAvatar';

const ThreadPage = () => {
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // This line should be uncommented
  const [replyContent, setReplyContent] = useState('');
  const [replyData, setReplyData] = useState({
    name: '',
    position: '',
    email: '',
    comment: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


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
  
  // Validate form
  const newErrors = {};
  if (!replyData.name.trim()) newErrors.name = 'Name is required';
  if (!replyData.position.trim()) newErrors.position = 'Position is required';
  if (!replyData.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(replyData.email)) {
    newErrors.email = 'Invalid email address';
  }
  if (!replyData.comment.trim()) newErrors.comment = 'Comment is required';

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setIsSubmitting(true);
  try {
    // Here you would add your API call to submit the reply
    console.log('Submitting reply:', replyData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success alert
    setShowAlert(true);
    
    // Clear form
    setReplyData({
      name: '',
      position: '',
      email: '',
      comment: ''
    });
    setErrors({});
    
    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    
  } catch (error) {
    console.error('Error submitting reply:', error);
    setErrors({ submit: 'Failed to submit reply. Please try again.' });
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
       // Replace the existing Reply Form section with this code:

{/* Reply Form */}
<div className="mt-8">
  <h2 className="text-xl font-semibold mb-4">Leave a Reply</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <input
        type="text"
        value={replyData.name}
        onChange={(e) => setReplyData(prev => ({...prev, name: e.target.value}))}
        placeholder="Name"
        className="w-full p-4 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
      />
      {errors.name && (
        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
      )}
    </div>

    <div>
      <input
        type="text"
        value={replyData.position}
        onChange={(e) => setReplyData(prev => ({...prev, position: e.target.value}))}
        placeholder="Position"
        className="w-full p-4 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
      />
      {errors.position && (
        <p className="text-red-500 text-sm mt-1">{errors.position}</p>
      )}
    </div>

    <div>
      <input
        type="email"
        value={replyData.email}
        onChange={(e) => setReplyData(prev => ({...prev, email: e.target.value}))}
        placeholder="Email"
        className="w-full p-4 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
      )}
    </div>

    <div>
      <textarea 
        value={replyData.comment}
        onChange={(e) => setReplyData(prev => ({...prev, comment: e.target.value}))}
        placeholder="Share your thoughts..."
        className="w-full min-h-[156px] p-4 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
        required
      />
      {errors.comment && (
        <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
      )}
    </div>

    <div className="flex justify-start">
      <button 
        type="submit"
        disabled={isSubmitting}
        className={`px-6 py-2 rounded-lg text-white transition-all duration-200 ${
          isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? 'Posting...' : 'Post Reply'}
      </button>
    </div>
  </form>

  {/* Success Alert */}
  {showAlert && (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 animate-fade-in-up">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">
            Reply posted successfully!
          </p>
          <p className="mt-1 text-sm text-green-600">
            Your reply has been submitted and will appear in the discussion.
          </p>
        </div>
      </div>
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default ThreadPage;
