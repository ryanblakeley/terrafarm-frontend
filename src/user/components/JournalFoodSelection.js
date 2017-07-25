import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { Span, Link } from 'shared/components/Typography';
// import classNames from '../styles/JournalFoodSelectionStylesheet.css';

const propTypes = {
  // key: PropTypes.string,
  foodName: PropTypes.string.isRequired,
  unitQuantity: PropTypes.number,
  unitName: PropTypes.string,
  url: PropTypes.string.isRequired,
};

const defaultProps = {
  unitQuantity: '',
  unitName: '',
};

const JournalFoodSelection = props => {
  const { foodName, unitQuantity, unitName, url } = props;

  return <Layout>
    <Span>{foodName}, </Span>
    <Span>{unitQuantity} {unitName}, </Span>
    <Link to={url}><b>edit</b></Link>
  </Layout>;
};

JournalFoodSelection.propTypes = propTypes;
JournalFoodSelection.defaultProps = defaultProps;

export default JournalFoodSelection;

