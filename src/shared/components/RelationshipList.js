import React from 'react';
import RelationshipListItem from './RelationshipListItem';
import classNames from '../styles/RelationshipListStylesheet.css';

const RelationshipList = props => <div className={classNames.this}>
  <div className={classNames.list}>
    {props.listItems.length
      ? props.listItems.map(item => (item.itemId && <RelationshipListItem
        {...item}
        key={item.itemId}
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
    name: React.PropTypes.string,
    itemUrl: React.PropTypes.string,
    itemId: React.PropTypes.string,
    baseUrl: React.PropTypes.string,
    baseId: React.PropTypes.string,
    relationshipId: React.PropTypes.string,
    status: React.PropTypes.string,
    isAdmin: React.PropTypes.bool,
  })),
};

RelationshipList.defaultProps = {
  emptyWarning: '(none)',
};

export default RelationshipList;
