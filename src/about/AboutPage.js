import React from 'react';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import classNames from './styles/AboutPageStylesheet.css';

const AboutPage = () => <div className={classNames.this}>
  <h3 className={classNames.heading}>What?</h3>
  <p className={classNames.text}>
    This is a web platform for teaming up with people who have complementary resources and objectives.
  </p>
  <HowItWorks />
  <h3 className={classNames.heading}>Use Cases</h3>
  <ul className={classNames.list}>
    <li className={classNames.listItem}>
      Farmers on less than 50 hectares who work with a few to a few dozen people.
    </li>
    <li className={classNames.listItem}>
      Farmers who want to collect food waste from restaurants and households.
    </li>
    <li className={classNames.listItem}>
      Community projects where the complexity of sharing is a constraint.
    </li>
  </ul>
  <Contact />
</div>;

export default AboutPage;
