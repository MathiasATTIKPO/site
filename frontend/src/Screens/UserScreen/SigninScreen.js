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
        
        <ul className="form-container">
        <li>
          <h2>S'identifier</h2>
        </li>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">Mots de Passes</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">S'identifier</button>
        </li>
        <li>
           Nouveau utilisateur?{' '}
            <Link to={`/register?redirect=${redirect}`}>
              Creer mon compte
            </Link>
        </li>
      </ul>
        <div>
          <label />
          <div>
         
          </div>
        </div>
      </form>
    </div>
  );
}
