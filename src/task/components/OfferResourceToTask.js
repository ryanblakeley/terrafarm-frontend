import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import SelectInput from '../../shared/components/SelectInput';
import AddPendingResource from './AddPendingResource';

import classNames from '../styles/OfferResourceToTaskStylesheet.css';

class OfferResourceToTask extends React.Component {
  static propTypes = {
    task: React.PropTypes.object,
    user: React.PropTypes.object,
    isProjectAdmin: React.PropTypes.bool,
    notifyClose: React.PropTypes.func,
  };
  state = {
    resourceIndex: null,
    canSubmit: false,
    availableResources: [],
  };
  componentWillMount () {
    const {user, task, isProjectAdmin} = this.props;
    const parentProject = task.projects.edges[0].node;

    this.updateAvailableResources(user, isProjectAdmin ? parentProject : null);
  }
  updateAvailableResources (user, project) {
    let availableResources = user.resources.edges;
    const resourceIds = availableResources.map(edge => edge.node.id);

    if (!project) {
      this.setState({availableResources});
      return;
    }

    const projectResources = project.resources.edges.filter(edge => {
      if (resourceIds.indexOf(edge.node.id) > -1) {
        return false;
      }
      resourceIds.push(edge.node.id);
      return true;
    });

    availableResources = availableResources.concat(projectResources);

    this.setState({availableResources});
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
  handleClose = () => {
    const {notifyClose} = this.props;
    if (notifyClose) notifyClose();
  }
  render () {
    const {task} = this.props;
    const {canSubmit, resourceIndex, availableResources} = this.state;

    let resource = null;
    if (resourceIndex !== null && resourceIndex >= 0) {
      resource = availableResources[resourceIndex].node;
    }

    const resourceItems = availableResources.map((edge, index) => <MenuItem
      key={edge.node.id}
      value={index}
      primaryText={edge.node.name}
      disabled={!!edge.node.tasks.edges.length
        && !!edge.node.tasks.edges.find(taskEdge => taskEdge.node.id === task.id)}
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
          Your email address will be shared with the
          <strong>{task.projects.edges[0].node.name}</strong> project admin.
        </p>
      </Formsy.Form>
      <div className={classNames.buttons}>
        <FlatButton
          label={'Cancel'}
          secondary
          onTouchTap={this.handleClose}
        />
        <AddPendingResource
          task={task}
          resource={resource}
          primary
          onComplete={this.handleClose}
          disabled={!canSubmit}
        />
      </div>
    </div>;
  }
}

export default Relay.createContainer(OfferResourceToTask, {
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        id,
        name,
        projects(first: 1) {
          edges {
            node {
              resources(first: 3) {
                edges {
                  node {
                    id,
                    name,
                  }
                }
              }
            }
          }
        },
        ${AddPendingResource.getFragment('task')},
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
              tasks(first: 2) {
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
