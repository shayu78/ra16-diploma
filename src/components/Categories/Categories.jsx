/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { activeCategory } from '../../actions/categoriesAction';

export default function Categories(props) {
  const { onChange } = props;
  const categoriesState = useSelector((state) => state.categoriesReducer);
  const dispatch = useDispatch();

  const onCategoryChange = (event, id) => {
    event.preventDefault();
    dispatch(activeCategory(id));
    onChange(id);
  };

  return (
    <ul className="catalog-categories nav justify-content-center">
      {categoriesState.categoriesData.map((value) => (
        <li className="nav-item" key={value.id}>
          <a
            className={cn({
              'nav-link': true,
              active: value.id === categoriesState.activeCategory,
            })}
            href=""
            onClick={(event) => onCategoryChange(event, value.id)}
          >
            {value.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

Categories.propTypes = {
  onChange: PropTypes.func.isRequired,
};
