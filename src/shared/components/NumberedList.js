import React from 'react';
import Layout from './Layout';
import {H4, UL, LI} from './Typography';
import classNames from '../styles/NumberedListStylesheet.css';

const NumberedList = props => <Layout left>
  {props.title && <H4>{props.title}</H4>}
  <UL className={props.dash ? classNames.listDash : classNames.listNumbered}>
    {props.listItems.map((text, i) => <LI className={classNames.listItem} key={i} >
      {text}
    </LI>)}
  </UL>
</Layout>;

NumberedList.propTypes = {
  title: React.PropTypes.string,
  listItems: React.PropTypes.arrayOf(React.PropTypes.string),
  dash: React.PropTypes.bool,
};

export default NumberedList;
