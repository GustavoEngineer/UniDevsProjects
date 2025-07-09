const express = require('express');
const https = require('https');
const { key, cert } = require('../config/https');
const EvenOddController = require('../interfaces/EvenOddController');
require('dotenv').config();

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Par o Impar',
    version: '1.0.0',
    description: 'API para determinar si un número es par o impar',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/interfaces/EvenOddController.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/even-odd', EvenOddController.check);

https.createServer({ key, cert }, app).listen(PORT, () => {
  console.log(`HTTPS server running on https://localhost:${PORT}`);
  console.log(`Swagger docs available at https://localhost:${PORT}/api-docs`);
}); 