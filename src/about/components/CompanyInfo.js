import React from 'react';
import classNames from '../styles/CompanyInfoStylesheet.css';

const CompanyInfo = _ => {
  const ryana = <a href={'http://rojobuffalo.com'} className={classNames.link}>single-person</a>;
  return <div className={classNames.this}>
    <h3 className={classNames.heading}>
      Owner
    </h3>
    <p className={classNames.text}>
      {ryana}
    </p>
  </div>;
};

export default CompanyInfo;
