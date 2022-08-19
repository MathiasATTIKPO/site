import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import { isAdmin, isAuth, isSellerOrAdmin  , mailgun,
  payOrderEmailTemplate,} from "../utils.js";

const orderRouter = express.Router();

orderRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {

    //location
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const ordersPaid= await Order.aggregate([
      {
        $match:{
          isPaid: true
        }
      } ,    
      {
        $group: {
          _id:null,
          numOrders: { $sum: 1 },

        }
      }
    ]);


    // utilisateurs
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    
    const usersSeller = await User.aggregate([
      {
        $match:{
          isSeller : true,
        }
      },
      {
        $group: {
          _id: null ,          
          numUsersSeller: { $sum: 1},
        },
       
      }

    ]);
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$paidAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const dailyUsers = await User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          users: { $sum: 1 },
         // sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories , ordersPaid , usersSeller , dailyUsers});
  })
);

orderRouter.get(
    '/',
    isAuth,
    isSellerOrAdmin,
    expressAsyncHandler(async (req, res) => {
      const seller = req.query.seller || '';
      const sellerFilter = seller ? { seller } : {};
  
      const orders = await Order.find({ ...sellerFilter }).populate(
        'user',
        'name'
      );
      res.send(orders);
    })
  ); 

orderRouter.get(
    '/mine', 
    isAuth, 
    expressAsyncHandler(async (req, res)=>{
    const orders = await  Order.find({user: req.user._id});
    res.send(orders);
}));


orderRouter.get('/:id' ,
    isAuth ,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        }else{
            res.status(404).send({message:'Order not found'}); 
        }
    })
);



orderRouter.put('/:id/pay' , 
    isAuth , 
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if(order){
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = { 
                id: req.body.id ,
                status: req.body.status , 
                update_time :req.body.update_time , 
                email_adress : req.body.email_adress ,
            };
            const updateOrder = await order.save();

            mailgun()
            .messages()
            .send(
              {
              from: 'LOCALOLI <localoli@mg.sandboxe056f65542fa44c79527acc260feb57f.mailgun.org.com>',
              to: `${order.user.name} <${order.user.email}>`,
              subject: `Nouvelle Location ${order._id}`,
              html: payOrderEmailTemplate(order),
            },
            (error, body) => {
              if (error) {
                console.log(error);
              } else {
                console.log(body);
              }
            }
            );
            res.send({message : 'Louer Payer' , order : updateOrder});
        }else{
            res.status(404).send({message : 'Logement non trouvée'});
        }
    })
);

orderRouter.post('/' , 
    isAuth , 
    expressAsyncHandler(async (req, res) =>{
        if(req.body.orderItems.length === 0){
            res.status(400).send({
                message:'La liste est vide'
            });
        }else{
            const order = new Order({
                seller : req.body.orderItems[0].seller,
                orderItems : req.body.orderItems,
                shippingAddress : req.body.shippingAddress,
                paymentMethod : req.body.paymentMethod,
                itemsPrice : req.body.itemsPrice,
                taxPrice : req.body.taxPrice,
                totalPrice : req.body.totalPrice,
                shippingPrice : req.body.shippingPrice,
                user : req.user._id ,
            });
            const createdOrder = await order.save();
            res.status(201).send({
                message:'New Order created' , order :createdOrder});
        }
    })
);

orderRouter.delete('/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if(order){
            const deleteOrder = await order.remove();
            res.send({message :'Order deleted successfully' , order:deleteOrder});
        }else{
            res.status(404).send({message:'order not found'});
        }
    })
);

orderRouter.put('/:id/busy',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if(order){
            order.busy= true;
            order.busyAt= Date.now();

            const updateOrder = await order.save();
            res.send({message :'Logement Occuper ' , order :updateOrder});
        }else{
            res.status(404).send({message :'Logment non trouvé'});
        }
    })
);



export default orderRouter;