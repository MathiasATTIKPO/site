import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../../actions/orderActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { ORDER_DELETE_RESET } from '../../constant/orderConstants';

export default function OrderListScreen(props) {
    
    const sellerMode = props.match.path.indexOf('/seller') >= 0;
    const dispatch = useDispatch();
    const ordersList = useSelector((state) => state.ordersList)
    const {loading , error , orders} = ordersList;

    const orderDelete = useSelector((state) => state.orderDelete);
    const {loading : loadingDelete , error : errorDelete , success : successDelete} = orderDelete;

    const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

    useEffect(() =>{
        if (successDelete) {
            dispatch({ type: ORDER_DELETE_RESET });
          }
          dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }));
        }, [dispatch, sellerMode, successDelete, userInfo._id]);

    const deleteHandler=(order)=> {
        if (window.confirm('Voulez vous vraiment supprimer?')) {
            dispatch(deleteOrder(order._id));
        }
    };
  return (
    <div>
        <h1>Order Listes</h1>
        { loadingDelete&&<LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? (
        <LoadingBox></LoadingBox>
        ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
        ) : (
        <>
        <table className="table">
            <thead>
                <th> ID </th>
                <th>Locataire </th>
                <th>Agences </th>
                <th> Date </th>
                <th> Total </th>
                <th> Payer</th>
                <th> Occuper</th>
                <th> Actions </th>
            </thead>
            <tbody>
                {orders.map((order)=>(
                    <tr key={order.id}>
                        <td>{order._id}</td>
                        <td>{order.user.name}</td>
                        <td>{order.seller._id}</td>
                        <td>{order.createdAt.substring(0,10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                            {order.paidAt
                            ? order.paidAt.substring(0,10)
                            : 'NON'}
                        </td>
                        <td>{order.busy
                        ? 'oui': 'non'}</td>
                        <td>
                            <button
                                type="button"
                                className="small"
                                onClick={() => {
                                props.history.push(`/order/${order._id}`);
                            }}>
                                Details
                            </button>
                            <button
                                type="button"
                                className="small"
                                onClick={() => deleteHandler(order)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>)}
    </div>
  )
}
