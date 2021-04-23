import { createOrder } from '../api/requests';
import { cartLocalStorageClear } from './cartAction';

export const orderInit = () => ({ type: 'ORDER_INIT' });
export const orderRequestStarted = () => ({ type: 'ORDER_REQUEST' });
export const orderRequestSuccess = () => ({ type: 'ORDER_REQUEST_SUCCESS' });
export const orderRequestFailure = (errorText) => ({ type: 'ORDER_REQUEST_FAILURE', payload: { errorText } });
export const orderPhone = (id, value) => ({ type: 'ORDER_PHONE', payload: { [id]: value } });
export const orderAddress = (id, value) => ({ type: 'ORDER_ADDRESS', payload: { [id]: value } });
export const orderAgreement = (id, status) => ({ type: 'ORDER_AGREEMENT', payload: { [id]: status } });

export const orderRequest = (phone, address, cartData) => async (dispatch) => {
  dispatch(orderRequestStarted());
  try {
    await createOrder(phone, address, cartData);
    dispatch(orderRequestSuccess());
    dispatch(cartLocalStorageClear());
  } catch (e) {
    const detailedError = JSON.parse(e.message);
    dispatch(orderRequestFailure(detailedError.text));
  }
};
