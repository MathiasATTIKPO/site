import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();


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
                user : req.body.user._id ,
            });
            const createdOrder = await order.save();
            res.status(201).send({
                message:'New Order created' , order :createdOrder});
        }
    })
);

export default orderRouter;