// forumUtils.js

const THREADS_PER_PAGE = 10;
let allThreads = null; // Cache for background-loaded threads

const readThreadFile = async (threadId) => {
  try {
    const response = await fetch(`/data/forum/thread-${threadId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch thread file: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error reading thread ${threadId}:`, error);
    return null;
  }
};

// Function to load threads for a specific page
export const loadThreadsForPage = async (page) => {
  try {
    const startId = (page - 1) * THREADS_PER_PAGE + 1;
    const endId = startId + THREADS_PER_PAGE - 1;
    const pageThreadPromises = [];

    // Load threads for current page
    for (let id = startId; id <= endId; id++) {
      const paddedId = String(id).padStart(3, '0');
      pageThreadPromises.push(readThreadFile(paddedId));
    }

    const pageThreads = await Promise.all(pageThreadPromises);
    return pageThreads.filter(thread => thread !== null)
      .sort((a, b) => new Date(b.last_activity) - new Date(a.last_activity));

  } catch (error) {
    console.error('Error loading page threads:', error);
    return [];
  }
};

// Background loader for all threads
export const startBackgroundLoading = async () => {
  if (allThreads !== null) return allThreads; // Return cached threads if available

  try {
    let threads = [];
    let currentId = 1;
    let consecutiveFailures = 0;

    while (consecutiveFailures < 3) {
      const paddedId = String(currentId).padStart(3, '0');
      const thread = await readThreadFile(paddedId);

      if (thread) {
        threads.push(thread);
        consecutiveFailures = 0;
      } else {
        consecutiveFailures++;
      }

      currentId++;
    }

    allThreads = threads.sort((a, b) => new Date(b.last_activity) - new Date(a.last_activity));
    return allThreads;

  } catch (error) {
    console.error('Error in background loading:', error);
    return [];
  }
};

// Get total thread count (for pagination)
export const getTotalThreadCount = async () => {
  const threads = await startBackgroundLoading();
  return threads.length;
};

// Load single thread
export const loadSingleThread = async (threadId) => {
  // First check cache if available
  if (allThreads !== null) {
    const thread = allThreads.find(t => t.id === threadId);
    if (thread) return thread;
  }

  // If not in cache, load directly
  try {
    const paddedId = String(threadId).padStart(3, '0');
    return await readThreadFile(paddedId);
  } catch (error) {
    console.error(`Error loading thread ${threadId}:`, error);
    return null;
  }
};
