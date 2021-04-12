/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers } from 'redux';
import topSalesReducer from '../reducers/topSalesReducer';
import categoriesReducer from '../reducers/categoriesReducer';
import catalogReducer from '../reducers/catalogReducer';
import productReducer from '../reducers/productReducer';
import searchReducer from '../reducers/searchReducer';
import cartReducer from '../reducers/cartReducer';
import orderReducer from '../reducers/orderReducer';

const reducer = combineReducers({
  topSalesReducer,
  categoriesReducer,
  catalogReducer,
  productReducer,
  searchReducer,
  cartReducer,
  orderReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
