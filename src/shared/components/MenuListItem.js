import React from 'react';
import {Link} from 'react-router';

import classNames from '../styles/MenuListItemStylesheet.css';

const MenuListItem = props => <div className={classNames.this}>
  <Link to={`${props.baseUrl}/${props.url}`} className={classNames.link}>
    <div className={classNames.flexWrapper}>
      <div className={classNames.iconWrapper}>
        {React.cloneElement(props.icon, {
          className: `${classNames.icon}`,
        })}
      </div>
      <div className={classNames.titleWrapper}>
        <h4 className={classNames.title}>{props.title}</h4>
      </div>
    </div>
  </Link>
</div>;

MenuListItem.propTypes = {
  icon: React.PropTypes.element,
  title: React.PropTypes.string,
  url: React.PropTypes.string,
  baseUrl: React.PropTypes.string,
};

export default MenuListItem;
