import mongoose from 'mongoose'
import { Schema } from "mongoose";

const objectSchema = mongoose.Schema({
  name: String,
  slug: String
});

const serviceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title Required!"],
    },
    abbreviation: {
      type: String,
      required: [true, "Abbreviation required!"],
    },
    slug: {
      type: String,
      required: [true, "Service slug required!"],
    },
    categories: [objectSchema],
    serviceDescription: {
      type: String,
      required: [true, "Service description required!"],
    },
    serviceBulletpoints: [
      {
        bulletpoint: String,
      },
    ],
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
    searchTerms: [
      {
        term: String,
      },
    ],
  },
  {
    timestamps: false,
  }
);

export default mongoose.model("Service", serviceSchema);
