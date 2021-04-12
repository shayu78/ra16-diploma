import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function SearchForm() {
  const searchState = useSelector((state) => state.searchReducer);
  const dispatch = useDispatch();

  const onInputChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: 'SEARCH_FIELD_CHANGE', payload: { field: name, value } });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'SEARCH_TEXT_STATUS', payload: { search: searchState.search, searchStatus: true } });
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={onSubmit}>
      <input className="form-control" name="search" placeholder="Поиск" value={searchState.search} onChange={onInputChange} />
    </form>
  );
}
