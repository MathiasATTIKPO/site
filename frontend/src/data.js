import bcrypt from 'bcryptjs';

const data ={
    users: [
        {
          name: 'ATTIKPO',
          email: 'admin@example.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: true,
        },
        {
          name: 'mathias',
          email: 'user@example.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: false,
        },
      ],
    products :[
    {
        
        name:'Maison de luxe',
        category: 'Campagne',
        image:'/images/1.jpg',
        prix :52000000,
        countInStock: "libre",
        rating: 4.5,
        numReviews :10,
        description:'trop cool',
    },
    {
        
        name:'Maison de classe',
        category: 'Appartement',
        image:'/images/2.jpg',
        prix :12800000,
        countInStock: "libre",
        rating: 4.5,
        numReviews :10,
        description:'trop cool',
    },
    {
        
        name:'Maison  luxe',
        category: 'Villa',
        image:'/images/3.jpg',
        prix :78400000,
        countInStock: "libre",
        rating: 4,
        numReviews :10,
        description:'trop cool',
    },
    {
       
        name:'Maison top luxe',
        category: 'Apparetement',
        image:'/images/4.jpg',
        prix :96400000,
        countInStock: "libre",
        rating: 4,
        numReviews :10,
        description:'trop cool',
    },
    {
       
        name:'Maison a la prairi',
        category: 'campagne',
        image:'/images/5.jpg',
        prix : 345800000,
        countInStock: "libre",
        rating: 4.5,
        numReviews :10,
        description:'trop cool',
    },
    {
       
        name:'Maison en bois',
        category: 'Villa',
        image:'/images/6.jpg',
        prix :486800000,
        countInStock: "libre",
        rating: 2.5,
        numReviews :10 ,
        description:'trop cool',
    },
],
};
export default data ;