// model/User.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["jobseeker", "recruiter"],
      required: [true, "Role is required"],
    },
    bio: {
      type: String,
      default: "",
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    resume: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    savedJobs: [
      {
        type: String,
      },
    ],
    resetPasswordExpire: {
      type: Date,
    },
    resetToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite issues in dev
export const User = mongoose.models.User || mongoose.model("User", userSchema);

