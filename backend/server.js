import express from 'express';
import  Mongoose  from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
 dotenv.config();
Mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/SITE',{
    userNewUrlParser: true ,
    useUnifiedTopology:true ,
    useCreateIndex:true ,
});

 
 app.use('/api/users' , userRouter);
 app.use('/api/products' , productRouter);
 app.use('api/order' , orderRouter);
 app.get('/',(req , res) =>{
     res.send('Serveur pret');
 });

app.use((err, req, res , next) =>{
    res.status(500).send({message: err.message});
})
const port =process.env.PORT || 5000;
 app.listen(port,()=>{
     console.log(`Server at http://localhost:${port}`);
 });

 
 