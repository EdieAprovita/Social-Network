const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.DB, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		})

		console.log(`Connected to MongoDB: ${conn.connection.host}`.cyan.underline)
	} catch (error) {
		console.log({ message: `Error: ${error}`.red.underline.bold })
		process.exit(1)
	}
}

module.exports = connectDB
