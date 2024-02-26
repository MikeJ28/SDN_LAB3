import mongoose, {Schema} from "mongoose";

const Categories = mongoose.model("categories",  new Schema({
    "name":{
        type: String,
        trim: true,
        unique: [true, 'Category name is unique value'],
        required: [true, 'Category must contain name'],
    },
    "description": {
        type: String,
        trim: true,
        required: [true, 'Category must contain content'],
    }
},{
    timestamps: true
})
);

export default Categories;