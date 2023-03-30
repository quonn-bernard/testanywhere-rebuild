import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a category name"],
  },
  slug: {
    type: String,
    required: [true, "Please add a category slug"],
  },
});

export default mongoose.model("Category", categorySchema);
