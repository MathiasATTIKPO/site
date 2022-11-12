import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { prix, ratings } from '../utils';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Product from '../components/Product';
import Rating from '../components/Rating';

export default function SearchScreen(props) {
    const {
        name = 'all',
        category = 'all',
        ville  = 'all',
        min =0,
        max =0 ,
        rating = 0,
        order = 'newest',
        pageNumber = 1 ,
    } = useParams();
    const dispatch = useDispatch();
    const productList = useSelector( (state) =>state.productList);
    const {loading , error , products ,page , pages} = productList ;

    const productCategoryList = useSelector( (state) =>state.productCategoryList);
    const {loading : loadingCategories , error: errorCategories , categories} = productCategoryList ;
    const productVilleList = useSelector( (state) => state.productVilleList);
    const {loading : loadingVille , error: errorVille , villes} = productVilleList ;
    useEffect(() => {
        dispatch( listProducts({
            pageNumber,
            name: name !== 'all' ? name :'',
            category: category !=='all' ? category :'',
            ville: ville !== 'all' ?ville :'',
            min , max,rating , order
        }))
    }, [category , ville , dispatch , max , min , name , order , rating , pageNumber]);

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || pageNumber;
        const filterName = filter.name || name;
        const filterCategory = filter.category || category;
        const filterVille    = filter.ville ||ville;
        const sortOrder = filter.order || order;
        const filterRating = filter.rating || rating;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/search/category/${filterCategory}/${filterVille}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
      };
  return (
    <div>
        <div className="row">
            {loading?(
                <LoadingBox></LoadingBox>)
                : error?(
                 <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div>{products.lenght} Resultats</div>
                )
            }
            <div>
                Sort by{''}
                <select value={order} onChange={(e)=>{
                    props.history.push(getFilterUrl({order:e.target.value}));
                }}>
                    <option value="newset">Nouveau</option>
                    <option value="lowest">Bas Prix</option>
                    <option value ="highest">Haut prix</option>
                    <option value ="toprated">Meilleur NOTE</option>
                </select>
            </div>
        </div>
        <div className="row top">
        <div className="col-1">
          <h3>Categories</h3>
          <div>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link
                    className={'all' === category ? 'active' : ''}
                    to={getFilterUrl({ category: 'all' })}
                  >
                    Toutes les categories
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === category ? 'active' : ''}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <h3>Villes</h3>
          <div>
            {loadingVille ? (
              <LoadingBox></LoadingBox>
            ) : errorVille ? (
              <MessageBox variant="danger">{errorVille}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link
                    className={'all' === ville ? 'active' : ''}
                    to={getFilterUrl({ ville: 'all' })}
                  >
                    Toutes les villes
                  </Link>
                </li>
                {villes.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === ville ? 'active' : ''}
                      to={getFilterUrl({ ville: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3>Prix</h3>
            <ul>
              {prix.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Appreciations</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'active' : ''}
                  >
                    <Rating caption={' & up'} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
              <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? 'active' : ''}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
        </div>
    </div>
  )
}
