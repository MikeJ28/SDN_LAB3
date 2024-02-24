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

// Create product
const createProduct = async(req, resp) =>{
    console.log(req.body);
    try{
        const {name, price, description, images, comments, category} = req.body;
        const results = await productRepo.createProduct(name, price, description, images, comments, category);
        resp.status(201).json(results);
    }
    catch(error){
        resp.status(500).json({
            error: error.toString()
        })
    }
}

export default {
    getAllProducts,
    createProduct
}