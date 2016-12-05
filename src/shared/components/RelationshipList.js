import React from 'react';
import RelationshipListItem from './RelationshipListItem';
import classNames from '../styles/RelationshipListStylesheet.css';

const RelationshipList = props => <div className={classNames.this}>
  <div className={classNames.list}>
    {props.listItems.length > -1
      ? props.listItems.map(item => (item.id && <RelationshipListItem
        {...item}
        key={item.id}
      />))
      : <div className={classNames.emptyListItem}>
        <p className={classNames.emptyWarning}>{props.emptyWarning}</p>
      </div>
    }
  </div>
</div>;

RelationshipList.propTypes = {
  emptyWarning: React.PropTypes.string,
  listItems: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    itemUrl: React.PropTypes.string,
    actionUrl: React.PropTypes.string,
    status: React.PropTypes.string,
    authorized: React.PropTypes.bool,
  })),
};

RelationshipList.defaultProps = {
  emptyWarning: '(none)',
};

export default RelationshipList;
