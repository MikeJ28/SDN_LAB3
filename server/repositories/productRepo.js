import Products from "../models/product.model.js";

//R: get all product
const getAll = async() => {
    try{
        return await Products.find({}).exec();
    }catch(error){
        throw new Error(error.toString());
    }
}


export default {
    getAll
}