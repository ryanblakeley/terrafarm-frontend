import React from 'react';
import Contact from './components/Contact';
import classNames from './styles/AboutPageStylesheet.css';

const AboutPage = () => <div className={classNames.this}>
  <h3 className={classNames.heading}>How It Works</h3>
  <ul className={classNames.list}>
    <li className={classNames.listItem}>
      Resource owners post land, labor, equipment, compost, seeds, and materials.
    </li>
    <li className={classNames.listItem}>
      People create or join organizations. Organization members create projects and project tasks.
    </li>
    <li className={classNames.listItem}>
      Resources can be allocated to organizations, projects, and tasks. This starts with an offer from the resource owner or a request from an organization member.
    </li>
    <li className={classNames.listItem}>
      The pending resource allocation is reviewed by the other party and accepted or declined.
    </li>
  </ul>
  <Contact />
</div>;

export default AboutPage;
