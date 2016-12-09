import React from 'react';
import NumberedList from '../../shared/components/NumberedList';
import classNames from '../styles/AboutCopyStylesheet.css';

const AboutCopy = () => <div className={classNames.this}>
  <h3 className={classNames.heading}>What?</h3>
  <p className={classNames.text}>
    This is a web platform for teaming up with people who have complementary resources and objectives.
  </p>
  <NumberedList
    title={'How It Works'}
    listItems={[
      'Post resources: land, labor, equipment, and raw materials.',
      'Create tasks and organizations.',
      'Allocate resources to tasks and organizations.',
    ]}
  />
  <NumberedList
    title={'Resource Allocation'}
    listItems={[
      'Offer resources that you own to tasks and organizations.',
      'Task creators and organization members request resources.',
      'Offers and requests include space for contact info which is only shared with the person on the other end.',
      'Users establish communication and review the situation.',
      'Setting the network features aside, this app can be used as an internal tool for planning and tracking resource engagement in a stand-alone system.',
    ]}
    dash
  />
</div>;

export default AboutCopy;
