import React from 'react';
import classNames from '../styles/NumberedListStylesheet.css';

const NumberedList = props => <div className={classNames.this}>
  {props.title && <h3 className={classNames.heading}>{props.title}</h3>}
  <ul className={props.dash ? classNames.listDash : classNames.listNumbered}>
    {props.listItems.map((text, i) => <li className={classNames.listItem} key={i} >
      {text}
    </li>)}
  </ul>
</div>;

NumberedList.propTypes = {
  title: React.PropTypes.string,
  listItems: React.PropTypes.arrayOf(React.PropTypes.string),
  dash: React.PropTypes.bool,
};

export default NumberedList;
