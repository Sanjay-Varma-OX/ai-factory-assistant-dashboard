// forumUtils.js
const THREADS_PER_PAGE = 10;
let allThreads = null;

// Function to load multiple pages at once
export const loadInitialThreads = async (pagesCount = 5) => {
  try {
    const threadsPromises = [];
    // Load first 50 threads (5 pages)
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

// Modified background loading to start after initial threads
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
