import React from 'react';
import Layout from './Layout';
import {FlatButton} from './Material';

const LoadMoreButton = (props, context) => {
  const incrementCount = () => {
    const newCount = context.location.query.count > 3
      ? context.location.query.count + props.increment
      : 8;
    const newQuery = Object.assign(context.location.query, {count: newCount});
    const newLocation = Object.assign(context.location, {query: newQuery});

    context.router.replace(newLocation);
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

LoadMoreButton.propTypes = {
  disabled: React.PropTypes.bool,
  increment: React.PropTypes.number,
  label: React.PropTypes.string,
};

LoadMoreButton.contextTypes = {
  location: React.PropTypes.object,
  router: React.PropTypes.object,
};

LoadMoreButton.defaultProps = {
  increment: 8,
  label: 'Load more...',
};

export default LoadMoreButton;
