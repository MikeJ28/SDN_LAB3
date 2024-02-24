import {categoryRepo} from "../repositories/index.js";

// Create controller
const createCategory = async(req, resp) => {
    try {
        const {name, description} = req.body;
        const dataReturn = await categoryRepo.create({name, description});
        resp.status(201).json(dataReturn);
    } catch (error) {
        throw new Error(error.toString());
    }
}

// Get all category
const getAllCategories = async(req, resp) => {
    try{
        const dataReturn = await categoryRepo.getCategory();
        resp.status(200).json(dataReturn);
    }
    catch(error){
        resp.status(500).json(error.toString() )
    }
}

// get category by _id
const getCategory = async(req, resp) => {
    console.log(req.params);
    try{
        console.log(req.params.id);
        const id = req.params.id;
        const dataReturn = await categoryRepo.getCategory(id);
        resp.status(200).json(dataReturn);
    }
    catch(error){
        resp.status(500).json(error.toString() )
    }
}

export default {
    createCategory,
    getAllCategories,
    getCategory
}
