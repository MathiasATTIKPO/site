import React, { useEffect} from 'react';
import Image from '../components/Image';
import LoadingBox from'../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function ImageScreen() {
    const productList = useSelector( (state) =>state.productList);
    const {loading , error , products}= productList;
    const dispatch = useDispatch();
     useEffect(() =>{ 
        dispatch(listProducts());
     }, [dispatch]);
    return(
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ): error ? (
          <MessageBox  variant="danger">{error}</MessageBox>
        ) :(
         <div className="row center">
         {products.map((product)=>(
             < Image key= {product._id} ></Image>
           ))}
       </div>
        )}
      </div>
   );
}
