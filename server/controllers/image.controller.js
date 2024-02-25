import {imageRepo} from "../repositories/index.js";

// Create controller
const createImage = async(req, resp) => {
    try {
        const {name, description} = req.body;
        const dataReturn = await imageRepo.create({name, description});
        resp.status(201).json(dataReturn);
    } catch (error) {
        throw new Error(error.toString());
    }
}