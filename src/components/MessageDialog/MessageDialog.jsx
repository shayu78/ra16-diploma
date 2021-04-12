import React from 'react';
import PropTypes from 'prop-types';

export default function MessageDialog(props) {
  const { content, onClick } = props;

  const className = (content.type === 'error') ? 'alert alert-danger text-center' : 'alert alert-success text-center';

  return (
    <div className={className}>
      {content.title && <h2>{content.title}</h2>}
      <p>{content.text}</p>
      {onClick && (
        <button type="button" className="btn btn-outline-primary" onClick={onClick}>
          Повторить
        </button>
      )}
    </div>
  );
}

MessageDialog.defaultProps = {
  content: {
    type: 'info',
    title: '',
    text: '',
  },
  onClick: null,
};

MessageDialog.propTypes = {
  content: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func,
};
