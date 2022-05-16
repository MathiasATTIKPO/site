import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import { Link} from 'react-router-dom';


export default function CartScreen(props){
    const productId = props.match.params.id;
    const dispatch = useDispatch();
    const cart = useSelector(state =>state.cart);
    const {cartItems} = cart ;
        useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId));
    }
  }, [dispatch, productId]);

    const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };
     const checkoutHandler =()=>{
         props.history.push('/signin?redirec=shipping')
     };
    return (
        <div className="row top">
            <div className="col-2">
                <h1> Site à visiter</h1>
                {cartItems.length ===0? <MessageBox>
                    La Liste est vite . <Link to="/"> Accueil</Link>
                </MessageBox>
                 :(
                    <ul>
                        {
                            cartItems.map((item) => (
                                <li key={item.product} >
                                    <div className="row">
                                        <div>
                                            <img src={item.image}
                                                alt={item.name}
                                                className="small"
                                            ></img>
                                        </div>
                                        <div className="min-30">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            {item.prix} XOF 
                                        </div>
                                        <div>
                                            <button type="button" onClick={() => removeFromCartHandler(item.product)}>
                                                Annuler
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            )
                            )
                        }
                    </ul>
                )
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                           <button 
                                type="button" 
                                onClick={checkoutHandler} 
                                className="primary block" 
                                disabled={cartItems.length===0}>
                                     Confirmer la visite 
                             </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}