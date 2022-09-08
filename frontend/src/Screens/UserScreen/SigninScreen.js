import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
   ? props.location.search.split('=')[1]
  : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo , error ,loading} = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
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
          <h1>Identification</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <input
            type="email"
            id="email"
            placeholder="Entrez votre email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Entrez votre mots de Passes"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Connexion
          </button>
        </div>
        <div>
          <label />
          <div>
           Nouveau utilisateur?{' '}
            <Link to={`/register?redirect=${redirect}`}>
              Creer mon compte
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
