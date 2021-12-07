import express from 'express';
import  Mongoose  from 'mongoose';
import data from './data.js';
import userRouter from './routers/userRouter.js';
 const app = express();

// Mongoose.connect('mongodb://localhost/site',{
//     userNewUrlParser: true ,
//     useUnifiedTopology:true ,
//     useCreateIndex:true ,
// });

app.get('/api/users',userRouter); 

app.get('/api/products/:id',(req , res ) => {
    const product = data.products.find((x)=> x._id === req.params.id);
    if(product){
        res.send(product);
    }else{
       res.status(404).send({ message :'Site deja occupé ' });
    }
});
 app.get('/api/products', (req , res)=>{
    res.send(data.products);
 });
 app.use('/api/users' , userRouter);
 app.get('/',(req , res) =>{
     res.send('Serveur pret');

 });
const port =process.env.PORT || 5000;
 app.listen(port,()=>{
     console.log(`Server at http://localhost:${port}`);
 });

 
 