import mongoose, { Schema } from "mongoose";

const Products = mongoose.model(
  "products",
  new Schema(
    {
      name: {
        type: String,
        trim: true,
        required: [true, "Product name is required"],
        unique: [true, "Product name is unique value"],
      },
      price: {
        type: Number,
        default: 0,
        validate(value) {
          if (value < 0)
            throw new Error(
              "Price must be a number and greater than or equal zero"
            );
        },
      },
      description: {
        type: String,
        trim: true,
        required: [true, "Product must contain description"],
      },
      images: [
        {
          _id: {
            type: Schema.Types.ObjectId,
            ref: "images",
          },
          url: {
            type: String,
          },
        },
      ],
      comments: [
        {
          _id: {
            type: Schema.Types.ObjectId,
            ref: "comments",
          },
          text: {
            type: String,
          },
          author: {
            type: String,
          },
        },
      ],
      category: {
        type: Schema.Types.ObjectId,
        ref: "categories",
      },
    },
    {
      timestamps: true,
    }
  )
);

export default Products;
