import React from 'react';
import { BrowserRouter  ,Route
} from "react-router-dom";
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';


function App() {
  return (
    <BrowserRouter >
    <div className="grid-container">
        <header className="row">
            <div>
                <a className="brand" href="/">CHEZ MOI </a>
            </div>
            <div>
                <a href="/offre">NOS OFFRES</a>
                <a href="/se_connecter">SE CONNECTER</a>
            </div>
        </header>
        <main>
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
