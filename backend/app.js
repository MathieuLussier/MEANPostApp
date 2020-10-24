require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

// Routes
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const production = (process.env.PRODUCTION === 'true');

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

if (production) {
  mongoose.connect(process.env.PROD_DATABASE_URL, options);
} else {
  mongoose.connect(process.env.DEV_DATABASE_URL, options);
}

mongoose.connection.on('connected', function () {
  if (production) {
    console.log('Mongoose connection open to ' + process.env.PROD_DATABASE_URL);
  } else {
    console.log('Mongoose connection open to ' + process.env.DEV_DATABASE_URL);
  }
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});

const staticDistRoot = path.join(__dirname, '../', 'dist', 'meanpostapp');

app.use(express.static(staticDistRoot));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});

app.get('/', (req, res, next) => {
  res.status(200).sendFile(path.resolve(`${staticDistRoot}\\index.html`));
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
