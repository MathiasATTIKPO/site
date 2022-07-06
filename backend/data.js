import bcrypt from 'bcryptjs';

const data ={
    users: [
        {
          name: 'ATTIKPO',
          email: 'admin@example.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: true,
          isSeller: true,
          seller: {
            name: 'ATTIKPO',
            photo: '/images/b4.png',
            description: 'best seller',
            rating: 4.5,
            numReviews: 120,
            },
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
        prix :50000,
        countInStock: "libre",
        rating: 4.5,
        numReviews :10,
        description:'trop cool',
    },
    {
        
        name:'Maison de classe',
        category: 'Appartement',
        image:'/images/2.jpg',
        prix :60000,
        countInStock: "libre",
        rating: 4.5,
        numReviews :10,
        description:'trop cool',
    },
    {
        
        name:'Maison  luxe',
        category: 'Villa',
        image:'/images/3.jpg',
        prix :45000,
        countInStock: "libre",
        rating: 4,
        numReviews :10,
        description:'trop cool',
    },
    {
       
        name:'Maison top luxe',
        category: 'Apparetement',
        image:'/images/4.jpg',
        prix :35000,
        countInStock: "libre",
        rating: 4,
        numReviews :10,
        description:'trop cool',
    },
    {
       
        name:'Maison a la prairi',
        category: 'campagne',
        image:'/images/5.jpg',
        prix : 75000,
        countInStock: "libre",
        rating: 4.5,
        numReviews :10,
        description:'trop cool',
    },
    {
       
        name:'Maison en bois',
        category: 'Villa',
        image:'/images/6.jpg',
        prix :45000,
        countInStock: "libre",
        rating: 2.5,
        numReviews :10 ,
        description:'trop cool',
    },
    ],
};
export default data ;