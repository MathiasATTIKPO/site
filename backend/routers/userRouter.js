import bcrypt from 'bcryptjs';
import bcryptjs from 'bcryptjs';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';


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
            isSeller : user.isSeller,
            token: generateToken(user),
          });
          return;
        }
      }
      res.status(401).send({message: 'Invalid email or password'});
    })
)

userRouter.post('/register' , expressAsyncHandler(async(req, res) => {
  const user = new User({name: req.body.name , email: req.body.email ,
  password: bcrypt.hashSync(req.body.password , 8) ,
  });
  const createdUser = await user.save();
  res.send({
    id: createdUser.id,
    email: createdUser.email,
    name: createdUser.name,
    isAdmin: createdUser.isAdmin,
    token: generateToken(createdUser),
  })
}));

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.put('/profile',
  isAuth,
  expressAsyncHandler(async (req, res) =>{
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller = Boolean(req.body.isSeller);
      user.isAdmin = Boolean(req.body.isAdmin);
      // user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save();
      res.send({ message: 'Utilisateur mise à jour', user: updatedUser });
    } else {
      res.status(404).send({ message: 'Utilisateur non trouvé' });
    }
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Impossible de supprimer cet utilisateur' });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: 'Utilisateur supprimer', user: deleteUser });
    } else {
      res.status(404).send({ message: 'Utilisateur non trouvé' });
    }
  })
);
export default userRouter;
 