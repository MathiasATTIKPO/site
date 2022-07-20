import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../../constant/userConstants';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [sellerPhoto, setSellerPhoto] = useState('');
    const [sellerDescription, setSellerDescription] = useState('');


    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
    const userDetails =useSelector((state) => state.userDetails);
    const { loading , error , user} = userDetails; 
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { loading : loadingUpdate , 
        error: errorUpdate , 
        success: successUpdate 
    } = userUpdateProfile;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo.id));
          } else {
            setName(user.name);
            setEmail(user.email);
            if (user.seller) {
                setSellerName(user.seller.name);
                setSellerPhoto(user.seller.photo);
                setSellerDescription(user.seller.description);
              }
        }
    },[dispatch, userInfo.id , user]);
    const submitHandler =(e)=>{
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and Confirm Password Are Not Matched');
        } else {
            dispatch(updateUserProfile({
                userId: user._id,
                name,
                email, 
                password,
                sellerName,
                sellerPhoto,
                sellerDescription,
            })
            );
        }
    };
  return (
    <div>
        <form className="form" onSubmit={submitHandler}>
            <div>Profile Utilisateur</div>
                {
                    loading ? (<LoadingBox></LoadingBox>): error ?(
                    <MessageBox variant="danger">{error}</MessageBox>)
                    : (<>
                        {loadingUpdate && <LoadingBox></LoadingBox>}
                        {errorUpdate && (
                            <MessageBox variant="danger">{errorUpdate}</MessageBox>
                        )}
                        {successUpdate && (
                            <MessageBox variant="success">
                            Profile Mise à Jour avec Succes
                        </MessageBox>
                        )}
                         <div>
                            <label htmlFor="name">Nom</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="password">Mots de Passes</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Entrez Mots de Passes "
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirmé le  Mots de Passes</label>
                            <input
                                type="password"
                                id="confirmPassword "
                                placeholder="Confirmé le  Mots de Passes"
                                onChange={(e) => setConfirmPassword(e.target.value)}                              
                            ></input>
                        </div>
                        {user.isSeller && (
              <>
                <h2>Seller</h2>
                <div>
                  <label htmlFor="sellerName">Nom</label>
                  <input
                    id="sellerName"
                    type="text"
                    placeholder="Entrer le Nom"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerLogo">Photo</label>
                  <input
                    id="sellerLogo"
                    type="text"
                    placeholder="Enter Seller Logo"
                    value={sellerPhoto}
                    onChange={(e) => setSellerPhoto(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerDescription"> Description</label>
                  <input
                    id="sellerDescription"
                    type="text"
                    placeholder="Enter Seller Description"
                    value={sellerDescription}
                    onChange={(e) => setSellerDescription(e.target.value)}
                  ></input>
                </div>
              </>
            )}
                        <div>
                            <label />
                            <button className="primary" type="submit">
                                Modifier
                            </button>
                        </div>
                    </>
                    )}
        </form>
    </div>
  )
}
