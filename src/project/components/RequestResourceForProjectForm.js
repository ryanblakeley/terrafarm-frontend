import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectInput from '../../shared/components/SelectInput';
import CreateProjectResourceMutation from '../mutations/CreateProjectResourceMutation';

import classNames from '../styles/RequestResourceForProjectFormStylesheet.css';

class RequestResourceForProjectForm extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
    query: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  static contextTypes = {
    router: React.PropTypes.object,
  };
  state = {
    canSubmit: false,
  };
  handleValid = () => {
    this.setState({ canSubmit: true });
  }
  handleInvalid = () => {
    this.setState({ canSubmit: false });
  }
  handleClose = () => {
    const {notifyClose} = this.props;
    if (notifyClose) notifyClose();
  }
  handleFormError = data => {
    console.error('Form error:', data);
  }
  handleSubmit = data => {
    const {project} = this.props;

    if (!this.state.canSubmit) {
      console.warn('New resource is not ready');
      return;
    }

    Relay.Store.commitUpdate(
      new CreateProjectResourceMutation({
        project,
        resource: data.resource,
        status: 'REQUESTED',
      })
    );

    this.handleClose();
  }
  render () {
    const {query} = this.props;
    const {canSubmit} = this.state;

    return <div className={classNames.this} >
      <Formsy.Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.handleSubmit}
        onInvalidSubmit={this.handleFormError}
      >
        <SelectInput
          name={'resource'}
          label={'Select a resource to request'}
          required
        >
          {query.allResources.edges.map(edge => <MenuItem
            value={edge.node}
            key={edge.node.id}
            primaryText={edge.node.name}
          />)}
        </SelectInput>
        <div className={classNames.buttons}>
          <FlatButton
            label={'Cancel'}
            secondary
            onTouchTap={this.handleClose}
          />
          <RaisedButton
            label={'Save'}
            primary
            type={'submit'}
            disabled={!canSubmit}
          />
        </div>
      </Formsy.Form>
    </div>;
  }
}

export default Relay.createContainer(RequestResourceForProjectForm, {
  initialVariables: {
    projectId: null,
  },
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        ${CreateProjectResourceMutation.getFragment('project')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        allResources(first: 10) {
          edges {
            node {
              id,
              name,
              ${CreateProjectResourceMutation.getFragment('resource')},
            }
          }
        },
      }
    `,
  },
});
