import { productRepo } from "../repositories/index.js";

//getAll
const getAllProducts = async(req, res) => {
    let dataReturn = {}
    try {
        const data = await productRepo.getAll();
        dataReturn = {
            "length" : data.length,
            "status": true,
            "results": data
        };
        res.status(200).json(dataReturn);
    } catch (error) {
        dataReturn = {
            "length" : null,
            "status": false,
            "message": error.toString()
        };
        res.status(500).json(dataReturn)
    }
}

//R: get Product by ID:
const getProductById = async(req, res) => {
    let dataReturn = {}
    try {
        const data = await productRepo.getProduct(req.params.id, "_id");
        dataReturn = {
            "length" : data.length,
            "status": true,
            "results": data
        };
        res.status(200).json(dataReturn);
    } catch (error) {
        dataReturn = {
            "length" : null,
            "status": false,
            "message": error.toString()
        };
        res.status(500).json(dataReturn)
    }
}

// Create product
const createProduct = async(req, resp) =>{
    try{
        //check Name is undefine or not
        const dataEixst = await productRepo.getProduct(req.body.name, "name");
        console.log(dataEixst)
        if(dataEixst.length){
            resp.status(500).json({
                "status": "fail",
                "message": "This name is existed in DB!"
            })
        }
        else{
            const {name, price, description, images, comments, category} = req.body;
            const results = await productRepo.createProduct(name, price, description, images, comments, category);
            resp.status(201).json(results);
        }
    }
    catch(error){
        // console.error(error)
        resp.status(500).json({
            error: error.toString()
        })
    }
}

export default {
    getAllProducts,
    getProductById,
    createProduct
}