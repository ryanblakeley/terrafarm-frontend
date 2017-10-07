import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'shared/components/Layout';
import { H6 } from 'shared/components/Typography';
import classNames from '../styles/ColumnLabelsStylesheet.css';

const propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const defaultProps = {
  labels: [
    '',
    'Cal',
    'Protein',
    'Fat',
    'Carbs',
  ],
};

const ColumnLabels = (props) => <Layout className={classNames.this} >
  {props.labels.map(l => <H6 className={classNames.label} key={l} >{l}</H6>)}
</Layout>;

ColumnLabels.propTypes = propTypes;
ColumnLabels.defaultProps = defaultProps;

export default ColumnLabels;
