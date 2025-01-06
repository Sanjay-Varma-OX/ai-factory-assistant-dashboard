const readThreadFile = async (threadId) => {
  try {
    const response = await fetch(`/src/data/forum/thread-${threadId}.json`);
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
    // Start with known thread files
    const threadIds = ['001', '002', '003', '004'];
    const threadPromises = threadIds.map(id => readThreadFile(id));
    const threads = await Promise.all(threadPromises);
    
    // Filter out any null results (failed reads) and sort by last activity
    return threads
      .filter(thread => thread !== null)
      .sort((a, b) => new Date(b.last_activity) - new Date(a.last_activity));
      
  } catch (error) {
    console.error('Error loading threads:', error);
    return [];
  }
};

export const loadSingleThread = async (threadId) => {
  try {
    return await readThreadFile(threadId);
  } catch (error) {
    console.error(`Error loading thread ${threadId}:`, error);
    return null;
  }
};
