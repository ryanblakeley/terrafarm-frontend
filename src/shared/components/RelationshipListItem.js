import React from 'react';
import {Link} from 'react-router';
import classNamesContext from 'classnames/bind';
import classNames from '../styles/RelationshipListItemStylesheet.css';

const cx = classNamesContext.bind(classNames);

class RelationshipListItem extends React.Component {
  static propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    itemUrl: React.PropTypes.string,
    actionUrl: React.PropTypes.string,
    status: React.PropTypes.string,
    authorized: React.PropTypes.bool,
  };
  render () {
    const { name, itemUrl, actionUrl, status, authorized } = this.props;
    let statusElem;
    if (authorized) {
      statusElem = <Link
        className={cx({
          status: true,
          attention: status === 'REQUESTED' || status === 'OFFERED',
        })}
        to={actionUrl}
      >
        [{status}]
      </Link>;
    } else {
      statusElem = <span className={cx({status: true})} >
        [{status}]
      </span>;
    }

    return <div className={classNames.this} >
      {status && statusElem}
      <Link to={itemUrl} className={classNames.link} >
        {name}
      </Link>
    </div>;
  }
}

export default RelationshipListItem;
