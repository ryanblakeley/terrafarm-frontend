import React from 'react';
import Layout from 'shared/components/Layout';
import { Span } from 'shared/components/Typography';
import classNames from '../styles/ColumnLabelsStylesheet.css';

const ColumnLabels = () => <Layout className={classNames.this} >
  <Layout className={`${classNames.label} ${classNames.date}`} />
  <Span className={`${classNames.label} ${classNames.cal}`} >
    Calories
  </Span>
  <Span className={classNames.label} >
    Protein
  </Span>
  <Span className={classNames.label} >
    Fat
  </Span>
  <Span className={classNames.label} >
    Carbs
  </Span>
  <Span className={classNames.label} >
    Completed
  </Span>
</Layout>;

export default ColumnLabels;
