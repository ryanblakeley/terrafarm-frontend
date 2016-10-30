import React from 'react';
import {Link} from 'react-router';
import classNames from '../styles/RelationshipListItemStylesheet.css';

class RelationshipListItem extends React.Component {
  static propTypes = {
    pathname: React.PropTypes.string,
    name: React.PropTypes.string,
    itemId: React.PropTypes.string,
    relationshipId: React.PropTypes.string,
    status: React.PropTypes.string,
    accept: React.PropTypes.func,
    decline: React.PropTypes.func,
  };
  state = {
    open: false,
  };
  handleOpen = _ => {
    this.setState({open: true});
  }
  handleClose = _ => {
    this.setState({open: false});
  }
  handleAccept = _ => {
    this.props.accept(this.props.relationshipId);
  }
  handleDecline = _ => {
    this.props.decline(this.props.relationshipId);
  }
  render () {
    const {pathname, name, itemId, status} = this.props;
    const {open} = this.state;

    return <div className={classNames.this} onMouseLeave={this.handleClose}>
      {open && <div className={classNames.actions}>
        <div onClick={this.handleAccept}>Accept</div>
        <div onClick={this.handleDecline}>Decline</div>
      </div>}
      {status
        && <div
          className={classNames.status}
          onMouseEnter={this.handleOpen}
        >
          [{status}]
        </div>
      }
      <Link to={`/${pathname}/${itemId}`} className={classNames.link} >
        {name}
      </Link>
    </div>;
  }
}

export default RelationshipListItem;
