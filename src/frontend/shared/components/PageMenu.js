import React from 'react';

import classNames from '../styles/PageMenuStylesheet.css';

const PageMenu = (props) => <div className={classNames.this}>
  {props.children}
</div>;

PageMenu.propTypes = {
  children: React.PropTypes.array,
};

export default PageMenu;
