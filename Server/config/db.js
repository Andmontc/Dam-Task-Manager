const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const connectdb = async () => {
	try {
		await mongoose.connect(process.env.DB_MONGO, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});
		console.log('connected db');
	} catch (error) {
		console.log(error);
		process.exit(1); // stop the app
	}
}

module.exports = connectdb;