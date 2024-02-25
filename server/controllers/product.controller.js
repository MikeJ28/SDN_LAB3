import { imageRepo, productRepo } from "../repositories/index.js";

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
        if(dataEixst.length){
            resp.status(500).json({
                "status": "fail",
                "message": "This name is existed in DB!"
            })
        }
        // Nếu tên sản phẩm không có trong db thì thực hiện add
        else{ 
            const {name, price, description, images, comments, category} = req.body;
            // Check xem có ảnh thì add vào db trước khi add sản phẩm.
            if(images.length){
                images.forEach(async element => {
                    await imageRepo.createImage(element.url, element.caption, element.size)
                });
            }

            //add vào products
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