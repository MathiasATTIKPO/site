import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { detailOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderScreen(props){

    const orderId = props.match.params.id;
    const orderDetail = useSelector((state) => state.orderDetail);
    const { order,loading , error} = orderDetail;
    console.log('order information', order);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(detailOrder(orderId));
    }, [dispatch, orderId]);
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

                </ul>
              </div>
            </div>
          </div> 
        </div>
        
    )
}