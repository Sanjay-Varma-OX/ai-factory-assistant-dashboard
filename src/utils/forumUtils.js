// forumUtils.js
const THREADS_PER_PAGE = 10;

const readThreadFile = async (threadId) => {
  try {
    const paddedId = String(threadId).padStart(3, '0');
    const response = await fetch(`/data/forum/thread-${paddedId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch thread ${threadId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error reading thread ${threadId}:`, error);
    return null;
  }
};

export const loadInitialThreads = async (pageNumber = 1, threadsPerPage = THREADS_PER_PAGE) => {
  try {
    const startId = (pageNumber - 1) * threadsPerPage + 1;
    const endId = startId + threadsPerPage - 1;
    
    const threadsPromises = [];
    for (let id = startId; id <= endId; id++) {
      threadsPromises.push(readThreadFile(id));
    }

    const threads = await Promise.all(threadsPromises);
    return threads.filter(thread => thread !== null)
      .sort((a, b) => new Date(b.last_activity) - new Date(a.last_activity));
  } catch (error) {
    console.error('Error loading initial threads:', error);
    return [];
  }
};

export const loadPageThreads = async (pageNumber, threadsPerPage = THREADS_PER_PAGE) => {
  try {
    const startId = (pageNumber - 1) * threadsPerPage + 1;
    const endId = startId + threadsPerPage - 1;
    
    const threadsPromises = [];
    for (let id = startId; id <= endId; id++) {
      threadsPromises.push(readThreadFile(id));
    }

    const threads = await Promise.all(threadsPromises);
    return threads.filter(thread => thread !== null)
      .sort((a, b) => new Date(b.last_activity) - new Date(a.last_activity));
  } catch (error) {
    console.error(`Error loading page ${pageNumber}:`, error);
    return [];
  }
};

export const preloadNextPages = async (currentPage, pagesToPreload = 2) => {
  try {
    const startPage = currentPage + 1;
    const preloadPromises = [];
    
    for (let page = startPage; page < startPage + pagesToPreload; page++) {
      preloadPromises.push(loadPageThreads(page));
    }
    
    return await Promise.all(preloadPromises);
  } catch (error) {
    console.error('Error preloading pages:', error);
    return [];
  }
};

export const getQuickCount = async () => {
  try {
    const response = await fetch('/data/forum/thread-count.json');
    if (response.ok) {
      const data = await response.json();
      return data.count;
    }
    
    // Fallback to quick scanning if count file doesn't exist
    let count = 0;
    let consecutiveFailures = 0;
    let currentId = 1;
    const batchSize = 10;

    while (consecutiveFailures < 3) {
      const batchPromises = [];
      for (let i = 0; i < batchSize; i++) {
        const threadId = currentId + i;
        batchPromises.push(
          fetch(`/data/forum/thread-${String(threadId).padStart(3, '0')}.json`, { method: 'HEAD' })
            .then(response => response.ok)
            .catch(() => false)
        );
      }

      const results = await Promise.all(batchPromises);
      const validFiles = results.filter(Boolean).length;
      
      if (validFiles > 0) {
        count += validFiles;
        consecutiveFailures = 0;
      } else {
        consecutiveFailures++;
      }
      
      currentId += batchSize;
    }

    return count;
  } catch (error) {
    console.error('Error getting thread count:', error);
    return 0;
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
};
