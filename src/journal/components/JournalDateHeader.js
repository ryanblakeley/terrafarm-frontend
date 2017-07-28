import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { Span } from 'shared/components/Typography';
import classNames from '../styles/JournalDateHeaderStylesheet.css';

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

  return <Layout bottomSmall className={classNames.this}>
    <Span className={classNames.date} title={'Date'}>
      {date}
    </Span>
    <Span className={`${classNames.macro} ${classNames.cal}`} title={'Calories'}>
      {calories}
    </Span>
    <Span className={classNames.macro} title={'Protein'}>
      {protein}
    </Span>
    <Span className={classNames.macro} title={'Total Fat'}>
      {fat}
    </Span>
    <Span className={classNames.macro} title={'Total Carb.'}>
      {carbs}
    </Span>
    <Span className={classNames.completeness} title={'% Resolved'}>
      {completeness}%
    </Span>
  </Layout>;
};

JournalDateHeader.propTypes = propTypes;

export default JournalDateHeader;
