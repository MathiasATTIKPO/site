import React from 'react';
import { BrowserRouter  ,Route,Link
} from "react-router-dom";
import AdminRoute from './components/AdminRoute';
import {useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import SearchBox from './components/SearchBox';
import SellerRoute from './components/SellerRoute';
import OrderListScreen from './Screens/orderScreen/OrderListScreen';
import ProductListScreen from './Screens/productScreen/ProductListScreen';
import UserEditScreen from './Screens/UserScreen/UserEditScreen';
import UserListScreen from './Screens/UserScreen/UserListScreen';
import ImageScreen from './Screens/ImageScreen';
import ProfileScreen from './Screens/UserScreen/ProfileScreen';
import OrderHistoryScreen from './Screens/orderScreen/OrderHistoryScreen';
import OrderScreen from './Screens/orderScreen/OrderScreen ';
import PlaceOrderScreen from './Screens/orderScreen/PlaceOrderScreen';
import RegisterScreen from './Screens/UserScreen/RegisterScreen';
import PayementScreen from './Screens/orderScreen/PaymentScreen';
import ShippingAdresseScreen from './Screens/productScreen/ShippingAdresseScreen';
import SigninScreen from './Screens/UserScreen/SigninScreen';
import ProductAdminScreen from './Screens/productScreen/ProductAdminScreen';
import ProductEditScreen from './Screens/productScreen/ProductEditScreen';
import CartScreen from './Screens/CartScreen';
import SellerScreen from './Screens/SellerScreen';
import HomeScreen from './Screens/HomeScreen';




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
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
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
            <Route path='/seller/:id' component={SellerScreen}></Route>
            <Route path='/cart/:id?' component={CartScreen}></Route>
            <Route  path='/product/:id' component={ProductEditScreen}></Route>
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
