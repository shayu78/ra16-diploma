import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import noimagesplash from '../../img/no-image-icon-23487.png';

export default function Card(props) {
  const { data } = props;

  const onImageError = (event) => {
    const e = event;
    e.target.src = noimagesplash;
  };

  return (
    <div className="col-4">
      <div className="card">
        <div className="card-img-wrapper">
          <img
            src={data.images[0]}
            className="card-img-top img-fluid"
            alt={data.title}
            onError={onImageError}
          />
        </div>
        <div className="card-body">
          <p className="card-text">{data.title}</p>
          <p className="card-text">
            {data.price}
            {' '}
            руб.
          </p>
          <Link to={`/catalog/${data.id}`} className="btn btn-outline-primary">Заказать</Link>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};
