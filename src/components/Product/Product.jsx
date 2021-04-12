import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import fetchData from '../../api/fetch';
import Preloader from '../Preloader/Preloader';
import MessageDialog from '../MessageDialog/MessageDialog';
import noimagesplash from '../../img/no-image-icon-23487.png';

export default function Product(props) {
  const { match } = props;
  const history = useHistory();
  const productState = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const id = parseInt(match.params.id, 10);
  const availableSizes = productState.product && (Object.prototype.hasOwnProperty.call(productState.product, 'sizes')
    && Array.isArray(productState.product.sizes))
    ? productState.product.sizes.filter((value) => value.avalible)
    : null;

  async function getProduct() {
    dispatch({ type: 'PRODUCT_REQUEST' });
    const urlCatalog = `${process.env.REACT_APP_SERVER_URL}items`;
    const opts = { method: 'GET' };
    fetchData(`${urlCatalog}/${id}`, opts).then((product) => {
      dispatch({ type: 'PRODUCT_REQUEST_SUCCESS', payload: { product } });
    }).catch((e) => {
      const detailedError = JSON.parse(e.message);
      if (detailedError.code === 404) dispatch({ type: 'PRODUCT_REQUEST_FAILURE', payload: { errorText: 'Товар недоступен для заказа', repeatAction: false } });
      else dispatch({ type: 'PRODUCT_REQUEST_FAILURE', payload: { errorText: detailedError.text, repeatAction: true } });
    });
  }

  useEffect(() => {
    getProduct();
  }, [dispatch, id]);

  const onIncrease = () => (productState.count >= 10
    ? dispatch({ type: 'PRODUCT_COUNT', payload: { count: 10 } })
    : dispatch({ type: 'PRODUCT_COUNT', payload: { count: productState.count + 1 } }));

  const onDecrease = () => (productState.count <= 1
    ? dispatch({ type: 'PRODUCT_COUNT', payload: { count: 1 } })
    : dispatch({ type: 'PRODUCT_COUNT', payload: { count: productState.count - 1 } }));

  const onSelectSize = (size) => {
    dispatch({ type: 'PRODUCT_SIZE', payload: { size } });
  };

  const onAddCartPosition = () => {
    const cartProduct = {
      id: productState.product.id,
      title: productState.product.title,
      size: productState.size,
      count: productState.count,
      price: productState.product.price,
    };
    dispatch({ type: 'CART_ADD_POSITION', payload: { cartProduct } });
    dispatch({ type: 'ORDER_INIT' });
    history.push('/cart');
  };

  const onImageError = (event) => {
    const e = event;
    e.target.src = noimagesplash;
  };

  return (
    <>
      {productState.loadingStatus && <Preloader />}
      {productState.errorText && (
        productState.repeatAction
          ? (
            <MessageDialog
              content={{ type: 'error', text: productState.errorText }}
              onClick={() => getProduct()}
            />
          )
          : (
            <MessageDialog
              content={{ type: 'error', text: productState.errorText }}
            />
          )
      )}
      {(!productState.loadingStatus && productState.product) && (
        <section className="catalog-item">
          <h2 className="text-center">{productState.product.title}</h2>
          <div className="row">
            <div className="col-5">
              <img
                src={productState.product.images[0]}
                className="img-fluid"
                alt={productState.product.title}
                onError={onImageError}
              />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{productState.product.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{productState.product.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{productState.product.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{productState.product.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{productState.product.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{productState.product.reason}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>
                  Размеры в наличии:&nbsp;
                  {(availableSizes && availableSizes.length > 0)
                    ? availableSizes.map((value) => (
                      <span
                        key={value.size}
                        className={cn({
                          'catalog-item-size': true,
                          selected: value.size === productState.size,
                        })}
                        onClick={() => onSelectSize(value.size)}
                        onKeyPress={() => onSelectSize(value.size)}
                        role="button"
                        tabIndex="0"
                      >
                        {value.size}
                      </span>
                    ))
                    : '-'}
                </p>
                {(availableSizes && availableSizes.length > 0) && (
                  <p>
                    Количество:
                    <span className="btn-group btn-group-sm pl-2">
                      <button type="button" className="btn btn-secondary" onClick={onDecrease}>-</button>
                      <span className="btn btn-outline-primary">{productState.count}</span>
                      <button type="button" className="btn btn-secondary" onClick={onIncrease}>+</button>
                    </span>
                  </p>
                )}
              </div>
              {(availableSizes && availableSizes.length > 0)
                && (
                  <button
                    type="button"
                    className="btn btn-danger btn-block btn-lg"
                    disabled={!productState.size}
                    onClick={onAddCartPosition}
                  >
                    В корзину
                  </button>
                )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
};
