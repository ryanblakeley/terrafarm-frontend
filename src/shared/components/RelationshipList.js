import React from 'react';
import {LI, Span, WarningMessage, UL, Link} from 'shared/components/Typography';
import Layout from 'shared/components/Layout';
import classnamesContext from 'classnames/bind';
import classNames from '../styles/RelationshipListStylesheet.css';

const cx = classnamesContext.bind(classNames);

const RelationshipListItem = props => <LI noBullet truncate className={cx({listItem: true, alert: props.alert})}>
  {props.status && <Layout inline className={classNames.statusWrapper}>
    {props.authorized
      ? <Link to={props.actionUrl} className={cx({status: true})}>
        [{props.status}]
      </Link>
      : <Span className={cx({status: true})} >
        [{props.status}]
      </Span>
    }
  </Layout>}
  {props.itemUrl
    ? <Link to={props.itemUrl}>{props.name}</Link>
    : <Span>{props.name}</Span>}
</LI>;

const RelationshipList = props => <div className={classNames.this}>
  <UL plumb>
    {props.listItems.length > 0
      ? props.listItems.map(item => (item.id && <RelationshipListItem
        {...item}
        key={item.id}
      />))
      : <RelationshipListItem
        name={<WarningMessage>{props.warningText}</WarningMessage>}
      />
    }
  </UL>
</div>;

RelationshipListItem.propTypes = {
  id: React.PropTypes.string,
  name: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
  alert: React.PropTypes.bool,
  itemUrl: React.PropTypes.string,
  actionUrl: React.PropTypes.string,
  status: React.PropTypes.string,
  authorized: React.PropTypes.bool,
};
RelationshipList.propTypes = {
  warningText: React.PropTypes.string,
  listItems: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
    itemUrl: React.PropTypes.string,
    actionUrl: React.PropTypes.string,
    status: React.PropTypes.string,
    authorized: React.PropTypes.bool,
  })),
};

RelationshipList.defaultProps = {
  warningText: '(empty)',
};

export default RelationshipList;
