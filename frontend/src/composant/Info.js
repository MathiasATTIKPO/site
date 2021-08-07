import React from 'react';

export default function info(props) {
  const { info, numReviews, caption } = props;
  return (
    <div className="info">
      <span>
        <i
          className={
            info >= 1
              ? 'fa fa-star'
              : info >= 0.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            info >= 2
              ? 'fa fa-star'
              : info >= 1.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            info >= 3
              ? 'fa fa-star'
              : info >= 2.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            info >= 4
              ? 'fa fa-star'
              : info >= 3.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            info >= 5
              ? 'fa fa-star'
              : info >= 4.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{numReviews + ' reviews'}</span>
      )}
    </div>
  );
}
