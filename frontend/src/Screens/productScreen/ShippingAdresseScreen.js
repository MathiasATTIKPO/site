import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { saveShippingAdresse } from "../../actions/CartActions";
import CheckOutStep from "../../components/CheckOutStep";


export default function ShippingAdresseScreen (props){
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
    
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;
    if(!userInfo){
        props.history.push('/signin');
    }
    const [fullName ,  setFullName ] =useState(shippingAddress.fullName);
    const [adresse ,  setAdresse] = useState(shippingAddress.adresse);
    const [ville ,  setVille ] =useState(shippingAddress.ville);
    const [pays ,  setPays ] =useState(shippingAddress.pays);
    const [numero ,  setNumero ] =useState(shippingAddress.numero);
    const dispatch =useDispatch();
   
    const submitHandler = (e) => { 
        e.preventDefault();
        dispatch(
            saveShippingAdresse(
                {fullName , 
                adresse , 
                ville  , 
                pays , 
                numero})
            );
        props.history.push('/payement');
    };

    return(
        <div>
            <CheckOutStep step1 step2></CheckOutStep>
            <form className="form" onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Shipping</h2>
                    </li>
                    <li>
                        <label htmlFor="fullName">Nom complet</label>
                        <input type="text" id="fullName"  required value={fullName} onChange={(e) => setFullName(e.target.value)} ></input>      
                    </li>
                    <li>
                        <label htmlFor="adresse">Adresse</label>
                        <input type="text" id="adresse"  required value={adresse} onChange={(e) => setAdresse(e.target.value)} ></input>                
                    </li>
                    <li>
                        <label htmlFor="ville">Ville</label>
                        <input type="text" id="ville"  required  value={ville} onChange={(e) => setVille(e.target.value)} ></input>
                    </li>
                    <li>
                        <label htmlFor="country">Votre Pays</label>
                        <input type="text" id="country"  required value={pays} onChange={(e) => setPays(e.target.value)} ></input>
                    </li>
                    <li>
                        <label htmlFor="telephone">Numero</label>
                        <input type="text" id="telephone" required value={numero} onChange={(e) => setNumero(e.target.value)} ></input>
                    </li>
                    <li>
                        <button type="submit" className="primary">Continue</button>
                    </li>
                </ul>
            </form>
        </div>
    );
}