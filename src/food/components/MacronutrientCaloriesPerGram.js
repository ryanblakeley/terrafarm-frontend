import React from 'react';
import PropTypes from 'prop-types';

import { P, Span } from 'shared/components/Typography';
import Layout from 'shared/components/Layout';

const propTypes = {
  fat: PropTypes.string,
  protein: PropTypes.string,
  carb: PropTypes.string,
};

const defaultProps = {
  fat: null,
  protein: null,
  carb: null,
};

const MacronutrientCaloriesPerGram = props => {
  const { protein, fat, carb } = props;

  const displayProtein = protein
    && <Span> Protein <strong>{Math.round(protein * 10) / 10}</strong></Span>;
  const displayFat = fat
    && <Span> &#8226; Fat <strong>{Math.round(fat * 10) / 10}</strong></Span>;
  const displayCarb = carb
    && <Span> &#8226; Carb <strong>{Math.round(carb * 10) / 10}</strong></Span>;

  return <Layout>
    <P>Calories per gram: {displayProtein}{displayFat}{displayCarb}</P>
  </Layout>;
};

MacronutrientCaloriesPerGram.propTypes = propTypes;
MacronutrientCaloriesPerGram.defaultProps = defaultProps;

export default MacronutrientCaloriesPerGram;
