import React from 'react';
import NumberedList from '../shared/components/NumberedList';
import Contact from './components/Contact';
import classNames from './styles/AboutPageStylesheet.css';

const AboutPage = () => <div className={classNames.this}>
  <h3 className={classNames.heading}>What?</h3>
  <p className={classNames.text}>
    This is a web platform for teaming up with people who have complementary resources and objectives.
  </p>
  <NumberedList
    title={'How It Works'}
    listItems={[
      'Post resources: land, labor, equipment, and materials.',
      'Create tasks and organizations.',
      'Allocate resources to tasks and organizations.',
    ]}
  />
  <NumberedList
    title={'Resource Allocation'}
    listItems={[
      'Resource owners offer resources to tasks and organizations.',
      'Task authors and organization members request resources.',
      'Offers and requests have text inputs for contact info which is only shared with the person on the other end.',
      'Users establish communication however they want, then review and decide on the proposal.',
    ]}
  />
  <Contact />
</div>;

export default AboutPage;
