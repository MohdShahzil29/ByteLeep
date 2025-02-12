import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MockTest",
    required: true,
  },
  currentQuestionIndex: {
    type: Number,
    default: 0,
  },
  selectedOption: {
    type: Number,
    default: null,
  },
  isSubmitted: {
    type: Boolean,
    default: false,
  },
  isCorrect: {
    type: Boolean,
    default: null,
  },
  attempts: {
    type: Number,
    default: 0,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    enrolledTests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MockTest",
      },
    ],
    progress: [progressSchema],
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
