import mongoose from "mongoose";

const testCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("MockTestCategory", testCategorySchema);
