/* eslint-disable no-underscore-dangle */
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
