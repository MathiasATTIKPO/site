import React from 'react';
import { BrowserRouter  ,Route,Link
} from "react-router-dom";
import {useSelector } from 'react-redux';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
//import SigninScreen from './Screens/SigninScreen';



function App() {

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart ;
    //const userSignin = useSelector((state) => state.userSignin);
    //const { userInfo } = userSignin;
  return (
    <BrowserRouter >
    <div className="grid-container">
        <header className="row">
            <div>
                <Link className="brand" to="/"> LOCA LOLI  </Link>
            </div>
            <div>
                <Link to="/offre"> CARTES  
                {cartItems.length > 0 && (
                    <span className ="badge">{cartItems.length}</span>
                )
                }
                </Link>
                <Link to="/se_connecter">SE CONNECTER</Link>
            </div>
        </header>
        <main>
            <Route path='/cart/:id?' component={CartScreen}></Route>
            <Route  path='/product/:id' component={ProductScreen}></Route>
            <Route path='/' component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
            TOUTS LES DROITS SONT RESERVERS 
        </footer>
    </div>
    </BrowserRouter>
  );
}
export default App;
