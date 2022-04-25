import express from 'express';
import  Mongoose  from 'mongoose';
import data from './data.js';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
 const app = express();

Mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/SITE',{
    userNewUrlParser: true ,
    useUnifiedTopology:true ,
    useCreateIndex:true ,
});

 
 app.use('/api/users' , userRouter);
 app.use('/api/products' , productRouter);
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

 
 