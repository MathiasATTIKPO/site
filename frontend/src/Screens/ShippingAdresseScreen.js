import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { saveShippingAdresse } from "../actions/cartActions";
import CheckOutStep from "../components/CheckOutStep";

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
                <div>
                    <h1> Shipping Adresse</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Nom complet</label>
                    <input type="text" id="fullName" placeholder="Nom Complet" required value={fullName} onChange={(e) => setFullName(e.target.value)} ></input>
                </div>
                <div>
                    <label htmlFor="adresse">Adresse</label>
                        <input type="text" id="adresse" placeholder="Entrez votre Adresse"  required value={adresse} onChange={(e) => setAdresse(e.target.value)} ></input>
                </div>
                <div>
                    <label htmlFor="ville">Ville</label>
                        <input type="text" id="ville" placeholder="Entrez votre ville" required  value={ville} onChange={(e) => setVille(e.target.value)} ></input>
                </div>
                <div>
                    <label htmlFor="country">Votre Pays</label>
                        <input type="text" id="country" placeholder="Entrez le pays"  required value={pays} onChange={(e) => setPays(e.target.value)} ></input>
                </div>
                <div>
                    <label htmlFor="telephone">Numero</label>
                        <input type="text" id="telephone" placeholder="numero" required value={numero} onChange={(e) => setNumero(e.target.value)} ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    );
}