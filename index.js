const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// multer is used for handling files in NodeJS
const multer = require('multer')

const keys = require('./config/keys');

require('./src/models/Product');
require('./src/models/Category');
// Setup DB
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

// Setup App (Middleware)
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer())

// Add all routes
require('./src/routes/productRoutes')(app);
require('./src/routes/categoryRoutes')(app);

// Setup Server
const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port, "0.0.0.0");
console.log('Server listening on:', port);
