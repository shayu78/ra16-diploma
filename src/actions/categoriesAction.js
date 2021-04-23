export const categoriesRequest = () => ({ type: 'CATEGORIES_REQUEST' });
export const categoriesRequestSuccess = (categoriesData) => ({ type: 'CATEGORIES_REQUEST_SUCCESS', payload: { categoriesData } });
export const categoriesRequestFailure = (errorText) => ({ type: 'CATEGORIES_REQUEST_FAILURE', payload: { errorText } });
export const activeCategory = (id) => ({ type: 'ACTIVE_CATEGORY', payload: { activeCategory: id } });
