import React , { useEffect ,useState } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { PRODUCT_UPDATE_RESET } from '../../constant/productConstante';
import { detailsProduct, updateProduct } from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

export default function ProductEditScreen(props) {
    const productId = props.match.params.id;
    const [ name , setName] = useState('');
    const [prix , setPrix] = useState('');
    const [nbreChbr, setNbreChbr] = useState('');
    const [image , setImages] = useState('');
    const [category , setCategory] = useState('');
    const [countInStock , setCountInStock] = useState('');
    const [description , setDescription] = useState('');
    
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: updateLoading, error: updateError, success: updateSuccess } = productUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (updateSuccess) {
          props.history.push('/productlist');
        }
        if (!product || product._id !== productId|| updateSuccess ) {
          dispatch({ type: PRODUCT_UPDATE_RESET });
          dispatch(detailsProduct(productId));
        } else {
          setName(product.name);
          setPrix(product.prix);
          setImages(product.image);
          setNbreChbr(product.nbreChbr);
          setCategory(product.category);
          setCountInStock(product.countInStock);
          setDescription(product.description);
        }
      },[product, dispatch, productId, updateSuccess, props.history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productId,
                name,
                prix,
                nbreChbr,
                image,
                category,
                countInStock,
                description,
            })
        );

    };
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    
    const uploadFileHandler= async (e)=>{
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads', bodyFormData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`,
              },
            });
            setImages(data);
            setLoadingUpload(false);
          } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
          }
    };

  return (
    <div>
        <form className="form" onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2> Modifier Logment {productId}</h2>
                </li>
                { updateLoading && <LoadingBox></LoadingBox>}
                {updateError && <MessageBox variant="danger">{updateError}</MessageBox>}
                {loading ? (<LoadingBox></LoadingBox>
                ) : error ? (<MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                    <li>
                            <label htmlFor="name">Nom</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <label htmlFor="prix">Prix</label>
                            <input
                                id="prix"
                                type="text"
                                value={prix}
                                onChange={(e) => setPrix(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <label htmlFor="image">Image</label>
                            <input
                                id="image"
                                type="text"
                                value={image}
                                onChange={(e) => setImages(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <label htmlFor="nbreChbr">Nombre de Chambre</label>
                            <input
                                id="nbreChbr"
                                type="text"
                                value={nbreChbr}
                                onChange={(e) => setNbreChbr(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <label htmlFor="imageFile">Image File</label>
                            <input
                                type="file"
                                id="imageFile"
                                label="Choisissez l'image"
                                onChange={uploadFileHandler}
                            ></input>
                               {loadingUpload && <LoadingBox></LoadingBox>}
                                {errorUpload && (
                                <MessageBox variant="danger">{errorUpload}</MessageBox>)}     
                        </li>
                        <li>
                            <label htmlFor="category">categories</label>
                            <select
                                id="category"
                                value={category}
                                 onChange={(e) => setCategory(e.target.value)}
                                >
                                <option value="">Select...</option>
                                <option value="Villa">Villa</option>
                                <option value="Appartement">Appartement</option>
                                <option value="2 Chambres">2 Chambres</option>
                                <option value="Chambre">Chambre</option>
                                <option value="Maison">Maison</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="countInStock">Disponibilité</label>
                            <input
                                id="countInStock"
                                type="text"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                rows="3"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </li>
                        <li>
                            <label></label>
                            <button className="primary" type="submit">
                                Modifier
                            </button>
                        </li>
                    </>
                )
            }
            </ul>
        </form>

    </div>
  )
}
