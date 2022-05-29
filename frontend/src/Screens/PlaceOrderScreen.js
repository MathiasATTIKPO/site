import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckOutStep from '../components/CheckOutStep';
import { ORDER_CREATE_RESET } from '../constant/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
export default function PlaceOrderScreen(props){
    const cart = useSelector((state) => state.cart);
    if(!cart.paymentMethod){
        props.history.push('/payement');
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const {loading , success , error , order} = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.prix , 0)
    );
    cart.shippingPrice = cart.itemsPrice > 1000? toPrice(0) : toPrice(100);
    cart.taxPrice = toPrice(0.15*cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
      dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };
    useEffect(() => {
      if (success) {
        props.history.push(`/order/${order._id}`);
        dispatch({ type: ORDER_CREATE_RESET });
      }
    }, [dispatch, order, props.history, success]);
    return(
      <div>
          <CheckOutStep step1 step2 step3 step4 ></CheckOutStep>
          <div className="row top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="offre offre-body">
                    <h2>Locataire</h2>
                    <p>
                      <strong>Nom : </strong>{ cart.shippingAddress.fullName } <br/>
                      <strong>Adresse : </strong> {cart.shippingAddress.adresse} , 
                      { cart.shippingAddress.ville} , {cart.shippingAddress.pays} ,  
                      {cart.shippingAddress.numero}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="offre offre-body">
                    <h2>paiment</h2>
                    <p>
                      <strong>Methode de Paiment :</strong>{ cart.paymentMethod } <br/>
                    </p>
                  </div>
                </li>
                <li>
                  <div className="offre offre-body">
                    <h2>Logement</h2>
                      <p>
                        <ul>
                          {
                            cart.cartItems.map((item) => (
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
                                </div>
                              </li>)
                            )
                          }
                        </ul>
                      </p>
                    </div>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="offre offre-body">
                <ul>
                  <li>
                    <h2>Récapitulatif de la locatiion</h2>
                  </li>
                  <li>
                    <div className="row">
                      <div>Loyer</div>
                      <div>XOF {cart.itemsPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Reduction</div>   
                      <div>XOF {cart.shippingPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Taxe</div>
                      <div>XOF {cart.taxPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>
                        <strong>Total Location</strong>
                      </div>
                      <div> 
                        <strong>XOF {cart.totalPrice.toFixed(2)}</strong>
                      </div>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={placeOrderHandler}
                      className="primary block"
                      disabled={cart.cartItems.length === 0}
                      >
                      Louer
                    </button>
                  </li>
                  {loading && <LoadingBox></LoadingBox>}
                  {error && <MessageBox variant="danger">{error}</MessageBox>}
                </ul>
              </div>
            </div>
          </div> 
        </div>
        
    )
}