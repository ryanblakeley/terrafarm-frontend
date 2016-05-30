import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import Dialog from 'material-ui/lib/dialog';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import IoCube from 'react-icons/lib/io/cube';
import SelectInput from '../../shared/components/SelectInput';
import AddPendingResource from './AddPendingResource';

import classNames from '../styles/NewResourceOfferDialogStylesheet.css';

class NewResourceOfferDialog extends React.Component {
  static propTypes = {
    land: React.PropTypes.object,
    user: React.PropTypes.object,
  };
  state = {
    open: false,
    resourceIndex: null,
    canSubmit: false,
  };
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
  }
  handleValid = () => {
    this.setState({
      canSubmit: true,
    });
  }
  handleInvalid = () => {
    this.setState({canSubmit: false});
  }
  handleChange = (currentValues, isChanged) => {
    if (isChanged) {
      this.setState({
        resourceIndex: currentValues.resourceIndex,
      });
    }
  }
  render () {
    const {land, user} = this.props;
    const {canSubmit, resourceIndex} = this.state;

    let resource = null;
    if (resourceIndex !== null && resourceIndex >= 0) {
      resource = user.resources.edges[resourceIndex].node;
    }

    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <AddPendingResource
        land={land}
        resource={resource}
        primary
        onComplete={this.handleClose}
        disabled={!canSubmit}
      />,
    ];
    const resourceItems = user.resources.edges.map((edge, index) => <MenuItem
      key={edge.node.id}
      value={index}
      primaryText={edge.node.name}
    />);

    return <div className={classNames.this} >
      <IconButton onTouchTap={this.handleOpen} >
        <IoCube className={classNames.icon} />
      </IconButton>
      <Dialog
        title={'New Resource Offer'}
        actions={actions}
        onRequestClose={null}
        open={this.state.open}
      >
        <Formsy.Form
          ref={'form'}
          onChange={this.handleChange}
          onValid={this.handleValid}
          onInvalid={this.handleInvalid}
        >
          <SelectInput
            name={'resourceIndex'}
            label={'Resource'}
            initialValue={this.state.resourceIndex}
            validations={'isNumeric'}
            required
          >
            {resourceItems}
          </SelectInput>
          <p>
            Your email address will be shared with the <strong>
            {land.name}</strong> land admin.
          </p>
        </Formsy.Form>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(NewResourceOfferDialog, {
  initialVariables: {
    landId: null,
  },
  fragments: {
    land: () => Relay.QL`
      fragment on Land {
        id,
        name,
        ${AddPendingResource.getFragment('land')},
      },
    `,
    user: () => Relay.QL`
      fragment on User {
        name,
        resources(first: 3) {
          edges {
            node {
              id,
              name,
              ${AddPendingResource.getFragment('resource')},
            }
          }
        },
      }
    `,
  },
});
