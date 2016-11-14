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
  render () {
    const {
      baseUrl, baseId, itemUrl, itemId, name, status, relationshipId, isAdmin,
    } = this.props;
    const statusElement = status
      ? isAdmin
        ? <Link
          className={cx({
            status: true,
            bright: status === 'REQUESTED' || status === 'OFFERED',
          })}
          to={`/${baseUrl}/${baseId}/review-allocation/${relationshipId}`}
        >
          [{status}]
        </Link>
        : <span
          className={cx({
            status: true,
            bright: status === 'REQUESTED' || status === 'OFFERED',
          })}
        >
          [{status}]
        </span>
      : null;

    return <div className={classNames.this} onMouseLeave={this.handleClose}>
      {statusElement}
      <Link to={`/${itemUrl}/${itemId}`} className={classNames.link} >
        {name}
      </Link>
    </div>;
  }
}

export default RelationshipListItem;
