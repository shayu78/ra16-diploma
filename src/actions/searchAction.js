export const searchFieldChange = (name, value) => ({ type: 'SEARCH_FIELD_CHANGE', payload: { field: name, value } });
export const searchTextStatus = (searchText, status) => ({ type: 'SEARCH_TEXT_STATUS', payload: { search: searchText, searchStatus: status } });
