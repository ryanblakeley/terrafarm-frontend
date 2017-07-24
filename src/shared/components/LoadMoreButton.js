/*
import PropTypes from 'prop-types';
import React from 'react';
import Layout from './Layout';
import {FlatButton} from './Material';

const propTypes = {
  disabled: PropTypes.bool,
  increment: PropTypes.number,
  label: PropTypes.string,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const LoadMoreButton = props => {
  const incrementCount = () => {
    const newCount = props.location.query.count > 3
      ? props.location.query.count + props.increment
      : 8;
    const newQuery = Object.assign({}, props.location.query, {count: newCount});
    const newLocation = Object.assign({}, props.location, {query: newQuery});

    props.router.replace(newLocation);
  };

  return <Layout center topSmall>
    <FlatButton
      label={props.label}
      onClick={incrementCount}
      onTouchTap={incrementCount}
      disabled={props.disabled}
    />
  </Layout>;
};

LoadMoreButton.propTypes = propTypes;

LoadMoreButton.defaultProps = {
  increment: 8,
  label: 'Load more...',
};

export default LoadMoreButton;
*/
