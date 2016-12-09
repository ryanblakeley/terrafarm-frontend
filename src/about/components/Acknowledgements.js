import React from 'react';
import classNames from '../styles/AcknowledgementsStylesheet.css';

const Acknowledgements = props => {
  const caleba = <a href={'http://calebmer.com'} className={classNames.link}>@calebmer</a>;
  const g2ia = <a href={'http://www.g2idev.com/'} className={classNames.link}>G2i</a>;
  const darina = <a href={'https://github.com/dphaener'} className={classNames.link}>@dphaener</a>;
  return <div className={classNames.this}>
    <h3 className={classNames.heading}>
      Acknowledgements
    </h3>
    <p className={classNames.text}>
      Special thanks to {caleba}, {darina}, and {g2ia} for their contributions to the code base.
    </p>
  </div>;
};

export default Acknowledgements;