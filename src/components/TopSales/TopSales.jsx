import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Preloader from '../Preloader/Preloader';
import MessageDialog from '../MessageDialog/MessageDialog';
import List from '../List/List';
import { topSalesRequest } from '../../actions/topSalesAction';

export default function TopSales() {
  const topSalesState = useSelector((state) => state.topSalesReducer);
  const dispatch = useDispatch();

  async function getTopSales() {
    dispatch(topSalesRequest());
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
