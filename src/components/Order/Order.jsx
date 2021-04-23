/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Preloader from '../Preloader/Preloader';
import MessageDialog from '../MessageDialog/MessageDialog';
import {
  orderRequest,
  orderPhone,
  orderAddress,
  orderAgreement,
} from '../../actions/orderAction';

export default function Order() {
  const orderState = useSelector((state) => state.orderReducer);
  const cartState = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  async function setOrder() {
    dispatch(orderRequest(orderState.phone, orderState.address, cartState.cartData));
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setOrder();
  };

  const onChangePhone = (event) => {
    const { id, value } = event.target;
    dispatch(orderPhone(id, value));
  };

  const onChangeAddress = (event) => {
    const { id, value } = event.target;
    dispatch(orderAddress(id, value));
  };

  const onChangeAgreement = (event) => {
    const { id } = event.target;
    const status = event.target.checked;
    dispatch(orderAgreement(id, status));
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
                type="tel"
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
