import React from 'react';
import NumberedList from '../../shared/components/NumberedList';
import classNames from '../styles/QuickIntroStylesheet.css';

const QuickIntro = _ => <div className={classNames.this}>
  <NumberedList
    listItems={[
      'Post resources: land, labor, equipment, and materials.',
      'Create tasks and organizations.',
      'Allocate resources to tasks and organizations.',
    ]}
  />
</div>;

export default QuickIntro;
