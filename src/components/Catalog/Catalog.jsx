import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Preloader from '../Preloader/Preloader';
import MessageDialog from '../MessageDialog/MessageDialog';
import Categories from '../Categories/Categories';
import SearchForm from '../SearchForm/SearchForm';
import List from '../List/List';
import { catalogRequest } from '../../actions/catalogAction';
import { catalogAndCategoriesRequest } from '../../actions/categoriesAction';
import { searchTextStatus } from '../../actions/searchAction';

export default function Catalog(props) {
  const { searchSupport } = props;
  const categoriesState = useSelector((state) => state.categoriesReducer);
  const catalogState = useSelector((state) => state.catalogReducer);
  const searchState = useSelector((state) => state.searchReducer);
  const searchText = searchSupport ? searchState.search : '';
  const dispatch = useDispatch();

  async function getCatalog(categoryId, offset = 0) {
    dispatch(catalogRequest(searchText, categoryId, offset));
  }

  async function getCatalogAndCategories(categoryId, offset = 0) {
    dispatch(catalogAndCategoriesRequest(searchText, categoryId, offset));
  }

  useEffect(() => {
    getCatalogAndCategories(categoriesState.activeCategory);
  }, [dispatch]);

  useEffect(() => {
    if (searchState.searchStatus) {
      getCatalog(categoriesState.activeCategory);
      dispatch(searchTextStatus(searchState.search, false));
    }
  }, [searchState.searchStatus]);

  const onCategoryChange = (id) => getCatalog(id);

  const loadData = (event) => {
    event.preventDefault();
    getCatalog(categoriesState.activeCategory, catalogState.catalogData.length);
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {searchSupport && <SearchForm />}
      {categoriesState.loadingStatus && <Preloader />}
      {categoriesState.errorText && (
        <MessageDialog
          content={{ type: 'error', text: categoriesState.errorText }}
          onClick={() => getCatalogAndCategories(categoriesState.activeCategory)}
        />
      )}
      {(!categoriesState.errorText && !categoriesState.loadingStatus)
        && <Categories onChange={onCategoryChange} />}
      {(catalogState.catalogData.length !== 0)
        ? <List data={catalogState.catalogData} />
        : (!catalogState.errorText && !catalogState.loadingStatus)
        && <p className="text-center text-muted">Поиск по вашему запросу не дал результатов</p>}
      {!categoriesState.loadingStatus && catalogState.loadingStatus && <Preloader />}
      {!categoriesState.errorText && catalogState.errorText && (
        <MessageDialog
          content={{ type: 'error', text: catalogState.errorText }}
          onClick={(event) => loadData(event)}
        />
      )}
      {(!catalogState.errorText && !catalogState.loadingStatus && catalogState.hasNextData) && (
        <div className="text-center">
          <button
            type="button"
            onClick={(event) => loadData(event)}
            className="btn btn-outline-primary"
            disabled={catalogState.loadingStatus}
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </section>
  );
}

Catalog.defaultProps = {
  searchSupport: true,
};

Catalog.propTypes = {
  searchSupport: PropTypes.bool,
};
