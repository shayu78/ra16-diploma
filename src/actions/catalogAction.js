import { createCatalog } from '../api/requests';

export const catalogFirstPageRequestStarted = () => ({ type: 'CATALOG_FIRSTPAGE_REQUEST' });
export const catalogNextPageRequestStarted = () => ({ type: 'CATALOG_NEXTPAGE_REQUEST' });
export const catalogFirstPageRequestSuccess = (catalogData) => ({ type: 'CATALOG_FIRSTPAGE_REQUEST_SUCCESS', payload: { catalogData } });
export const catalogNextPageRequestSuccess = (catalogData) => ({ type: 'CATALOG_NEXTPAGE_REQUEST_SUCCESS', payload: { catalogData } });
export const catalogRequestFailure = (errorText) => ({ type: 'CATALOG_REQUEST_FAILURE', payload: { errorText } });

export const catalogRequest = (searchText, categoryId, offset) => async (dispatch) => {
  if (offset) dispatch(catalogNextPageRequestStarted());
  else dispatch(catalogFirstPageRequestStarted());
  createCatalog(searchText, categoryId, offset).then((catalogData) => {
    if (offset) dispatch(catalogNextPageRequestSuccess(catalogData));
    else dispatch(catalogFirstPageRequestSuccess(catalogData));
  }).catch((e) => {
    const detailedError = JSON.parse(e.message);
    dispatch(catalogRequestFailure(detailedError.text));
  });
};
