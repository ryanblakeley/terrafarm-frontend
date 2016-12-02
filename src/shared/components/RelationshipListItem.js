import React from 'react';
import {Link} from 'react-router';
import classNamesContext from 'classnames/bind';
import classNames from '../styles/RelationshipListItemStylesheet.css';

const cx = classNamesContext.bind(classNames);

class RelationshipListItem extends React.Component {
  static propTypes = {
    itemUrl: React.PropTypes.string,
    itemId: React.PropTypes.string,
    baseUrl: React.PropTypes.string,
    baseId: React.PropTypes.string,
    name: React.PropTypes.string,
    relationshipId: React.PropTypes.string,
    status: React.PropTypes.string,
    isAdmin: React.PropTypes.bool,
  };
  static contextTypes = {
    loggedIn: React.PropTypes.bool,
  };
  render () {
    const {
      baseUrl, baseId, itemUrl, itemId, name, status, relationshipId, isAdmin,
    } = this.props;
    const {loggedIn} = this.context;
    let statusElem;
    if (loggedIn && isAdmin) {
      statusElem = <Link
        className={cx({
          status: true,
          attention: status === 'REQUESTED' || status === 'OFFERED',
        })}
        to={`/${baseUrl}/${baseId}/review-allocation/${relationshipId}`}
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
      <Link to={`/${itemUrl}/${itemId}`} className={classNames.link} >
        {name}
      </Link>
    </div>;
  }
}

export default RelationshipListItem;
