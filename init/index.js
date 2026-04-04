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
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "69cfd56e2c4bb0e011356e4c",
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initilized");
  } catch (error) {
    console.log(error);
  }
};

initDB();
