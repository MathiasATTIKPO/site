import React, { useEffect, useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import {Link }from 'react-router-dom';
import { createReview, detailsProduct } from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import Rating from '../../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../../constant/productConstante';


export default function ProductScreen(props){
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;const userSignin = useSelector((state) => state.userSignin);
    const{ userInfo} = userSignin;
    const  productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
        loading : loadingReviewCreate,
        error : errorReviewCreate,
        success : successReviewCreate,
    }= productReviewCreate;

    const [rating , setRating] = useState(0);
    const [comment , setComment] = useState('');

    useEffect (() =>{
        if(successReviewCreate){
            window.alert("Noté reçu...");
            setRating('');
            setComment('');
            dispatch({type: PRODUCT_REVIEW_CREATE_RESET});
        }
        dispatch(detailsProduct(productId));
    } ,[dispatch, productId , successReviewCreate]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(comment && rating){
            dispatch(
                createReview( productId,{ rating , comment , name: userInfo.name})
            );
        }else{
            alert('Entrez un commentaire et une note');
        }
    };
    
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}`);
      };
    return(
        
    <div>
        {loading ? (
        <LoadingBox></LoadingBox>
        ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
        ) : (
        <div>
            <Link to="/"> RETOUR  </Link>
            <div className="row top">
                <div className="col-2">
                    <a href={product.image}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="large"
                    ></img>
                    </a>
                </div>
                <div className="col-1" >
                    <ul>
                        <li> 
                           
                            <h1> {product.name} </h1>  
                         
                        </li>
                        <li>
                            <Rating 
                                rating= {product.rating} 
                                numReviews = {product.numReviews} 
                            ></Rating>
                        </li>
                        <li>
                            Prix:    
                                {product.prix}  XOF
                        </li>
                        <li>
                            Description:
                            <p>{product.description} </p>
                        </li>
                        <li>
                            <img 
                                src={product.image}
                                alt={product.name}
                                className="small"
                            ></img>
                        </li>
                        <li>
                            <a href="/image/"> Voir Plus</a>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="offre offre-body">
                        <ul>
                            <li>
                                Agence{' '}
                                <h2>
                                    <Link to={`/seller/${product.seller._id}`}>
                                        {product.seller.seller.name}
                                    </Link>
                                </h2>
                                <Rating
                                    rating={product.seller.seller.rating}
                                    numReviews={product.seller.seller.numReviews}
                                ></Rating>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        Prix:
                                    </div>
                                    <div className="prix"> 
                                         XOF  {product.prix}
                                    </div>
                                        
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div> Status :</div>
                                    <div>
                                        {product.countInStock ==="libre"? (<span className="success"> Libre </span>
                                        ):(
                                            <span className="danger"> Indisponible </span>)
                                        }
                                    </div>
                                </div>
                            </li>
                            {
                                product.countInStock ==="libre" &&(
                                        <>
                                            <li>
                                                <button
                                                    onClick={addToCartHandler}
                                                    className="primary block"
                                                >
                                                    Ajouter à la carte  
                                                </button>
                                            </li>
                                 </>
                                )     
                            }
                             
                        </ul>
                    </div>
                </div>
            </div>
            <div>
            <h2 id="reviews">Reviews</h2>
            {product.reviews.length === 0 && (
              <MessageBox>Vous n'avez âs encore donner votre appreciation</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Rédiger un avis client</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Note</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Mauvais</option>
                        <option value="2">2- Acceptable</option>
                        <option value="3">3- Bien</option>
                        <option value="4">4- Très bien</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Commentaire</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Envoyer
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    S'il vous plaît <Link to="/signin"> connectez-vous </Link> pour Noter
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
         )}
    </div>
       
    );
}