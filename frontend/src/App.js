import React, { useEffect, useState } from 'react';
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
import ProductScreen from './Screens/productScreen/ProductScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import SearchScreen from './Screens/SearchScreen';
import DashboardScreen from './Screens/DashboardScreen';
import ChatBox from './components/ChatBox';
import SupportScreen from './Screens/SupportScreen';





function App()  {

  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <BrowserRouter >
    <div className="grid-container">
        <header className="row">
            <div>
              <button
                type="button"
                className="open-sidebar"
                onClick={() => setSidebarIsOpen(true)}
              >
              <i className="fa fa-bars"></i>
              </button>
                <Link className="brand" to="/">LOCA LOLI</Link>
            </div>
            <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div>
                <Link to="/cart"> 
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>  
                {cartItems.length > 0 && (
                    <span className ="badge">{cartItems.length}</span>
                )
                }
                </Link>
                {userInfo ?(
                  <div className="dropdown">
                    <Link to="#">{userInfo.name} <i class="fa fa-user-circle" aria-hidden="true"></i>{' '}</Link> 
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                        <Link to="/orderHistory">Historiques</Link>
                      </li>
                      <li>
                        <Link to="/" onClick={signoutHandler}>Se deconnecter</Link>
                      </li>
                    </ul>
                  </div>
                  ): 
                  (
                    <Link to="/signin">Se connecter</Link>
                  )
                }
                {userInfo && userInfo.isAdmin && (
                  <div className="dropdown">
                    <Link to="#admin">
                        Administrateur
                      </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/dashboard">
                          dashboard
                        </Link>
                      </li>
                      <li>
                        <Link to="/productlist">Logements</Link>
                      </li>
                      <li>
                          <Link to="/ordersList">Locations</Link>
                      </li>
                      <li>
                        <Link to="/userList"> Utilisateurs</Link>
                      </li>
                      <li>
                        <Link to="/support">Support</Link>
                      </li>
                    </ul>
                  </div>)}
                  {userInfo && userInfo.isSeller && (
                    <div className="dropdown">
                      <Link to="#admin">
                        Proprietaire
                      </Link>
                      <ul className="dropdown-content">
                        <li>
                          <Link to="/productList/seller/">Logements</Link>
                        </li>
                        <li>
                          <Link to="/orderlist/seller">Locations</Link>
                        </li>
                      </ul>
                    </div>)}
        </div>
      </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
            <Route path='/seller/:id' component={SellerScreen}></Route>
            <Route path='/cart/:id?' component={CartScreen}></Route>
            <Route  path='/product/:id' component={ProductScreen} exact></Route>
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
            <Route path="/search/name/:name?" component={SearchScreen} exact ></Route>
            <Route path="/search/category/:category" component={SearchScreen} exact ></Route>
            <Route path="/search/category/:category/name/:name"  component={SearchScreen}  exact ></Route>
            <Route  path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber" component={SearchScreen} exact></Route>
            <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
            <AdminRoute path="/productlist/pageNumber/:pageNumber" component={ProductListScreen} exact ></AdminRoute>
            <AdminRoute path='/ordersList' component={OrderListScreen} exact></AdminRoute>
            <AdminRoute path='/userList' component={UserListScreen} exact></AdminRoute>
            <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
            <AdminRoute path="/dashboard" component={DashboardScreen}></AdminRoute>
            <AdminRoute path="/support" component={SupportScreen}></AdminRoute>
            <SellerRoute path='/productlist/seller/:seller?' component={ProductListScreen}></SellerRoute>
            <SellerRoute path='/orderlist/seller' component={OrderListScreen}></SellerRoute>
            <Route path="/productAdmin/:id/edit" component={ProductEditScreen} ></Route>

            <Route path='/' component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>All right reserved</div>{' '}
        </footer>
      </div>
    </BrowserRouter>
  );
}
export default App;
