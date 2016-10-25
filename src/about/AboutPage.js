import React from 'react';
import Contact from './components/Contact';
import classNames from './styles/AboutPageStylesheet.css';

const AboutPage = () => <div className={classNames.this}>
  <h3 className={classNames.heading}>How It Works</h3>
  <ul className={classNames.list}>
    <li className={classNames.listItem}>
      Post resources such as land, labor, equipment, compost, seeds, and materials.
    </li>
    <li className={classNames.listItem}>
      Create organizations, projects, and tasks; and at any of those three levels
      describe resource requirements.
    </li>
    <li className={classNames.listItem}>
      Offer or request resources that match requirement descriptions; and the
      other party accepts or declines the engagement.
    </li>
  </ul>
  <Contact />
</div>;

export default AboutPage;
