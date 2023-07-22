const mongoose = require("mongoose");

const db = async () => {
  
    const mongoConnection = await mongoose.connect(process.env.MONGO_URI);

  if (mongoConnection) {
    console.log("DB Connected⚡");
  } else {
    console.log("Sorry! some error occured😥");
  }
};

module.exports = { db };
