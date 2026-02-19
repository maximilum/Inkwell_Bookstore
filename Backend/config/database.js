const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connect_DB = async () => {
  try {
    const db_connect = await mongoose.connect(process.env.DB_URL);
    console.log("Database Connected Succesfully @", db_connect.connection.host);
  } catch (e) {
    console.log("error connecting to database: ", e.message);
    process.exit(1);
  }
};
module.exports = connect_DB;
