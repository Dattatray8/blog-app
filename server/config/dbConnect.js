import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connection Successfull");
  } catch (error) {
    console.log(`Error is connection to database : ${error.message}`);
  }
};
