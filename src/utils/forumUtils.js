// forumUtils.js

// Use readFileSync to directly read the JSON content
const readThreadFile = async (threadId) => {
  try {
    // Using the window.fs.readFile API that's available in your environment
    const fileContent = await window.fs.readFile(`src/data/forum/thread-${threadId}.json`, { encoding: 'utf8' });
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading thread ${threadId}:`, error);
    return null;
  }
};

export const loadThreadsData = async () => {
  try {
    // Instead of reading directory, we'll start with known thread files
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
