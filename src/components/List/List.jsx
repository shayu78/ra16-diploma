import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';

export default function List(props) {
  const { data } = props;
  return (
    <div className="row">
      {(data) && data.map((value) => <Card data={value} key={value.id} />)}
    </div>
  );
}

List.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
};
