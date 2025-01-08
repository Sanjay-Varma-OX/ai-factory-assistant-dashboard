// forumUtils.js
const THREADS_PER_PAGE = 10;
let allThreads = null;

const readThreadFile = async (threadId) => {
  try {
    const paddedId = String(threadId).padStart(3, '0');
    const response = await fetch(`/data/forum/thread-${paddedId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch thread file: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error reading thread ${threadId}:`, error);
    return null;
  }
};

// Get total number of threads (using a cache)
export const getTotalThreadCount = async () => {
  if (allThreads !== null) {
    return allThreads.length;
  }
  
  let count = 0;
  let consecutiveFailures = 0;
  let currentId = 1;

  while (consecutiveFailures < 3) {
    const thread = await readThreadFile(currentId);
    if (thread) {
      count++;
      consecutiveFailures = 0;
    } else {
      consecutiveFailures++;
    }
    currentId++;
  }
  return count;
};

// Load threads for a specific page
export const loadThreadsForPage = async (page) => {
  try {
    // Calculate thread IDs for this page
    const startId = (page - 1) * THREADS_PER_PAGE + 1;
    const endId = startId + THREADS_PER_PAGE - 1;
    const pagePromises = [];

    for (let id = startId; id <= endId; id++) {
      pagePromises.push(readThreadFile(id));
    }

    const threads = await Promise.all(pagePromises);
    return threads
      .filter(thread => thread !== null)
      .sort((a, b) => new Date(b.last_activity) - new Date(a.last_activity));
  } catch (error) {
    console.error('Error loading page threads:', error);
    return [];
  }
};

// Load single thread
export const loadSingleThread = async (threadId) => {
  return await readThreadFile(threadId);
};
