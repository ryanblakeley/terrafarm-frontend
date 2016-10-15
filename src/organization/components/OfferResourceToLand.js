import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import SelectInput from '../../shared/components/SelectInput';
import AddPendingResource from './AddPendingResource';

import classNames from '../styles/OfferResourceToLandStylesheet.css';

class OfferResourceToLand extends React.Component {
  static propTypes = {
    land: React.PropTypes.object,
    user: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  state = {
    resourceIndex: null,
    canSubmit: false,
  };
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
  handleClose = () => {
    const {notifyClose} = this.props;
    if (notifyClose) notifyClose();
  }
  render () {
    const {land, user} = this.props;
    const {canSubmit, resourceIndex} = this.state;

    let resource = null;
    if (resourceIndex !== null && resourceIndex >= 0) {
      resource = user.resources.edges[resourceIndex].node;
    }

    const resourceItems = user.resources.edges.map((edge, index) => <MenuItem
      key={edge.node.id}
      value={index}
      primaryText={edge.node.name}
      disabled={!!edge.node.lands.edges.length
        && !!edge.node.lands.edges.map(landEdge => landEdge.node.id === land.id)}
    />);

    return <div className={classNames.this} >
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
          validations={'isNumeric,isExisty'}
          required
        >
          {resourceItems}
        </SelectInput>
        <p className={classNames.message}>
          Your email address will be shared with the <strong>{land.name}</strong> land admin.
        </p>
      </Formsy.Form>
      <div className={classNames.buttons}>
        <FlatButton
          label={'Cancel'}
          secondary
          onTouchTap={this.handleClose}
        />
        <AddPendingResource
          land={land}
          resource={resource}
          primary
          onComplete={this.handleClose}
          disabled={!canSubmit}
        />
      </div>
    </div>;
  }
}

export default Relay.createContainer(OfferResourceToLand, {
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
              lands(first: 2) {
                edges {
                  node { id }
                }
              },
              ${AddPendingResource.getFragment('resource')},
            }
          }
        },
      }
    `,
  },
});
