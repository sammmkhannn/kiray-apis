import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    cell: {
      type: String,
      unique:true
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    customerId: {
      type:String
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
