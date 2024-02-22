import mongoose, {Schema} from "mongoose";

const imageSchema = new Schema({
    "url":{
        type: String,
    },
    "caption": {
        type: String,
    },
    "size":{
        type: Number,
        max: [2048, 'Size must be lowwer than or equals to 2Mb']
    },
},{
    timestamps: true
});

const Images = mongoose.model("Images", imageSchema);

export default Images;