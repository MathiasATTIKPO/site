import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions.js';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';

export default function OrderHistoryScreen(props) {
    const orderMineList = useSelector(state => state.orderMineList);
    const { loading , error , orders} = orderMineList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch]);

  return (
      
    <div>
        <h1>Historique de Location</h1>
        {loading ? <LoadingBox></LoadingBox>
        : error?<MessageBox variant="danger"> {error}</MessageBox>
        :(
            <table className="table">
                <thead> 
                    <tr>
                        <th>DATE</th>
                        <th>LOYER</th>
                        <th>PAYER</th>
                        <th>OCCUPER</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.createdAt.substring(0 , 10)}</td>
                            <td>{order.totalPrice.toFixed(0)}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0, 10):'NON'}</td>
                            <td>{order.busy ? order.busy:'NON'}</td>
                            <td>
                                <button type="button" className="small" onClick={() => {props.history.push(`/order/${order._id}`)}}>
                                    Details
                                </button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        )
        }

    </div>
  )
}
