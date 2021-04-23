import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartDeletePosition } from '../../actions/cartAction';

export default function Cart() {
  const cartState = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const onDeleteCartPosition = (id, size) => dispatch(cartDeletePosition(id, size));

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {cartState.cartData.map((value, index) => (
            <tr key={`${value.id}${value.size}`}>
              <th scope="row">{index + 1}</th>
              <td><Link to={`/catalog/${value.id}`}>{value.title}</Link></td>
              <td>{value.size}</td>
              <td>{value.count}</td>
              <td>
                {value.price}
                {' '}
                руб.
              </td>
              <td>
                {value.price * value.count}
                {' '}
                руб.
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onDeleteCartPosition(value.id, value.size)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="5" className="text-right">Общая стоимость</td>
            <td>
              {cartState.cartData.reduce((accumulator, { price, count }) => accumulator
                + price * count, 0)}
              {' '}
              руб.
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
