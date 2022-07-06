import React, { useEffect} from 'react';
import Product from '../components/Product';
import LoadingBox from'../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';

    export default function HomeScreen(){
     const productList = useSelector( (state) =>state.productList);
     const {loading , error , products}= productList;
     const userTopSellersList = useSelector((state) => state.userTopSellersList);
     const {
      loading: loadingSellers,
      error: errorSellers,
      users: sellers,
     } = userTopSellersList;

     const dispatch = useDispatch();
      useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
     return(
       <div>
        <h2>Nos Agences</h2>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>Aucun Proprietaire trouver</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.photo} alt={seller.seller.name} className="medium2" />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )}
      <h2>Les Logements</h2>
         {loading ? (
           <LoadingBox></LoadingBox>
         ): error ? (
           <MessageBox  variant="danger">{error}</MessageBox>
         ) :(
          <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
         )}
       </div>
    );
  }

