import React from 'react';
import Relay from 'react-relay';
import {IconButton} from 'shared/components/Material';
import {StarIcon, StarOutlineIcon} from 'shared/components/Icons';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import CreateUserStarMutation from '../mutations/CreateUserStarMutation';
import DeleteUserStarMutation from '../mutations/DeleteUserStarMutation';

class StarUserForm extends React.Component {
  static propTypes = {
    relay: React.PropTypes.object,
    user: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  state = {
    error: false,
  };
  componentWillMount () {
    const {user, currentPerson} = this.props;
    const starEdge = currentPerson.userStarsByFollowerId
      .edges.find(edge => edge.node.userByFollowingId.id === user.id);

    this.setState({starred: !!starEdge, starEdge});
  }
  componentWillReceiveProps (nextProps) {
    const {user, currentPerson} = nextProps;
    const starEdge = currentPerson.userStarsByFollowerId
      .edges.find(edge => edge.node.userByFollowingId.id === user.id);

    this.setState({starred: !!starEdge, starEdge});
  }
  handleClick = _ => {
    const {starred} = this.state;

    if (starred) {
      this.handleUnstar();
    } else {
      this.handleStar();
    }
  }
  handleStar = _ => {
    const {user, currentPerson, relay} = this.props;

    relay.commitUpdate(
      new CreateUserStarMutation({
        user,
        currentPerson,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      },
    );
  }
  handleUnstar = _ => {
    const {relay} = this.props;
    const {starEdge} = this.state;

    relay.commitUpdate(
      new DeleteUserStarMutation({
        userStar: starEdge.node,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      },
    );
  }
  handleSuccess = _ => {
    this.setState({
      closeTimeoutId: setTimeout(_1 => this.props.notifyClose(), 1000),
    });
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  render () {
    const {notifyClose} = this.props;
    const {starred, error} = this.state;

    return <ActionPanelForm
      title={'Star User'}
      notifyClose={notifyClose}
      bodyText={<IconButton onClick={this.handleClick}>
        {starred
          ? <StarIcon />
          : <StarOutlineIcon />
        }
      </IconButton>}
      error={error}
      showForm={false}
      formBlockedMessage={''}
    />;
  }
}

export default Relay.createContainer(StarUserForm, {
  initialVariables: {
    userId: null,
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        ${CreateUserStarMutation.getFragment('user')},
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        id,
        userStarsByFollowerId(first: 10) {
          edges {
            node {
              userByFollowingId {
                id,
              },
              ${DeleteUserStarMutation.getFragment('userStar')},
            }
          }
        },
        ${CreateUserStarMutation.getFragment('currentPerson')},
      }
    `,
  },
});
