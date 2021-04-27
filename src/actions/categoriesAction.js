import { createCatalogAndCategories } from '../api/requests';
import {
  catalogFirstPageRequestStarted,
  catalogFirstPageRequestSuccess,
  catalogRequestFailure,
} from './catalogAction';

export const categoriesRequestStarted = () => ({ type: 'CATEGORIES_REQUEST' });
export const categoriesRequestSuccess = (categoriesData) => ({ type: 'CATEGORIES_REQUEST_SUCCESS', payload: { categoriesData } });
export const categoriesRequestFailure = (errorText) => ({ type: 'CATEGORIES_REQUEST_FAILURE', payload: { errorText } });
export const activeCategory = (id) => ({ type: 'ACTIVE_CATEGORY', payload: { activeCategory: id } });

export const catalogAndCategoriesRequest = (searchText, categoryId, offset) => async (dispatch) => {
  dispatch(categoriesRequestStarted());
  dispatch(catalogFirstPageRequestStarted());
  createCatalogAndCategories(searchText, categoryId, offset)
    .then(([categoriesData, catalogData]) => {
      dispatch(categoriesRequestSuccess(categoriesData));
      dispatch(catalogFirstPageRequestSuccess(catalogData));
    }).catch((e) => {
      const detailedError = JSON.parse(e.message);
      dispatch(categoriesRequestFailure(detailedError.text));
      dispatch(catalogRequestFailure(detailedError.text));
    });
};
