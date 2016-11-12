import React from 'react';
import Contact from './components/Contact';
import classNames from './styles/AboutPageStylesheet.css';

const AboutPage = () => <div className={classNames.this}>
  <h3 className={classNames.heading}>What?</h3>
  <p className={classNames.text}>
    This is a web platform for teaming up with people who have complementary resources and common objectives.
  </p>
  <h3 className={classNames.heading}>How It Works</h3>
  <ul className={classNames.list}>
    <li className={classNames.listItem}>
      Resource owners post land, labor, equipment, and materials.
    </li>
    <li className={classNames.listItem}>
      People create or join organizations. Organization members create projects and tasks.
    </li>
    <li className={classNames.listItem}>
      Resource owners offer and organization members request resources.
    </li>
    <li className={classNames.listItem}>
      The other party reviews, then accepts or declines the resource allocation.
    </li>
  </ul>
  <h3 className={classNames.heading}>Use Cases</h3>
  <ul className={classNames.list}>
    <li className={classNames.listItem}>
      Farmers on less than 50 hectares who work with a few to a few dozen people.
    </li>
    <li className={classNames.listItem}>
      Urban farms that want to collect compost from restaurants and households.
    </li>
    <li className={classNames.listItem}>
      Group activities where a moderate amount of planning and coordination is required.
    </li>
  </ul>
  <Contact />
</div>;

export default AboutPage;
