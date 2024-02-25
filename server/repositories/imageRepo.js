import Images from '../models/images.model.js'

// C: Create category
const createImage = async(url, caption, size) => {
    try {
        const dataReturn = await Images.create({url, caption, size});
        return dataReturn._doc;
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default {
    createImage
}