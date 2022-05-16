import Axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESSE } from '../constant/CartConstants';

export const addToCart = (productId) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/${productId}`);
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          name: data.name,
          image: data.image,
          prix: data.prix,
          countInStock: data.countInStock,
          product: data._id,
          //seller: data.seller,
        },
      });
      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      );  
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAdresse = (data) => (dispatch)=>{
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESSE, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
  
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};