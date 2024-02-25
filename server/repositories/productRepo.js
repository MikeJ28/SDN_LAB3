import { query } from "express";
import Products from "../models/product.model.js";

//R: get all product
const getAll = async() => {
    try{
        const data = await Products.find({}).populate('category').exec();
        const dataReturn = data.map(item => {
            let tmp_obj = {};
            tmp_obj.id = item.id
            tmp_obj.name = item.name ? item.name : "";
            tmp_obj.price = item.price ? item.price : 0;
            tmp_obj.description = item.description ? item.description : "";
            tmp_obj.category = item.category ? item.category.name : "";
            return tmp_obj
        })
        return dataReturn;
    }catch(error){
        throw new Error(error.toString());
    }
}

//R: get product
const getProduct = async(param, field) => {
    try{
        let query = {};
        query[field] = param;
        console.log(query)
        const data = await Products.find(query).exec();
        console.log(data)
        const dataReturn = data.map(item => {
            let tmp_obj = {};
            tmp_obj.id = item.id
            tmp_obj.name = item.name ? item.name : "";
            tmp_obj.price = item.price ? item.price : 0;
            tmp_obj.description = item.description ? item.description : "";
            tmp_obj.category = item.category ? item.category.name : "";
            return tmp_obj
        });
        return dataReturn;
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
    createProduct,
    getProduct
}