import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { savePaymentMethod } from '../actions/CartActions';
import CheckOutStep from '../components/CheckOutStep';


export default function PayementScreen(props) {
    //const cart = useSelector(state => state.cart);
    const [paymentMethod , setPaymentMethod] = useState('PayPal' , 'Tmoney' , 'Flooz');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
    };
    return(
        <div>
            <CheckOutStep step1 step2 step3 ></CheckOutStep>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Methode de Paiement</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" name="paymentMethod" id="tmoney" value="Tmoney" 
                         checked onChange={(e) => setPaymentMethod(e.target.checked)}/>
                        <label htmlFor="paymentMethod">Tmoney</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" name="paymentMethod" id="flooz" value="Flooz" 
                         checked onChange={(e) => setPaymentMethod(e.target.checked)}/>
                        <label htmlFor="paymentMethod">Flooz</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" name="paymentMethod" id="paypal" value="paypal" 
                         checked onChange={(e) => setPaymentMethod(e.target.checked)}/>
                        <label htmlFor="paymentMethod">PayPal</label>
                    </div>
                </div>
                <div>
                <label />
                    <button className="primary" type="submit">
                        Continue
                    </button>
                </div>

            </form>
        </div>
    );
}