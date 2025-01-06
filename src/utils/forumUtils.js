// forumUtils.js

export const loadThreadsData = async () => {
  try {
    // Read the forum directory content
    const response = await fetch('/api/files?path=src/data/forum/');
    const files = await response.json();
    
    // Filter and load only thread JSON files
    const threadFiles = files.filter(file => file.name.startsWith('thread-') && file.name.endsWith('.json'));
    
    const promises = threadFiles.map(async (file) => {
      try {
        const content = await window.fs.readFile(`src/data/forum/${file.name}`, { encoding: 'utf8' });
        return JSON.parse(content);
      } catch (err) {
        console.error(`Error loading thread ${file.name}:`, err);
        return null;
      }
    });

    const results = await Promise.all(promises);
    // Filter out any null results and sort by last activity
    return results
      .filter(thread => thread !== null)
      .sort((a, b) => new Date(b.last_activity) - new Date(a.last_activity));
  } catch (error) {
    console.error('Error loading threads:', error);
    return [];
  }
};

export const loadSingleThread = async (threadId) => {
  try {
    const content = await window.fs.readFile(`src/data/forum/thread-${threadId}.json`, { encoding: 'utf8' });
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading thread ${threadId}:`, error);
    return null;
  }
};
