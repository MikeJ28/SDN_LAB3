import Products from "../models/product.model.js";

//R: get all product
const getAll = async() => {
    try{
        return await Products.find({}).exec();
    }catch(error){
        throw new Error(error.toString());
    }
}

// C: create product
const createProduct = async(name, price, description, images, comments, category) => {
    try{
        const newProduct = await Products.create({name, price, description, images, comments, category});
        return newProduct._doc;
    }
    catch(e){
        throw new Error(e.toString());
    }
}


export default {
    getAll,
    createProduct
}