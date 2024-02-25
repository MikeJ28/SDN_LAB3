import Categories from "../models/categories.model.js";

// C: Create category
const createCate = async(name, description) => {
    try {
        const dataReturn = await Categories.create({name, description});
        return dataReturn._doc;
    } catch (error) {
        throw new Error(error.toString());
    }
}


// R: Get category
const getCategory = async(_id) => {
    try{
        const dataReturn = _id ? await Categories.find({"_id": _id}) :  await Categories.find({});
        return dataReturn;
    }catch(error){
        throw new Error(error.toString());
    }
}

export default{
    createCate,
    getCategory
}