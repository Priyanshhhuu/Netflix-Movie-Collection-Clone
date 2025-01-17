import mongoose from "mongoose";

const connectDb = async () => {
  try {
    mongoose.connect(`${process.env.MONGO_URL}`).then(() => {
      console.log(
        `Database connected successfully !! DBHOST: ${mongoose.connection.host}`
      );
    });
  } catch (error) {
    console.error("MongoDB connection error: ", error.message);
    process.exit(1);
  }
};

export default connectDb;
