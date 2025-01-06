export const loadThreadsData = async () => {
  try {
    // Get the list of files from the directory
    const response = await window.fs.readFile('/data/forum');
    const files = await response.json();
    
    // Filter for thread JSON files and get their data
    const promises = files
      .filter(file => file.name.startsWith('thread-') && file.name.endsWith('.json'))
      .map(async (file) => {
        const threadResponse = await window.fs.readFile(`/data/forum/${file.name}`, { encoding: 'utf8' });
        return JSON.parse(threadResponse);
      });
    
    return await Promise.all(promises);
  } catch (error) {
    console.error('Error loading threads:', error);
    return [];
  }
};

export const loadSingleThread = async (threadId) => {
  try {
    const response = await window.fs.readFile(`/data/forum/thread-${threadId}.json`, { encoding: 'utf8' });
    return JSON.parse(response);
  } catch (error) {
    console.error(`Error loading thread ${threadId}:`, error);
    return null;
  }
};
