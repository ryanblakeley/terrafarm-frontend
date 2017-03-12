import React from 'react';
import {LI, Span, WarningMessage, UL, Link} from 'shared/components/Typography';
import Layout from 'shared/components/Layout';
import classnamesContext from 'classnames/bind';
import classNames from '../styles/RelationshipListStylesheet.css';

const cx = classnamesContext.bind(classNames);

const RelationshipListItem = props => <LI noBullet truncate className={classNames.listItem}>
  {props.status && <Layout inline className={classNames.statusWrapper}>
    {props.authorized
      ? <Link to={props.actionUrl} className={cx({status: true, alert})}>
        [{props.status}]
      </Link>
      : <Span className={cx({status: true})} >
        [{props.status}]
      </Span>
    }
  </Layout>}
  {props.itemUrl
    ? <Link to={props.itemUrl} children={props.name} />
    : <Span children={props.name} />}
</LI>;

const RelationshipList = props => <div className={classNames.this}>
  <UL plumb>
    {props.listItems.length > -1
      ? props.listItems.map(item => (item.id && <RelationshipListItem
        {...item}
        key={item.id}
      />))
      : <RelationshipListItem
        name={<WarningMessage>{props.emptyWarning}</WarningMessage>}
      />
    }
  </UL>
</div>;

RelationshipListItem.propTypes = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  itemUrl: React.PropTypes.string,
  actionUrl: React.PropTypes.string,
  status: React.PropTypes.string,
  authorized: React.PropTypes.bool,
};
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
