import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

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
      alert("Password and Confirm Password are not matching");
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
        <div>
          <h1>Creer un nouveau compte</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            placeholder="Entrez votre "
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Entrez votre  email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Mots de Passes</label>
          <input
            type="password"
            id="password"
            placeholder="Entrez le Mots de Passes"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmez le Mots de Passes</label>
          <input
            type="password"
            id="confirmPassword "
            placeholder="Confirmez le Mots de Passes"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
              S'inscrire
          </button>
        </div>
        <div>
          <label />
          <div>
            Vous avez déja un compte?{' '}
            <Link to={`/signin?redirect=${redirect}`}>
              Se connecter
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
