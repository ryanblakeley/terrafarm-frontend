import React from 'react';
import Relay from 'react-relay';
import IconButton from 'material-ui/IconButton';
import IoIosHeart from 'react-icons/lib/io/ios-heart';
import IoIosHeartOutline from 'react-icons/lib/io/ios-heart-outline';

import LikeProjectMutation from '../mutations/LikeProjectMutation';
import UnlikeProjectMutation from '../mutations/UnlikeProjectMutation';

import classNames from '../styles/HeartProjectStylesheet.css';

class HeartProject extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
    user: React.PropTypes.object,
    doesLike: React.PropTypes.bool,
  };
  handleToggleHeart = () => {
    const {doesLike} = this.props;

    if (doesLike) {
      this.handleUnlike();
    } else {
      this.handleLike();
    }
  }
  handleUnlike = () => {
    const {user, project} = this.props;
    Relay.Store.commitUpdate(
      new UnlikeProjectMutation({
        user,
        project,
      })
    );
  }
  handleLike = () => {
    const {user, project} = this.props;
    Relay.Store.commitUpdate(
      new LikeProjectMutation({
        user,
        project,
      })
    );
  }
  render () {
    const {doesLike} = this.props;

    return <div className={classNames.this}>
      <IconButton onTouchTap={this.handleToggleHeart} >
        {doesLike
          ? <IoIosHeart className={classNames.icon} />
          : <IoIosHeartOutline className={classNames.icon} />
        }
      </IconButton>
    </div>;
  }
}

export default Relay.createContainer(HeartProject, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        ${UnlikeProjectMutation.getFragment('project')},
        ${LikeProjectMutation.getFragment('project')},
      },
    `,
    user: () => Relay.QL`
      fragment on User {
        ${UnlikeProjectMutation.getFragment('user')},
        ${LikeProjectMutation.getFragment('user')},
      }
    `,
  },
});
