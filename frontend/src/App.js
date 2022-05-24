import React from 'react';
import { BrowserRouter  ,Route,Link
} from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux';
import HomeScreen from './Screens/HomeScreen.js';
import ProductScreen from './Screens/ProductScreen.js';
import CartScreen from './Screens/CartScreen.js';
import SearchBox from './components/SearchBox.js';
import SigninScreen from './Screens/SigninScreen.js';
import { signout } from './actions/userActions.js';
import RegisterScreen from './Screens/RegisterScreen.js';
import ShippingAdresseScreen from './Screens/ShippingAdresseScreen.js';
import PayementScreen from './Screens/PaymentScreen.js';
import PlaceOrderScreen from './Screens/PlaceOrderScreen.js';
import OrderScreen from './Screens/OrderScreen .js';




function App() {

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart ;
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
                <SearchBox   history={history}></SearchBox>
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
                      <Link to="#signout" onClick={signoutHandler}> Sign out</Link>
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
            <Route path='/cart/:id?' component={CartScreen}></Route>
            <Route  path='/product/:id' component={ProductScreen}></Route>
            <Route path='/signin' component={SigninScreen}></Route>
            <Route path='/shipping' component={ShippingAdresseScreen}></Route>
            <Route path='/payement' component={PayementScreen}></Route>
            <Route path='/register' component={RegisterScreen}></Route>
            <Route path='/placeOrder' component={PlaceOrderScreen}></Route>
            <Route path='/order/:id?' component={OrderScreen}></Route>

            <Route path='/' component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
           <h6> TOUTS LES DROITS SONT RESERVERS</h6> 
        </footer>
    </div>
    </BrowserRouter>
  );
}
export default App;
