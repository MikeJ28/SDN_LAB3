import mongoose, { Schema } from "mongoose";

const Comments = mongoose.model(
  "comments",
  new Schema(
    {
      text: {
        type: String,
        trim: true,
        required: [true, "Commect must contain content"],
      },
      rate: {
        type: Number,
        default: 5,
        min: [0, "Rate must be greater than or equals to 0"],
        max: [5, "Rate must be lowwer than or equals to 5"],
      },
      author: {
        type: String,
        required: [true, "Comment must contain author"],
      },
    },
    {
      timestamps: true,
    }
  )
);

export default Comments;
