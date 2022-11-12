import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

export default function RegisterScreen(props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
   ? props.location.search.split('=')[1]
  : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo , error ,loading} = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      alert("Le mots de passe  et  Confirme mots de passes ne sont pas les même");
    }
    else{
     
      dispatch(register(name , email, password));
    }
   
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
  }
  }, [props.history, redirect, userInfo]);
  
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
      <ul className="form-container">
        <li>
          <h2> Creer un nouveau compte</h2>
        </li>
        
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
        
        <li>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </li>
        <li>
        <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </li>
        <li>
        <label htmlFor="password">Mots de Passes</label>
          <input
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </li>
        <li>
        <label htmlFor="confirmPassword">Confirmez le Mots de Passes</label>
          <input
            type="password"
            id="confirmPassword "
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </li>
        <li>
        <label />
          <button className="primary" type="submit">
              S'inscrire
          </button>
        </li>
        <li>
        
            <Link to={`/signin?redirect=${redirect}`}>
            Vous avez déja un compte?
              Se connecter
            </Link>
        </li>
      </ul>
      </form>
    </div>
  );
}
