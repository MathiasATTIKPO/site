import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth , isSeller , isSellerOrAdmin} from '../utils.js';


const  productRouter = express.Router();

productRouter.get('/',
    expressAsyncHandler(async (req, res) => {
        const seller = req.query.seller || '';
        const sellerFilter = seller ? { seller } : {};
        const products =  await Product.find({
            ...sellerFilter,
        }).populate('seller', 'seller.name seller.photo');
        res.send(products);
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
    isAdmin,
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


export default productRouter ;