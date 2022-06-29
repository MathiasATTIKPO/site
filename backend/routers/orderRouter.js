import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";

const orderRouter = express.Router();

orderRouter.get('/',
    isAuth,
    isSellerOrAdmin, 
    expressAsyncHandler(async (req, res) => {
        const seller = req.body.seller || '';
        const sellerFilter = seller ? {seller} :{};
        const orders = await Order.find({...sellerFilter}).populate(
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