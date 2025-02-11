import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionNumber: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctOption: {
    type: Number,
    required: false,
  },
});

const mockTestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "TestCategory",
    },
    timer: {
      type: Number,
      required: true,
      default: 930,
    },
    questions: {
      type: [questionSchema],
      validate: [arrayLimit, "{PATH} must have exactly 5 questions"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    }
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length === 5;
}

export default mongoose.model("MockTest", mockTestSchema);
