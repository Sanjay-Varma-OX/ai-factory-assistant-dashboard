const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Health check endpoint for Azure
app.get('/robots933456.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// For any request that doesn't match one above, send back React's index.html file
app.get('*', (req, res) => {
  console.log('Serving index.html for path:', req.path);
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Server Error');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Current directory:', __dirname);
  console.log('Build path:', path.join(__dirname, 'build'));
});