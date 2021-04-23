import { createProduct } from '../api/requests';

export const productRequestStarted = () => ({ type: 'PRODUCT_REQUEST' });
export const productRequestSuccess = (product) => ({ type: 'PRODUCT_REQUEST_SUCCESS', payload: { product } });
export const productRequestFailure = (errorText, repeatAction) => ({ type: 'PRODUCT_REQUEST_FAILURE', payload: { errorText, repeatAction } });
export const productCount = (count) => ({ type: 'PRODUCT_COUNT', payload: { count } });
export const productSize = (size) => ({ type: 'PRODUCT_SIZE', payload: { size } });

export const productRequest = (id) => async (dispatch) => {
  dispatch(productRequestStarted());
  try {
    const data = await createProduct(id);
    dispatch(productRequestSuccess(data));
  } catch (e) {
    const detailedError = JSON.parse(e.message);
    if (detailedError.code === 404) dispatch(productRequestFailure('Товар недоступен для заказа', false));
    else dispatch(productRequestFailure(detailedError.text, true));
  }
};
