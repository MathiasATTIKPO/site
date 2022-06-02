import{
    USER_SIGNIN_REQUEST , 
    USER_SIGNIN_SUCCESS , 
    USER_SIGNIN_FAIL, 
    USER_SIGNOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
} from '../constant/userConstants'

export const userSigninReducer =(state ={} , action) =>{
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading : true};
        case USER_SIGNIN_SUCCESS: 
            return{loading:false , userInfo : action.payload};
        case USER_SIGNIN_FAIL: 
            return {loading : false , error : action.payload};
        case USER_SIGNOUT:
            return {loading : false , userInfo : action.payload};
        default:
            return state ;
    }
};

export const userRegisterReducer =(state ={} , action) =>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading : true};
        case USER_REGISTER_SUCCESS: 
            return{loading:false , userInfo : action.payload};
        case USER_REGISTER_FAIL: 
            return {loading : false , error : action.payload};
        default:
            return state ;
    }
};

export const userDetailsReducer = (state = {loading :true}, action) =>{
    switch(action.type){
        case USER_DETAIL_REQUEST:
            return {loading : true};
        case USER_DETAIL_SUCCESS:
            return {loading : false , user : action.payload}
        case USER_DETAIL_FAIL:
            return {loading :false , error : action.payload}
        default:
            return state ;
    }
};

export const userUpdateProfileReducer = (state ={ loading :true}, action) =>{
    switch(action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading : true };
        case USER_UPDATE_PROFILE_SUCCESS:
            return{loading :false , success : action.payload};
        case USER_UPDATE_PROFILE_FAIL:
            return {loading : false , error : action.payload};
        case USER_UPDATE_PROFILE_RESET:
            return {};
        default: 
            return state;
    }
};