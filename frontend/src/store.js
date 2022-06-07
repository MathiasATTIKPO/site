import { createStore , compose , applyMiddleware, combineReducers} from  'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/CartReducers';
import { orderCreateReducer, orderDeleteReducer, orderDetailReducer, orderMineListReducer, orderPayReducer, ordersListReducer, orderUpdateReducer } from './reducers/orderReducers';
import {productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer , productUpdateReducer} from './reducers/productReducers'
import { userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer , userUpdateProfileReducer, userUpdateReducer} from './reducers/userReducers';

const initialState = {

  userSignin:{ 
    userInfo: localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')
    ):null,
  },
  cart: {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
      shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
      paymentMethod :'PayPal',
    },
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate : productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    cart : cartReducer,
    userSignin : userSigninReducer , 
    userRegister: userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    orderCreate : orderCreateReducer,
    orderDetail : orderDetailReducer,
    orderPay : orderPayReducer,
    orderMineList: orderMineListReducer,
    ordersList:ordersListReducer,
    orderDelete: orderDeleteReducer,
    orderUpdate: orderUpdateReducer,
    
    
    
}) 

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;