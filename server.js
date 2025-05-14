// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('FX Notify Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
