import Axios from "axios";
import { CART_EMPTY } from "../constant/CartConstants";
import { 
  ORDER_CREATE_FAIL, 
  ORDER_CREATE_REQUEST, 
  ORDER_CREATE_SUCCESS, 
  ORDER_DETAIL_FAIL, 
  ORDER_DETAIL_REQUEST, 
  ORDER_DETAIL_SUCCESS, 
  ORDER_PAY_FAIL, 
  ORDER_PAY_REQUEST, 
  ORDER_PAY_SUCCESS,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_FAIL, 
  ORDER_MINE_LIST_SUCCESS, 
  ORDER_LIST_REQUEST,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_SUCCESS,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_SUCCESS} from "../constant/orderConstants"

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.post('/api/orders', order, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
      dispatch({ type: CART_EMPTY });
      localStorage.removeItem('cartItems');
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const detailOrder = (orderId) => async (dispatch , getState) => {
  dispatch({ type: ORDER_DETAIL_REQUEST , payload: orderId});
  const{ userSignin : {userInfo}  } = getState();
  try{
    const {data} = await Axios.get(`/api/orders/${orderId}` ,{
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: ORDER_DETAIL_SUCCESS ,
      payload: data,
    });

  }catch(error){
    const  message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message ;

    dispatch({
      type: ORDER_DETAIL_FAIL,
      payload: message 
    });
  }
};

export const payOrder = (order , payementResult) => async (dispatch , getState) => {
  dispatch({
    type :ORDER_PAY_REQUEST ,
    payload:{ order, payementResult}, 
  });
  const {
    userSignin : { userInfo }, 
  } = getState();
  try{
    const {data} = await Axios.put(`/api/orders/${order._id}/pay` , payementResult , {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: ORDER_PAY_SUCCESS ,
      payload: data,
    });
  }catch(error){
    const  message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message ;

    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message 
    });
  }
};

export const  listOrderMine =() => async (dispatch , getState) => {
  dispatch({type:ORDER_MINE_LIST_REQUEST});
  const { userSignin : { userInfo } ,} = getState();
  try {
    const { data } = await Axios.get('/api/orders/mine', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
  }catch (error){
    const  message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message ;

    dispatch({type:ORDER_MINE_LIST_FAIL, payload: message});

  }
};

export const listOrders = ({ seller = '' }) => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/orders?seller=${seller}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_LIST_FAIL, payload: message });
  }
};

export const deleteOrder = (orderId) => async (dispatch , getState) =>{
  dispatch({type:ORDER_DELETE_REQUEST});
  const{ userSignin : { userInfo }}= getState();
  try{
    const {data} = await Axios.delete(`api/orders/${orderId}` , {
      headers: { Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({type:ORDER_DELETE_SUCCESS , payload: data});
  }catch(error){
    const message = error.response&& error.response.data.message
    ? error.response.data.message
    :error.message ;
    dispatch({type:ORDER_DELETE_FAIL , payload: message});
  }
};

export const updateOrder = (orderId) => async(dispatch , getState)=>{
  dispatch({type:ORDER_UPDATE_REQUEST , payload: orderId});
  const{ userSignin : { userInfo },}= getState();
  try{
    const { data} = await Axios.put(`/api/orders/${orderId}/busy`,{} , {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ type:ORDER_UPDATE_SUCCESS , payload : data});
  }catch (error) {
    const  message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message ;
    dispatch({type:ORDER_UPDATE_FAIL , payload:message});
  }
};
