import React from 'react';

import classNames from '../styles/MainContentWrapperStylesheet.css';

const MainContentWrapper = props => <div className={classNames.this}>
  <div className={classNames.flexWrapper}>
    <div className={classNames.left}>
      {props.left}
    </div>
    <div className={classNames.right}>
      {props.right}
    </div>
  </div>
</div>;

MainContentWrapper.propTypes = {
  left: React.PropTypes.element,
  right: React.PropTypes.element,
};

export default MainContentWrapper;
