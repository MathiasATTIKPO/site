import bcryptjs from 'bcryptjs';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';


const userRouter = express.Router();

userRouter.get('/seed',
    expressAsyncHandler (async (req, res) => {
    //await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  }
));

userRouter.post('/signin' ,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({ email: req.body.email });
      if(user) {
        if(bcryptjs.compareSync(req.body.password , user.password)){
          res.send({
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          });
          return;
        }
      }
      res.status(401).send({message: 'Invalid email or password'});
    })
)

export default userRouter;
 