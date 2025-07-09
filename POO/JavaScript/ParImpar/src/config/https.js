const fs = require('fs');
const path = require('path');

const key = fs.readFileSync(path.join(__dirname, 'key.pem'));
const cert = fs.readFileSync(path.join(__dirname, 'cert.pem'));

module.exports = { key, cert }; 