const mongoose = require("mongoose")

const db = async () => {
  // Before connecting to MongoDB, set the default timeout to a higher value (e.g., 30 seconds)
  mongoose.set("connectTimeoutMS", 50000);

  const mongoConnection = await mongoose.connect(process.env.MONGO_URI);

  if (mongoConnection) {
    console.log("DB Connected⚡");
  } else {
    console.log("Sorry! some error occured😥");
  }
};

module.exports = { db };
