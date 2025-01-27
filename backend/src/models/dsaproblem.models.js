import mongoose from "mongoose";

const { Schema } = mongoose;

const dsaProblemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    accuracy: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    input: {
      type: [String],
      required: true,
    },
    output: {
      type: [String],
      required: true,
    },
    shortExplanation: {
      type: String,
      required: true,
    },
    constraints: {
      type: String,
      required: true,
    },
    companyTags: {
      type: [String],
      required: true,
    },
    topicTags: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unqiue: true,
    },
  },
  {
    timestamps: true,
  }
);

const DsaProblem = mongoose.model("DsaProblem", dsaProblemSchema);

export default DsaProblem;
