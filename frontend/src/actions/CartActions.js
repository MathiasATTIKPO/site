import Axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constante/CartConstants';

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
