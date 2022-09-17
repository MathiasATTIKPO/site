import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true },
    },
    {
      timestamps: true,
    }
  );

  const imageSchema = new mongoose.Schema({
      image:{ type: String, required: true},
  },
  {
    timestamps : true,
  })

const productSchema = new mongoose.Schema({
    name:{ type: String, required: true},
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    sellerName:{ type: String, required: true},
    category: { type: String, required: true},
    images:[imageSchema],
    prix: { type: Number, required: true},
    countInStock: { type: String, required: true},
    description: { type: String, required: true},
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],

} , {
    timestamps : true,
});
const Product = mongoose.model('Product',productSchema);

export default Product;
