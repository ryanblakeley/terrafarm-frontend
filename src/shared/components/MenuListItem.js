/*
import PropTypes from 'prop-types';
import React from 'react';
import {H2} from 'shared/components/Typography';
import classNames from '../styles/MenuListItemStylesheet.css';

const propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  url: PropTypes.string,
  baseUrl: PropTypes.string,
  closeImmediate: PropTypes.func,
  disabled: PropTypes.bool,
  router: PropTypes.object,
  location: PropTypes.object,
};

class MenuListItem extends React.Component {
  static propTypes = propTypes;
  handleClick = _ => {
    const {baseUrl, url, closeImmediate} = this.props;
    const {router, location} = this.context;
    router.push({
      pathname: `${baseUrl}/${url}`,
      query: location.query,
      state: location.state,
    });
    closeImmediate();
  }
  render () {
    const {icon, title} = this.props;
    return <div className={classNames.this} onTouchTap={this.handleClick} >
      <div className={classNames.flexWrapper}>
        <div className={classNames.iconWrapper}>
          {React.cloneElement(icon, {className: classNames.iconSize})}
        </div>
        <div className={classNames.titleWrapper}>
          <H2 className={classNames.title}>{title}</H2>
        </div>
      </div>
    </div>;
  }
}

export default MenuListItem;
*/
