const express = require('express');
const https = require('https');
const { key, cert } = require('../config/https');
const EvenOddController = require('../interfaces/EvenOddController');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/even-odd', EvenOddController.check);

https.createServer({ key, cert }, app).listen(PORT, () => {
  console.log(`HTTPS server running on https://localhost:${PORT}`);
}); 