import Axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { detailOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constant/orderConstants';

export default function OrderScreen(props){

    const orderId = props.match.params.id;
    const [sdkReady , setSdkReady ] = useState(false);
    const orderDetails = useSelector((state) => state.orderDetail);
    const { order,loading , error} = orderDetails;
    
    const orderPay = useSelector((state) => state.orderPay);
    const  { success: successPay , error: errorPay , loading: loadingPay}  = orderPay;
    const dispatch = useDispatch();

    useEffect(() => {
      const addPayPalScript = async () => {
        const { data } = await Axios.get('/api/config/paypal');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      };

      if(!order || successPay || (order && order._id !== orderId )){
        
        dispatch({type : ORDER_PAY_RESET});
        dispatch(detailOrder(orderId));
      } else {
        if (!order.isPaid) {
          if (!window.paypal) {
            addPayPalScript();
          } else {
            setSdkReady(true);
          }
        }
      }
    }, [dispatch, orderId, sdkReady , order , successPay ]);

    const successPaymentHandler = (payementResult) => {
        dispatch(payOrder(order , payementResult));
    }
    return loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <div>
          <h1> Location {order._id} </h1>
          <div className="row top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="offre offre-body">
                    <h2>Locataire</h2>
                    <p>
                      <strong>Nom : </strong>{order.shippingAddress.fullName } <br/>
                      <strong>Adresse : </strong> {order.shippingAddress.adresse} , 
                      { order.shippingAddress.ville} , {order.shippingAddress.pays} ,  
                      {order.shippingAddress.numero}
                    </p>
                    {order.busy? <MessageBox variant="success">Déja louer</MessageBox>
                    : <MessageBox variant="danger">Non Louer</MessageBox>}
                  </div>
                </li>
                <li>
                  <div className="offre offre-body">
                    <h2>paiment</h2>
                    <p>
                      <strong>Methode de Paiment :</strong>{ order.paymentMethod } <br/>
                    </p>
                    {order.isPaid? <MessageBox variant="success"> Louer payer le {order.paidAt}</MessageBox>
                    :<MessageBox variant="danger">Louer non payer</MessageBox>
                    }
                  </div>
                </li>
                <li>
                  <div className="offre offre-body">
                    <h2>Logement</h2>
                      <p>
                        <ul>
                          {
                            order.orderItems.map((item) => (
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
                      <div>XOF {order.itemsPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Reduction</div>   
                      <div>XOF {order.shippingPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Taxe</div>
                      <div>XOF {order.taxPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>
                        <strong>Total Location</strong>
                      </div>
                      <div> 
                        <strong>XOF {order.totalPrice.toFixed(2)}</strong>
                      </div>
                    </div>
                  </li>
                  {
                    !order.isPaid && (
                      <li>
                        { !sdkReady? (<LoadingBox></LoadingBox>
                        ):(
                        <>
                        {errorPay &&(<MessageBox variant="danger">{errorPay}</MessageBox>
                        )}
                        {loadingPay &&(<LoadingBox></LoadingBox>)}
                        <PayPalButton 
                          amount={order.totalPrice}  
                          onSuccess={successPaymentHandler}
                          ></PayPalButton>
                        </>
                        )}
                      </li>
                    )
                  }
                </ul>
              </div>
            </div>
          </div> 
        </div>
        
    )
}