import { query } from "express";
import Products from "../models/product.model.js";
import {imageRepo} from "./index.js"

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
        const data = await Products.find(query).exec();
        const dataReturn = data.map(item => {
            let tmp_obj = {};
            tmp_obj.id = item.id
            tmp_obj.name = item.name ? item.name : "";
            tmp_obj.price = item.price ? item.price : 0;
            tmp_obj.description = item.description ? item.description : "";
            tmp_obj.category = item.category ? item.category.name : "";
           
            // Nếu như filed == _ic thì trả thêm ảnh của phẩn tử đầu tiên vì mảng trả về chỉ có 1 phần tử.
            if(field == "_id"){
                tmp_obj.images = data[0].images;
            }
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
        let imageArray = [];
        let imgData = []
        if(Array.isArray(images)){
            //Thêm ảnh vào database
            for (const element of images) {
                let dataReturn = await imageRepo.createImage(element.url, element.caption, element.size);
                imageArray.push(dataReturn);
            }
            // Thêm ảnh vào product
            imgData = imageArray.map(element => {return {
                _id: element._id,
                url: element.url
                }
            })
        }
        const newProduct = await Products.create({name, price, description, images: imgData, comments, category});
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