// forumUtils.js

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

export const loadThreadsData = async () => {
  try {
    // Get directory listing from public/data/forum
    let allThreads = [];
    let currentId = 1;
    let consecutiveFailures = 0;
    
    // Try to load files until we hit multiple consecutive failures
    while (consecutiveFailures < 3) {  // Stop after 3 consecutive failures
      const paddedId = String(currentId).padStart(3, '0');  // Convert 1 to "001"
      const thread = await readThreadFile(paddedId);
      
      if (thread) {
        allThreads.push(thread);
        consecutiveFailures = 0;  // Reset counter on success
      } else {
        consecutiveFailures++;
      }
      
      currentId++;
    }

    // Sort threads by last activity
    return allThreads.sort((a, b) => new Date(b.last_activity) - new Date(a.last_activity));
  } catch (error) {
    console.error('Error loading threads:', error);
    return [];
  }
};

export const loadSingleThread = async (threadId) => {
  try {
    const paddedId = String(threadId).padStart(3, '0');
    return await readThreadFile(paddedId);
  } catch (error) {
    console.error(`Error loading thread ${threadId}:`, error);
    return null;
  }
};
