/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Preloader from '../Preloader/Preloader';
import MessageDialog from '../MessageDialog/MessageDialog';
import fetchData from '../../api/fetch';

export default function Order() {
  const orderState = useSelector((state) => state.orderReducer);
  const cartState = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  async function setOrder() {
    dispatch({ type: 'ORDER_REQUEST' });
    const urlOrder = `${process.env.REACT_APP_SERVER_URL}order`;
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        owner: {
          phone: orderState.phone,
          address: orderState.address,
        },
        items: cartState.cartData.map((item) => ({
          id: item.id,
          price: item.price,
          count: item.count,
        })),
      }),
    };
    fetchData(urlOrder, opts).then(() => {
      dispatch({ type: 'ORDER_REQUEST_SUCCESS' });
      dispatch({ type: 'CART_LOCALSTORAGE_CLEAR' });
    }).catch((e) => {
      const detailedError = JSON.parse(e.message);
      dispatch({ type: 'ORDER_REQUEST_FAILURE', payload: { errorText: detailedError.text } });
    });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setOrder();
  };

  const onChangePhone = (event) => {
    const { id, value } = event.target;
    dispatch({ type: 'ORDER_PHONE', payload: { [id]: value } });
  };

  const onChangeAddress = (event) => {
    const { id, value } = event.target;
    dispatch({ type: 'ORDER_ADDRESS', payload: { [id]: value } });
  };

  const onChangeAgreement = (event) => {
    const { id } = event.target;
    const status = event.target.checked;
    dispatch({ type: 'ORDER_AGREEMENT', payload: { [id]: status } });
  };

  return (
    (orderState.operationResult) ? (
      <MessageDialog
        content={{
          title: 'Ваш заказ принят в обработку',
          text: 'Наш сотрудник свяжется с Вами для завершения оформления заказа',
        }}
      />
    ) : (
      <section className="order">
        {orderState.loadingStatus && <Preloader />}
        {orderState.errorText && (
          <MessageDialog
            content={{ type: 'error', text: orderState.errorText }}
          />
        )}
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
          <form className="card-body" onSubmit={(event) => onSubmit(event)}>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Ваш телефон"
                value={orderState.phone}
                onChange={(event) => onChangePhone(event)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input
                className="form-control"
                id="address"
                name="address"
                placeholder="Адрес доставки"
                value={orderState.address}
                onChange={(event) => onChangeAddress(event)}
                required
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreement"
                checked={orderState.agreement}
                onChange={(event) => onChangeAgreement(event)}
              />
              <label
                className="form-check-label"
                htmlFor="agreement"
              >
                Согласен с правилами доставки
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-outline-secondary"
              disabled={!orderState.agreement
                || orderState.loadingStatus
                || !cartState.cartData.length}
            >
              Оформить
            </button>
          </form>
        </div>
      </section>
    )
  );
}
