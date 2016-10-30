import React from 'react';
import RelationshipListItem from './RelationshipListItem';
import classNames from '../styles/RelationshipListStylesheet.css';

const RelationshipList = props => <div className={classNames.this}>
  <div className={classNames.header}>
    <div className={classNames.iconContainer}>
      {React.cloneElement(props.icon, {className: classNames.icon})}
    </div>
    <div className={classNames.titleContainer}>
      <h4 className={classNames.title}>
        {props.title}
      </h4>
    </div>
  </div>

  <div className={classNames.list}>
    {props.listItems.length
      ? props.listItems.map(item => <RelationshipListItem
        {...item}
        pathname={props.pathname}
        key={item.itemId}
      />)
      : <div className={classNames.emptyListItem}>
        <p className={classNames.emptyWarning}>{props.emptyWarning}</p>
      </div>
    }
  </div>
</div>;

RelationshipList.propTypes = {
  icon: React.PropTypes.element,
  title: React.PropTypes.string,
  pathname: React.PropTypes.string,
  emptyWarning: React.PropTypes.string,
  listItems: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    itemId: React.PropTypes.string,
    relationshipId: React.PropTypes.string,
    status: React.PropTypes.string,
    accept: React.PropTypes.func,
    decline: React.PropTypes.func,
  })),
};

RelationshipList.defaultProps = {
  emptyWarning: '(none)',
};

export default RelationshipList;
