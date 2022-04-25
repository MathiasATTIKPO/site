import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{ type: String, required: true},
    category: { type: String, required: true},
    image: { type: String, required: true},
    prix: { type: Number, required: true},
    countInStock: { type: String, required: true},
    rating : { type: Number, required: true},
    numReviews: { type: Number, required: true},
    description: { type: String, required: true},
} , {
    timestamps : true,
});
const Product = mongoose.model('Product',productSchema);

export default Product;
