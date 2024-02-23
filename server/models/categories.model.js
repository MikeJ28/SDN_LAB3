import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema({
    "name":{
        type: String,
        trim: true,
        required: [true, 'Category must contain name'],
    },
    "description": {
        type: String,
        trim: true,
        required: [true, 'Category must contain content'],
    }
},{
    timestamps: true
});

const Categories = mongoose.model("categories", categorySchema);

export default Categories;