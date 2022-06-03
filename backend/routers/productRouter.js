import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';


const  productRouter = express.Router();

productRouter.get('/',
    expressAsyncHandler(async (req, res) => {
        const products =  await Product.find({});
        res.send(products);
    })
);
productRouter.get(
    '/seed' , 
    expressAsyncHandler(async (req, res) => {
       // await Product.remove({})
        const createProducts = await Product.insertMany(data.products);
        res.send({createProducts});
    })
);

productRouter.get('/:id' ,
    expressAsyncHandler(async (req, res) => {
        const products = await Product.findById(req.params.id);
       if(products){
           res.send(products);
       }
       else{
            res.status(404).send({message: 'logement  not found'});
       }
    })
)

productRouter.post('/',
    isAuth , 
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = new Product({
          name: 'sample name ' + Date.now(),
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
export default productRouter ;