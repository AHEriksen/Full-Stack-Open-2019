const config = require('./utils/config.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('connected to mongoDB');
  })
  .catch(error => {
    console.log(`error connection mongoDB ${error}`);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.tokenExtractor);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;