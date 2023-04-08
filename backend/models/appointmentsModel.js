import mongoose from 'mongoose'
import { Schema } from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "First Name Required!"],
    },
    lname: {
        type: String,
        required: [true, "Last Name Required!"],
      },
    email: {
      type: String,
      required: [true, "email required!"],
    },
    phone: {
      type: String,
      required: [true, "Phone required!"],
    },
    service: {
      type: Schema.Types.ObjectId,
      required: [true, "Service required!"],
    },
    date: {
      type: String,
      required: [true, "Date Required!"],
    },
    time: {
      type: String,
      required: [true, "Date Required!"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Appointment", appointmentSchema);
