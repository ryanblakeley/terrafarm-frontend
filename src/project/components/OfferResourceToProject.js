import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import SelectInput from '../../shared/components/SelectInput';
import AddPendingResource from './AddPendingResource';

import classNames from '../styles/OfferResourceToProjectStylesheet.css';

class OfferResourceToProject extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
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
    const {project, user} = this.props;
    const {canSubmit, resourceIndex} = this.state;

    let resource = null;
    if (resourceIndex !== null && resourceIndex >= 0) {
      resource = user.resources.edges[resourceIndex].node;
    }

    const resourceItems = user.resources.edges.map((edge, index) => <MenuItem
      key={edge.node.id}
      value={index}
      primaryText={edge.node.name}
      disabled={!!edge.node.projects.edges.length
        && !!edge.node.projects.edges.map(projectEdge => projectEdge.node.id === project.id)}
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
          Your email address will be shared with the <strong>{project.name}</strong> project admin.
        </p>
      </Formsy.Form>
      <div className={classNames.buttons}>
        <FlatButton
          label={'Cancel'}
          secondary
          onTouchTap={this.handleClose}
        />
        <AddPendingResource
          project={project}
          resource={resource}
          primary
          onComplete={this.handleClose}
          disabled={!canSubmit}
        />
      </div>
    </div>;
  }
}

export default Relay.createContainer(OfferResourceToProject, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id,
        name,
        ${AddPendingResource.getFragment('project')},
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
              projects(first: 2) {
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
