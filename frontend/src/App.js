import React from 'react';
import { BrowserRouter  ,Route,Link
} from "react-router-dom";
import AdminRoute from './components/AdminRoute';
import {useDispatch, useSelector } from 'react-redux';
import HomeScreen from './Screens/HomeScreen.js';
import ProductScreen from './Screens/ProductScreen.js';
import ProductAdminScreen from './Screens/ProductAdminScreen.js';
import CartScreen from './Screens/CartScreen.js';
//import SearchBox from './components/SearchBox.js';
import SigninScreen from './Screens/SigninScreen.js';
import { signout } from './actions/userActions.js';
import RegisterScreen from './Screens/RegisterScreen.js';
import ShippingAdresseScreen from './Screens/ShippingAdresseScreen.js';
import PayementScreen from './Screens/PaymentScreen.js';
import PlaceOrderScreen from './Screens/PlaceOrderScreen.js';
import OrderScreen from './Screens/OrderScreen .js';
import OrderHistoryScreen from './Screens/OrderHistoryScreen.js';
import ProfileScreen from './Screens/ProfileScreen.js';
import ProductListScreen from './Screens/ProductListScreen.js';
import ProductEditScreen from './Screens/ProductEditScreen';
import OrderListScreen from './Screens/OrderListScreen';
import UserListScreen from './Screens/UserListScreen';
import UserEditScreen from './Screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './Screens/SellerScreen';
import ImageScreen from './Screens/ImageScreen';




function App() {

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart ;
    const userSignin = useSelector((state) => state.userSignin);
    //const userRegister = useSelector((state) => state.userRegister);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () =>{
      dispatch(signout());
    }

  return (
    <BrowserRouter >
    <div className="grid-container">
        <header className="row">
            <div>
                <Link className="brand" to="/"> LOCA LOLI  </Link>
            </div>
            <div>
                <Link to="/cart"> CARTES  
                {cartItems.length > 0 && (
                    <span className ="badge">{cartItems.length}</span>
                )
                }
                </Link>
                {
                  userInfo ?(

                  <div className="dropdown">
                    <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i>{' '}</Link> 
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                        <Link to="/orderHistory"> Historiques</Link>
                      </li>
                      
                      <li>
                          {userInfo && userInfo.isAdmin && (
                             <ul>
                              <li>
                              <Link to="#admin">
                                Administrateur 
                              </Link>
                              </li>
                              <li>
                                  <Link to="/productlist">Logements</Link>
                              </li>
                              <li>
                                  <Link to="/ordersList">Loactions</Link>
                              </li>
                              <li>
                                <Link to="/userList"> Utilisateurs</Link>
                              </li>
                              </ul>
                          )}
                          
                      </li>
                            {userInfo && userInfo.isSeller && (
                              <ul>
                              <li>
                                <Link to="#admin">
                                    Proprietaire
                                </Link>
                              </li>
                              <li>
                                <Link to="/productlist/seller">Logements</Link>
                              </li>
                              <li>
                                <Link to="/orderlist/seller">Locations</Link>
                              </li>
                              </ul>
                            )}
                      <li>
                      </li>
                      <li>
                        <Link to="/" onClick={signoutHandler}>Se deconnecter</Link>
                      </li>
                    </ul>
                  </div>
                  ): 
                  (
                    <Link to="/signin">SE CONNECTER</Link>
                  )
                }
                
                
            </div>
        </header>
        <main>
            <Route path="/seller/:id" component={SellerScreen}></Route>
            <Route path='/cart/:id?' component={CartScreen}></Route>
            <Route  path='/product/:id' component={ProductScreen}></Route>
            <Route  path='/productAdmin/:id' component={ProductAdminScreen}></Route>
            <Route path='/signin' component={SigninScreen}></Route>
            <Route path='/shipping' component={ShippingAdresseScreen}></Route>
            <Route path='/payement' component={PayementScreen}></Route>
            <Route path='/register' component={RegisterScreen}></Route>
            <Route path='/placeOrder' component={PlaceOrderScreen}></Route>
            <Route path='/order/:id?' component={OrderScreen}></Route>
            <Route path='/orderHistory' component={OrderHistoryScreen}></Route>
            <Route path='/profile' component={ProfileScreen}></Route>
            <Route path='/image' component={ImageScreen}></Route>
            <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
            <AdminRoute path='/ordersList' component={OrderListScreen} exact></AdminRoute>
            <AdminRoute path='/userList' component={UserListScreen} exact></AdminRoute>
            <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>

            <SellerRoute path='/productlist/seller' component={ProductListScreen}></SellerRoute>
            <SellerRoute path='/orderlist/seller' component={OrderListScreen}></SellerRoute>
            <Route
              path="/productAdmin/:id/edit"
              component={ProductEditScreen}
              exact></Route>

            <Route path='/' component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin /* && <ChatBox userInfo={userInfo} />*/
          }
           <h6> TOUTS LES DROITS SONT RESERVERS</h6> 
        </footer>
    </div>
    </BrowserRouter>
  );
}
export default App;
