import mongoose from "mongoose";

export const connectToDb = async () => {
  const uri = "mongodb+srv://mohdshahzil59:shahzil@cluster0.sp1vedf.mongodb.net/edpathway";

  try {
    await mongoose.connect(uri);
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error.message);
  });
};
