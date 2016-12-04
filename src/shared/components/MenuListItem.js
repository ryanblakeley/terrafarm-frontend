import React from 'react';

import classNames from '../styles/MenuListItemStylesheet.css';

class MenuListItem extends React.Component {
  static propTypes = {
    icon: React.PropTypes.element,
    title: React.PropTypes.string,
    url: React.PropTypes.string,
    baseUrl: React.PropTypes.string,
    closeImmediate: React.PropTypes.func,
  };
  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object,
  };
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
          {React.cloneElement(icon, {
            className: `${classNames.icon}`,
          })}
        </div>
        <div className={classNames.titleWrapper}>
          <h4 className={classNames.title}>{title}</h4>
        </div>
      </div>
    </div>;
  }
}

export default MenuListItem;
