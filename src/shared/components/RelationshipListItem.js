import React from 'react';
import {Link} from 'react-router';
import IconButton from 'material-ui/IconButton';
import IoIosCheckmarkOutline from 'react-icons/lib/io/ios-checkmark-outline';
import IoIosCloseOutline from 'react-icons/lib/io/ios-close-outline';
import IoIosTrashOutline from 'react-icons/lib/io/ios-trash-outline';
import classNames from '../styles/RelationshipListItemStylesheet.css';

class RelationshipListItem extends React.Component {
  static propTypes = {
    pathname: React.PropTypes.string,
    name: React.PropTypes.string,
    itemId: React.PropTypes.string,
    relationship: React.PropTypes.object,
    status: React.PropTypes.string,
    isAdmin: React.PropTypes.bool,
    accept: React.PropTypes.func,
    decline: React.PropTypes.func,
    remove: React.PropTypes.func,
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
    this.props.accept(this.props.relationship);
  }
  handleDecline = _ => {
    this.props.decline(this.props.relationship);
  }
  handleRemove = _ => {
    this.props.remove(this.props.relationship);
  }
  renderActionButtons () {
    const {status, isAdmin} = this.props;
    const {open} = this.state;

    if (open && isAdmin) {
      if (status === 'OFFERED' || status === 'REQUESTED') {
        return <div className={classNames.actions}>
          <IconButton className={classNames.button} onClick={this.handleAccept} >
            <IoIosCheckmarkOutline className={classNames.icon} />
          </IconButton>
          <IconButton className={classNames.button} onClick={this.handleDecline} >
            <IoIosCloseOutline className={classNames.icon} />
          </IconButton>

          {/*
          <RaisedButton primary label={'Accept'} onClick={this.handleAccept} />
          <FlatButton label={'Decline'} onClick={this.handleDecline} />
          */}
        </div>;
      } else if (status === 'ACCEPTED' || status === 'DECLINED') {
        return <div className={classNames.actions}>
          {/* <FlatButton label={'Remove'} onClick={this.handleRemove} /> */}
          <IconButton className={classNames.button} onClick={this.handleRemove} >
            <IoIosTrashOutline className={classNames.icon} />
          </IconButton>
        </div>;
      }
    }
    return '';
  }
  render () {
    const {pathname, name, itemId, status} = this.props;

    return <div className={classNames.this} onMouseLeave={this.handleClose}>
      {this.renderActionButtons()}
      {status
        && <div className={classNames.status} onMouseEnter={this.handleOpen}>
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
