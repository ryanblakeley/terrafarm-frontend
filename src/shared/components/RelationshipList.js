import React from 'react';
import {Link} from 'react-router';
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
    {!props.listItems && <div className={classNames.listItem}>
      <p className={classNames.emptyWarning}>{props.emptyWarning}</p>
    </div>}

    {props.listItems.map(item => <div className={classNames.listItem} key={item.id}>
      {item.status
        && <div className={classNames.status}>[{item.status}]</div>
      }
      <Link to={`/${props.pathname}/${item.id}`} className={classNames.link} >
        {item.name}
      </Link>
    </div>)}
  </div>
</div>;

RelationshipList.propTypes = {
  icon: React.PropTypes.element,
  title: React.PropTypes.string,
  pathname: React.PropTypes.string,
  listItems: React.PropTypes.array,
  emptyWarning: React.PropTypes.string,
};

RelationshipList.defaultProps = {
  emptyWarning: '(empty)',
};

export default RelationshipList;
