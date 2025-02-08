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
      required: true,
      min: 0,
      max: 100,
      validate: {
        validator: Number.isFinite,
        message: "Accuracy must be a finite number",
      },
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
      type: [Schema.Types.Mixed],
      required: true,
    },
    output: {
      type: [Schema.Types.Mixed],
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    // driveCode: {
    //   java: String,
    //   python: String,
    //   cpp: String,
    // },
    // userFunction: {
    //   java: String,
    //   python: String,
    //   cpp: String,
    // },
    slug: {
      type: String,
      unique: true,
    },
    testCases: [
      {
        input: [Schema.Types.Mixed],
        output: [Schema.Types.Mixed],
      },
    ],
    expectedTimeSpaceComplexity: {
      timeComplexity: String,
      spaceComplexity: String,
    },
  },
  {
    timestamps: true,
  }
);

const DsaProblem = mongoose.model("DsaProblem", dsaProblemSchema);

export default DsaProblem;
