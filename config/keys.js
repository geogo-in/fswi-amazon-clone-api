// Hold application secret and configurations
// module.exports = {
// 	mongoURI: process.env.MONGO_CONNECT
// };
require("dotenv").config();

module.exports = {
	// mongoURI: "mongodb://localhost:27017/Amazon-clone?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

	// A `.env` FILE CREATED IN THE MAIN index.js MAIN DIRECTORY WHERE THIS mongoURI IS STORED
	mongoURI: process.env.MONGO_CONNECT
};