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
  <Contact />
</div>;

export default AboutPage;
