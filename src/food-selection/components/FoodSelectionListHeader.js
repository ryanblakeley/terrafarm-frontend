import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { Span } from 'shared/components/Typography';
import classNames from '../styles/FoodSelectionListHeaderStylesheet.css';

const propTypes = {
  listTitle: PropTypes.node,
  calories: PropTypes.number.isRequired,
  protein: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbs: PropTypes.number.isRequired,
  // completeCount: PropTypes.number.isRequired,
  // recordsCount: PropTypes.number.isRequired,
};

const defaultProps = {
  listTitle: '',
};

const FoodSelectionListHeader = props => {
  const { listTitle, calories, protein, fat, carbs } = props;

  return <Layout className={classNames.this} >
    <Span className={classNames.macro} >{listTitle}</Span>
    <Span className={classNames.macro} title={'Calories'} >{calories}</Span>
    <Span className={classNames.macro} title={'Protein'} >{protein}</Span>
    <Span className={classNames.macro} title={'Total Fat'} >{fat}</Span>
    <Span className={classNames.macro} title={'Total Carb.'} >{carbs}</Span>
    {/*
    <Span className={classNames.completeness} title={'Complete / Total rows'} >
      {completeCount} / {recordsCount}
    </Span>
    */}
  </Layout>;
};

FoodSelectionListHeader.propTypes = propTypes;
FoodSelectionListHeader.defaultProps = defaultProps;

export default FoodSelectionListHeader;
