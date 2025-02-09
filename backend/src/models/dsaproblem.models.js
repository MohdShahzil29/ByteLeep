import mongoose from "mongoose";
import slugify from "slugify";

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
      type: [String],
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
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
      required: true,
      validate: {
        validator: function (val) {
          return val.length >= 1 && val.length <= 3;
        },
        message: "A problem must have between 1 and 3 categories.",
      },
    },
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

// Middleware to auto-generate slug before saving
dsaProblemSchema.pre("save", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const DsaProblem = mongoose.model("DsaProblem", dsaProblemSchema);

export default DsaProblem;
