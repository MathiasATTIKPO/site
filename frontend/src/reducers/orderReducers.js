import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_RESET, ORDER_DELETE_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_RESET, ORDER_LIST_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS, ORDER_UPDATE_FAIL, ORDER_UPDATE_REQUEST, ORDER_UPDATE_RESET, ORDER_UPDATE_SUCCESS } from "../constant/orderConstants";

export const orderCreateReducer = (state ={} , action) => {
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return{loading : true} ;
        case ORDER_CREATE_SUCCESS:
            return {loading: false , success:true , order: action.payload} ;
        case ORDER_CREATE_FAIL:
            return {loading : false , error: action.payload} ;
        case ORDER_CREATE_RESET :
            return {};
        default:
            return state;
    }
};

export const orderDetailReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case ORDER_DETAIL_REQUEST:
        return { loading: true };
      case ORDER_DETAIL_SUCCESS:
        return { loading: false, order: action.payload };
      case ORDER_DETAIL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

export const orderPayReducer = (state ={}, action) =>{
    switch(action.type){
        case ORDER_PAY_REQUEST:
            return {loading:true};
        case ORDER_PAY_SUCCESS:
            return {loading:false , success:true};
        case ORDER_PAY_FAIL :
            return {loading :false , error: action.payload}
        case ORDER_PAY_RESET:
            return{}
        default:
            return state;
    }
};

export const orderMineListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_MINE_LIST_REQUEST:
        return { loading: true };
      case ORDER_MINE_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case ORDER_MINE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const ordersListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return { loading: true };
      case ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      case ORDER_LIST_RESET:
        return {};
      default:
        return state;
    }
  };
  export const orderDeleteReducer = (state ={}, action) =>{
    switch (action.type) {
      case ORDER_DELETE_REQUEST:
        return {loading : true};
      case ORDER_DELETE_SUCCESS:
        return {loading:false ,  success: true };
      case ORDER_DELETE_FAIL:
        return {loading : false , error : action.payload};
      case ORDER_DELETE_RESET :
        return{};
      default: return state;
    }
  };

  export const orderUpdateReducer = (state ={}, action) =>{
    switch (action.type) {
      case ORDER_UPDATE_REQUEST:
        return {loading : true};
      case ORDER_UPDATE_SUCCESS:
        return {loading:false ,  success: true };
      case ORDER_UPDATE_FAIL:
        return {loading : false , error : action.payload};
      case ORDER_UPDATE_RESET :
        return{};
      default: return state;
    }
  };