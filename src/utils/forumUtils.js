export const loadThreadsData = async () => {
  try {
    const threadIds = ['001', '002', '003', '004'];
    const promises = threadIds.map(async (id) => {
      const response = await fetch(`/data/forum/thread-${id}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    });
    
    return await Promise.all(promises);
  } catch (error) {
    console.error('Error loading threads:', error);
    return [];
  }
};

export const loadSingleThread = async (threadId) => {
  try {
    const response = await fetch(`/data/forum/thread-${threadId}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading thread ${threadId}:`, error);
    return null;
  }
};