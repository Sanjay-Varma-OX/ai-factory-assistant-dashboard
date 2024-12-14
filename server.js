const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Azure health check endpoint
app.get('/robots933456.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname)));

// For any request that doesn't match above, send back React's index.html file
app.get('*', (req, res) => {
  console.log('Request path:', req.path);
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Current directory:', __dirname);
  console.log('Static files path:', path.join(__dirname));
});