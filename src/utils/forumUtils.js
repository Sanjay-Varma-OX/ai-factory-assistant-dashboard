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

// Export all the needed functions
export const loadInitialThreads = async (pagesCount = 5) => {
  try {
    const threadsPromises = [];
    for (let id = 1; id <= pagesCount * THREADS_PER_PAGE; id++) {
      const paddedId = String(id).padStart(3, '0');
      threadsPromises.push(readThreadFile(paddedId));
    }

    const threads = await Promise.all(threadsPromises);
    return threads.filter(thread => thread !== null)
      .sort((a, b) => new Date(b.last_activity) - new Date(a.last_activity));
  } catch (error) {
    console.error('Error loading initial threads:', error);
    return [];
  }
};

export const loadRemainingThreads = async (startFromId) => {
  if (allThreads !== null) return allThreads;

  try {
    let threads = [];
    let consecutiveFailures = 0;
    let currentId = startFromId;

    while (consecutiveFailures < 3) {
      const thread = await readThreadFile(currentId);
      if (thread) {
        threads.push(thread);
        consecutiveFailures = 0;
      } else {
        consecutiveFailures++;
      }
      currentId++;
    }

    return threads.sort((a, b) => new Date(b.last_activity) - new Date(a.last_activity));
  } catch (error) {
    console.error('Error loading remaining threads:', error);
    return [];
  }
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const loadSingleThread = async (threadId) => {
  try {
    const thread = await readThreadFile(threadId);
    if (!thread) {
      throw new Error(`Thread ${threadId} not found`);
    }
    return thread;
  } catch (error) {
    console.error(`Error loading thread ${threadId}:`, error);
    return null;
  }
};
