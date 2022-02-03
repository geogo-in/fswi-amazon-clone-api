const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// multer is used for handling files in NodeJS
// const multer = require('multer')

const keys = require('./config/keys');

require('./src/models/Product');
require('./src/models/Category');
require('./src/models/Banner');
require('./src/models/Order');
require('./src/models/ConfirmedOrder');

// Setup DB
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);
// console.log(keys.mongoURI);

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
require('./src/routes/bannerRoutes')(app);
require('./src/routes/orderRoutes')(app);
require('./src/routes/confirmedOrderRoutes')(app);
app.use("/auth", require("./src/routes/userRoutes"))
// app.use("/banner", require("./src/routes/bannerRoutes"))

// Setup Server
const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port, "0.0.0.0");
console.log('Server listening on:', port);
