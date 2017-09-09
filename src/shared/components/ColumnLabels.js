import React from 'react';
import Layout from 'shared/components/Layout';
import { H6 } from 'shared/components/Typography';
import classNames from '../styles/ColumnLabelsStylesheet.css';

const ColumnLabels = () => <Layout className={classNames.this} >
  <Layout className={`${classNames.label} ${classNames.date}`} />
  <H6 className={`${classNames.label} ${classNames.cal}`} >
    Calories
  </H6>
  <H6 className={classNames.label} >
    Protein
  </H6>
  <H6 className={classNames.label} >
    Fat
  </H6>
  <H6 className={classNames.label} >
    Carbs
  </H6>
  <H6 className={classNames.label} >
    Completed
  </H6>
</Layout>;

export default ColumnLabels;
