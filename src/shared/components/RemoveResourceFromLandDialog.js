import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MdRemove from 'react-icons/lib/md/remove';
import RemoveResourceFromLand from './RemoveResourceFromLand';

import classNames from '../styles/RemoveResourceFromLandDialogStylesheet.css';

class RemoveResourceFromLandDialog extends React.Component {
  static propTypes = {
    land: React.PropTypes.object,
    resource: React.PropTypes.object,
  };
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
  }
  render () {
    const {land, resource} = this.props;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <RemoveResourceFromLand
        resource={resource}
        land={land}
        primary
        onComplete={this.handleClose}
      />,
    ];

    return <div className={classNames.icon} >
      <MdRemove onTouchTap={this.handleOpen} className={classNames.pointer} />
      <Dialog
        title={'Remove Resource'}
        actions={actions}
        onRequestClose={null}
        open={this.state.open}
      >
        <p>
          <span>Please confirm that you would like to remove the resource </span>
          <Link to={`/resource/${resource.id}`} className={classNames.link}>
            {resource.name}
          </Link>
          <span> from the land <span className={classNames.link}>{land.name}</span>.</span>
        </p>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(RemoveResourceFromLandDialog, {
  fragments: {
    land: () => Relay.QL`
      fragment on Land {
        id,
        name,
        ${RemoveResourceFromLand.getFragment('land')},
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        ${RemoveResourceFromLand.getFragment('resource')},
      }
    `,
  },
});
