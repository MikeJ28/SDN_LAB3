import Comment from "../models/commnet.model.js";
import Products from "../models/product.model.js";
import { ObjectId } from "mongoose";

// C: Create comment
const createComment = async (text, rate, author, _id) => {
  try {
    const dataReturn = await Comment.create({ text, rate, author });
    // Adding to product:
    const {
      _id: commentId,
      text: commentText,
      author: commentAuthor,
    } = dataReturn._doc;
    await Products.findByIdAndUpdate(
      _id,
      {
        $push: {
          comments: {
            _id: commentId,
            text: commentText,
            author: commentAuthor,
          },
        },
      },
      { new: true }
    );

    return dataReturn._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};

// U : Update Comment
const updateComment = async (_id, text) => {
  try {
    //update vao comment
    const dataReturn = await Comment.findByIdAndUpdate(_id, { text: text });
    //update vao product:
    await Products.findOneAndUpdate(
      { "comments._id": _id },
      { $set: { "comments.$.text": text } }
    );
    return dataReturn._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default {
  createComment,
  updateComment,
};
