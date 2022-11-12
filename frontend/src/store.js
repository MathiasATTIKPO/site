import { createStore , compose , applyMiddleware, combineReducers} from  'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/CartReducers';
import { orderCreateReducer, orderDeleteReducer, orderDetailReducer, orderMineListReducer, orderPayReducer, ordersListReducer, orderSummaryReducer, orderUpdateReducer } from './reducers/orderReducers';
import {productCategoryListReducer, productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer , productReviewCreateReducer, productUpdateReducer, productVilleListReducer} from './reducers/productReducers'
import { userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer , userUpdateProfileReducer, userUpdateReducer ,userTopSellerListReducer, userSellerListReducer} from './reducers/userReducers';

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
    productCategoryList: productCategoryListReducer,
    productVilleList : productVilleListReducer,
    productReviewCreate: productReviewCreateReducer,
    cart : cartReducer,
    userSignin : userSigninReducer , 
    userRegister: userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    userTopSellersList: userTopSellerListReducer,
    userSellersList: userSellerListReducer,
    orderCreate : orderCreateReducer,
    orderDetail : orderDetailReducer,
    orderPay : orderPayReducer,
    orderMineList: orderMineListReducer,
    ordersList:ordersListReducer,
    orderDelete: orderDeleteReducer,
    orderUpdate: orderUpdateReducer, 
    orderSummary : orderSummaryReducer, 
        
}) 

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;