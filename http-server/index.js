const express = require('express');
const minimist = require('minimist');
const path = require('path');

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;
const app = express();

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/project', (req, res) => {
  res.sendFile(path.join(__dirname, 'project.html'));
});

app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, 'registration.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});