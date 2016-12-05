import React from 'react';
import Relay from 'react-relay';
import IconButton from 'material-ui/IconButton';
import IoIosStar from 'react-icons/lib/io/ios-star';
import IoIosStarOutline from 'react-icons/lib/io/ios-star-outline';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import CreateUserStarMutation from '../mutations/CreateUserStarMutation';
import DeleteUserStarMutation from '../mutations/DeleteUserStarMutation';

import classNames from '../styles/StarUserFormStylesheet.css';

class StarUserForm extends React.Component {
  static propTypes = {
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
  componentWillReceiveProps (nextProps, nextContext) {
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
    const {user, currentPerson} = this.props;

    Relay.Store.commitUpdate(
      new CreateUserStarMutation({
        user,
        currentPerson,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  handleUnstar = _ => {
    const {starEdge} = this.state;

    Relay.Store.commitUpdate(
      new DeleteUserStarMutation({
        userStar: starEdge.node,
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
    const {notifyClose} = this.props;
    const {starred, error} = this.state;

    return <ActionPanelForm
      title={'Star User'}
      notifyClose={notifyClose}
      bodyText={<div className={classNames.this}>
        <IconButton className={classNames.button} onClick={this.handleClick}>
          {starred
            ? <IoIosStar className={classNames.icon} />
            : <IoIosStarOutline className={classNames.icon} />
          }
        </IconButton>
      </div>}
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
