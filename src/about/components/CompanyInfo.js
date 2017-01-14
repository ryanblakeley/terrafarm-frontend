import React from 'react';
import classNames from '../styles/CompanyInfoStylesheet.css';

const CompanyInfo = props => {
  // const ryana = <a href={'http://rojobuffalo.com'} className={classNames.link}>single-person</a>;
  const ryana = <a href={'mailto:ryan@terra.farm'} className={classNames.link}>Ryan Blakeley</a>;
  return <div className={classNames.this}>
    <h3 className={classNames.heading}>
      Company Info
    </h3>
    <p className={classNames.text}>
      Terrafarm LLC was founded in September 2016. It is owned and operated by {ryana}.
    </p>
  </div>;
};

export default CompanyInfo;
