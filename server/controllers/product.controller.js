import { productRepo } from "../repositories/index.js";

//getAll
const getAllProducts = async(req, res) => {
    try {
        res.status(200).json(await productRepo.getAll());
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

export default {
    getAllProducts
}