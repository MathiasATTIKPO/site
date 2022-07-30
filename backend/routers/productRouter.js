import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import { isAdmin, isAuth  , isSellerOrAdmin} from '../utils.js';


const  productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const category = req.query.category || '';
    const seller = req.query.seller || '';
    const order = req.query.order || '';

    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const sellerFilter = seller ? { seller } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { prix: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === 'lowest'
        ? { prix: 1 }
        : order === 'highest'
        ? { prix: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };
    const count = await Product.count({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });

    const products = await Product.find({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate('seller', 'seller.name seller.photo')
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

productRouter.get(
    '/seed' , 
    expressAsyncHandler(async (req, res) => {
       // await Product.remove({})
      const seller = await User.findOne({ isSeller: true });
       if(seller){
           const products = data.products.map((product) => ({
               ...product,
               seller: seller._id,
           }));
           const createProducts = await Product.insertMany(data.products);
           res.send({createProducts});
        }else{
           res.status(500).send({message:'Aucun proprietaire trouvé , excuter /api/users/seed'});
        } 
    })
);

productRouter.get('/:id' ,
    expressAsyncHandler(async (req, res) => {
        const products = await Product.findById(req.params.id).populate(
            'seller',
            'seller.name seller.photo seller.rating seller.numReviews'
          );
       if(products){
           res.send(products);
       }
       else{
            res.status(404).send({message: 'Aucun logement trouvé'});
       }
    })
)

productRouter.post('/',
    isAuth , 
    isSellerOrAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = new Product({
          name: 'sample name ' + Date.now(),
          seller: req.user._id,
          image: '/images/p1.jpg',
          prix: 0,
          category: 'sample category',
          countInStock: 'libre',
          rating: 0,
          numReviews: 0,
          description: 'sample description',
        });
        const createdProduct = await product.save();
        res.send({ message: 'Logement Ajouter', product: createdProduct });
    })
);

productRouter.put(
    '/:id',
    isAuth,
    isSellerOrAdmin,
    expressAsyncHandler(async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (product) {
        product.name = req.body.name;
        product.prix = req.body.prix;
        product.image = req.body.image;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({ message: 'Logment mise à jour', updatedProduct: updatedProduct });
      } else {
        res.status(404).send({ message: 'logement non trouvé' });
      }
    })
  );

productRouter.delete('/:id' , 
    isAuth, 
    isAdmin , 
    expressAsyncHandler(async (req, res)=>{
        const productId = req.params.id ;
        const  product = await Product.findById(productId);
        if(product) {
            const deleteProduct = await product.remove();
            res.send({ message :'logement supprimer ', product : deleteProduct});
        }else{
            res.status(404).send({ message :'logement non trouvé'});
        }
    })
);

productRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'Déja noté....' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Aucun logement trouvé...' });
    }
  })
);

export default productRouter ;