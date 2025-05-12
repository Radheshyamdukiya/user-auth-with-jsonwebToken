const mongoose = require('mongoose');

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed");
    console.error(err);
  }
};

module.exports = main;
