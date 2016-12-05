import React from 'react';
import classNames from '../styles/CompanyInfoStylesheet.css';

const CompanyInfo = props => {
  const ryana = <a href={'http://rojobuffalo.com'} className={classNames.link}>single-person</a>;
  return <div className={classNames.this}>
    <h3 className={classNames.heading}>
      Company Info
    </h3>
    <p className={classNames.text}>
      Terrafarm LLC was founded in September 2016. It is currently a {ryana} operation.
    </p>
  </div>;
};

export default CompanyInfo;
