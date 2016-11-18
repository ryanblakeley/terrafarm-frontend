import React from 'react';
import Relay from 'react-relay';
import IconButton from 'material-ui/IconButton';
import IoIosStar from 'react-icons/lib/io/ios-star';
import IoIosStarOutline from 'react-icons/lib/io/ios-star-outline';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import CreateResourceStarMutation from '../mutations/CreateResourceStarMutation';
import DeleteResourceStarMutation from '../mutations/DeleteResourceStarMutation';

import classNames from '../styles/StarResourceFormStylesheet.css';

class StarResourceForm extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  state = {
    error: false,
  };
  handleClick = _ => {
    const {resource, currentPerson} = this.props;
    const starred = resource.resourceStarsByResourceId
      .edges.find(edge => edge.node.userByUserId.id === currentPerson.id);

    if (starred) {
      this.handleUnstar();
    } else {
      this.handleStar();
    }
  }
  handleStar = _ => {
    const {resource, currentPerson} = this.props;

    Relay.Store.commitUpdate(
      new CreateResourceStarMutation({
        resource,
        user: currentPerson,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  handleUnstar = _ => {
    const {resource, currentPerson} = this.props;
    const resourceStarEdge = resource.resourceStarsByResourceId
      .edges.find(edge => edge.node.userByUserId.id === currentPerson.id);

    Relay.Store.commitUpdate(
      new DeleteResourceStarMutation({
        resourceStar: resourceStarEdge.node,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  handleSuccess = response => {
    this.setState({
      closeTimeoutId: setTimeout(_ => this.props.notifyClose(), 1000),
    });
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  render () {
    const {currentPerson, resource, notifyClose} = this.props;
    const {error} = this.state;
    const starred = resource.resourceStarsByResourceId
      .edges.find(edge => edge.node.userByUserId.id === currentPerson.id);

    return <ActionPanelForm
      title={'Star Resource'}
      notifyClose={notifyClose}
      showForm={false}
      bodyText={<div className={classNames.this}>
        <IconButton className={classNames.button} onClick={this.handleClick}>
          {starred
            ? <IoIosStar className={classNames.icon} />
            : <IoIosStarOutline className={classNames.icon} />
          }
        </IconButton>
      </div>}
      error={error}
    />;
  }
}

export default Relay.createContainer(StarResourceForm, {
  initialVariables: {
    resourceId: null,
  },
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        resourceStarsByResourceId(first: 10) {
          edges {
            node {
              userByUserId {
                id,
              },
              ${DeleteResourceStarMutation.getFragment('resourceStar')},
            }
          }
        },
        ${CreateResourceStarMutation.getFragment('resource')},
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        id,
        ${CreateResourceStarMutation.getFragment('user')},
      }
    `,
  },
});
