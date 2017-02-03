import React from 'react';
import Notice from './Notice';
import Contact from './Contact';
import CompanyInfo from './CompanyInfo';
import Acknowledgements from './Acknowledgements';
import classNames from '../styles/AboutPageStylesheet.css';

const AboutPage = () => <div className={classNames.this}>
  <Notice />
  <Contact />
  <Acknowledgements />
  <CompanyInfo />
</div>;

export default AboutPage;
