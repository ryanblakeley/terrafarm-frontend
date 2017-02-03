import React from 'react';
import {Link} from 'react-router';
import classNamesContext from 'classnames/bind';
import classNames from '../styles/RelationshipListItemStylesheet.css';

const cx = classNamesContext.bind(classNames);
/* eslint no-nested-ternary: 0 */
const RelationshipListItem = props => <div className={classNames.this} >
  {props.status
    ? props.authorized
      ? <Link
        className={cx({
          status: true,
          attention: props.status === 'REQUESTED' || props.status === 'OFFERED',
        })}
        to={props.actionUrl}
      >
        [{props.status}]
      </Link>
      : <span className={cx({status: true})} >
        [{props.status}]
      </span>
    : null
  }
  <Link to={props.itemUrl} className={classNames.link} >
    {props.name}
  </Link>
</div>;

RelationshipListItem.propTypes = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  itemUrl: React.PropTypes.string,
  actionUrl: React.PropTypes.string,
  status: React.PropTypes.string,
  authorized: React.PropTypes.bool,
};

export default RelationshipListItem;
