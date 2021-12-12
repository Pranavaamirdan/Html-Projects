const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB_URI
    const db = require('./keys').MONGODB_URI;
    const conn = await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB;