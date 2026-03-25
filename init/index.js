const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then((res) => {
    console.log("Connection Succesful");
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    console.log("Data was deleted");
    await Listing.insertMany(initData.data);
    console.log("Data was initilized");
  } catch (error) {
    console.log(error);
  }
};

initDB();
