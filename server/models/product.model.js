import mongoose, {Schema} from "mongoose";


const productSchema = new Schema({
    "name":{
        type: String,
        trim: true,
        required: [true, 'Product name is required'],
        unique: [true, 'Product name is unique value'] 
    },
    "price": {
        type: Number,
        default: 0,
        validate(value){
            if(value<0) throw new Error("Price must be a number and greater than or equal zero");
        }
    },
    "description":{
        type: String,
        trim: true,
        required: [true, 'Product must contain description']
    },
    "images": [imageSchema],
    "comments": [commentSchema],
    "category": {
        type: Schema.Types.ObjectId,
        ref: "categories"
    }
},{
    timestamps: true
});

const Products = mongoose.model("Products", productSchema);

export default Products;