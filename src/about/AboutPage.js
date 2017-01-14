import React from 'react';
import Notice from './components/Notice';
import Contact from './components/Contact';
import CompanyInfo from './components/CompanyInfo';
import Acknowledgements from './components/Acknowledgements';
import classNames from './styles/AboutPageStylesheet.css';

const AboutPage = () => <div className={classNames.this}>
  <Notice />
  <Contact />
  <Acknowledgements />
  <CompanyInfo />
</div>;

export default AboutPage;
