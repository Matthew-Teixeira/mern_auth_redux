const mongoose = require("mongoose");

const db = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGO DB CONNECTED: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MONGO ERROR: ${error.message}`);
    process.exit(1);
  }
};

module.exports = db;