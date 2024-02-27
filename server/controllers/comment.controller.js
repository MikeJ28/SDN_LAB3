import { commentRepo } from "../repositories/index.js";

// Create comment controller
const createComment = async (req, resp) => {
  try {
    const { text, rate, author, _id } = req.body;
    const dataReturn = await commentRepo.createComment(text, rate, author, _id);
    resp.status(201).json(dataReturn);
  } catch (error) {
    throw new Error(error.toString());
  }
};

// update comment controller
const updateComment = async (req, resp) => {
  try {
    const { _id, text } = req.body;
    const dataReturn = await commentRepo.updateComment(_id, text);
    resp.status(201).json(dataReturn);
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default {
  createComment,
  updateComment,
};
