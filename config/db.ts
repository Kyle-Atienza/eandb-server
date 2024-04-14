const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("[server]: Connecting to database");

  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(`[server]: MongoDB Connected ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
