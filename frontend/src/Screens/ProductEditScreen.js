import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox'

export default function ProductEditScreen(props) {
    const productId = props.match.params.id;
    const [ name , setName] = useState('');
    const [prix , setPrix] = useState('');
    const [image , setImage] = useState('');
    const [category , setCategory] = useState('');
    const [countInStock , setCountInStock] = useState('');
    const [description , setDescription] = useState('');
    
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const dispatch = useDispatch();
    useEffect(() => {
        /* if (successUpdate) {
          props.history.push('/productlist');
        }*/
        if (!product || product._id !== productId ) {
          //dispatch({ type: PRODUCT_UPDATE_RESET });
          dispatch(detailsProduct(productId));
        } else {
          setName(product.name);
          setPrix(product.prix);
          setImage(product.image);
          setCategory(product.category);
          setCountInStock(product.countInStock);
          setDescription(product.description);
        }
      }, [product, dispatch, productId]);

    const submitHandler = (e) => {

    };
    const uploadFileHandler=(e)=>{};

  return (
    <div>
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h1> Modifier Logment {productId}</h1>
            </div>
            {loading ? (<LoadingBox></LoadingBox>
            ) : error ? (<MessageBox variant="danger">{error}</MessageBox>
            ) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="prix">Prix</label>
                            <input
                                id="prix"
                                type="text"
                                placeholder="Enter price"
                                value={prix}
                                onChange={(e) => setPrix(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="image">Image</label>
                            <input
                                id="image"
                                type="text"
                                placeholder="Enter image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="imageFile">Image File</label>
                            <input
                                type="file"
                                id="imageFile"
                                label="Choose Image"
                                onChange={uploadFileHandler}
                            ></input>
                            {/*
                                {loadingUpload && <LoadingBox></LoadingBox>}
                                {errorUpload && (
                                <MessageBox variant="danger">{errorUpload}</MessageBox>
                                )}
                            */}              
                        </div>
                        <div>
                            <label htmlFor="category">Category</label>
                            <input
                                id="category"
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="countInStock">Count In Stock</label>
                            <input
                                id="countInStock"
                                type="text"
                                placeholder="Enter countInStock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                rows="3"
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label></label>
                            <button className="primary" type="submit">
                                Update
                            </button>
                        </div>
                    </>
                )
            }

        </form>

    </div>
  )
}
