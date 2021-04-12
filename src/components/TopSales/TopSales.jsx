import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Preloader from '../Preloader/Preloader';
import MessageDialog from '../MessageDialog/MessageDialog';
import List from '../List/List';
import fetchData from '../../api/fetch';

export default function TopSales() {
  const topSalesState = useSelector((state) => state.topSalesReducer);
  const dispatch = useDispatch();

  async function getTopSales() {
    dispatch({ type: 'TOPSALES_REQUEST' });
    const urlTopSales = `${process.env.REACT_APP_SERVER_URL}top-sales`;
    const opts = { method: 'GET' };
    fetchData(urlTopSales, opts).then((topSalesData) => {
      dispatch({ type: 'TOPSALES_REQUEST_SUCCESS', payload: { topSalesData } });
    }).catch((e) => {
      const detailedError = JSON.parse(e.message);
      dispatch({ type: 'TOPSALES_REQUEST_FAILURE', payload: { errorText: detailedError.text } });
    });
  }

  useEffect(() => {
    getTopSales();
  }, [dispatch]);

  return (
    (topSalesState.topSalesData.length
      || topSalesState.loadingStatus
      || topSalesState.errorText) && (
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {topSalesState.loadingStatus && <Preloader />}
        {topSalesState.errorText && (
          <MessageDialog
            content={{ type: 'error', text: topSalesState.errorText }}
            onClick={() => getTopSales()}
          />
        )}
        <List data={topSalesState.topSalesData} />
      </section>
    )
  );
}
