import mongoose from "mongoose";

const pwResetSchema = mongoose.Schema(
  {
    requestId: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("PWReset", pwResetSchema);
