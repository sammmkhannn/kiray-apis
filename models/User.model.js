import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    profile: {
      type: String,
    },
    cell: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
