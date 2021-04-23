export const catalogFirstPageRequest = () => ({ type: 'CATALOG_FIRSTPAGE_REQUEST' });
export const catalogNextPageRequest = () => ({ type: 'CATALOG_NEXTPAGE_REQUEST' });
export const catalogFirstPageRequestSuccess = (catalogData) => ({ type: 'CATALOG_FIRSTPAGE_REQUEST_SUCCESS', payload: { catalogData } });
export const catalogNextPageRequestSuccess = (catalogData) => ({ type: 'CATALOG_NEXTPAGE_REQUEST_SUCCESS', payload: { catalogData } });
export const catalogRequestFailure = (errorText) => ({ type: 'CATALOG_REQUEST_FAILURE', payload: { errorText } });
