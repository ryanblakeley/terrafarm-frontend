import React from 'react';

import classnames from 'classnames/bind';
import classNamesContext from '../styles/PageMenuItemIconStylesheet.css';
const cx = classnames.bind(classNamesContext);

class PageMenuItemIcon extends React.Component {
  cloneWithProps = (element) => {
    const {large} = this.props;

    return React.cloneElement(element, {
      className: cx({ icon: true, largeIcon: large }),
    });
  }
  render () {
    const {large, children} = this.props;

    return <div className={cx({ this: true, large })}>
      {React.Children.map(children, this.cloneWithProps)}
    </div>;
  }
}

PageMenuItemIcon.propTypes = {
  children: React.PropTypes.object,
  large: React.PropTypes.bool,
};

export default PageMenuItemIcon;
