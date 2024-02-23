import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema({
    "url":{
        type: String,
    },
    "text": {
        type: String,
        trim: true,
        required: [true, 'Commect must contain content'],
    },
    "rate":{
        type: Number,
        default: 5,
        min: [0, 'Rate must be greater than or equals to 0'],
        max: [5, 'Rate must be lowwer than or equals to 5'],
    },
    "author": {
        type: Number,
        required: [true, 'Commect must contain author'],
    }
},{
    timestamps: true
});

const Comments = mongoose.model("comments", commentSchema);

export default Comments;