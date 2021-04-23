import { createTopSales } from '../api/requests';

export const topSalesRequestStarted = () => ({ type: 'TOPSALES_REQUEST' });
export const topSalesRequestSuccess = (topSalesData) => ({ type: 'TOPSALES_REQUEST_SUCCESS', payload: { topSalesData } });
export const topSalesRequestFailure = (errorText) => ({ type: 'TOPSALES_REQUEST_FAILURE', payload: { errorText } });

export const topSalesRequest = () => async (dispatch) => {
  dispatch(topSalesRequestStarted());
  try {
    const data = await createTopSales();
    dispatch(topSalesRequestSuccess(data));
  } catch (e) {
    const detailedError = JSON.parse(e.message);
    dispatch(topSalesRequestFailure(detailedError.text));
  }
};
