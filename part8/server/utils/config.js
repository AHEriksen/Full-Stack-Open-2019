require('dotenv').config();

let MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

module.exports = MONGODB_URI;