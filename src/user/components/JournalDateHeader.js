import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { P } from 'shared/components/Typography';
// import classNames from '../styles/JournalDateHeaderStylesheet.css';

const propTypes = {
  date: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  protein: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbs: PropTypes.number.isRequired,
  completeness: PropTypes.number.isRequired,
};

const JournalDateHeader = props => {
  const { date, calories, protein, fat, carbs, completeness } = props;

  return <Layout>
    <P>{date} | {calories} | {protein}g | {fat}g | {carbs}g | {completeness}%</P>
  </Layout>;
};

JournalDateHeader.propTypes = propTypes;

export default JournalDateHeader;
