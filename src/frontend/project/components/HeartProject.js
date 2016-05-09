import React from 'react';
import Relay from 'react-relay';
import IconButton from 'material-ui/lib/icon-button';
import MdFavorite from 'react-icons/lib/md/favorite';
import MdFavoriteOutline from 'react-icons/lib/md/favorite-outline';

import LikeProjectMutation from '../mutations/LikeProjectMutation';
import UnlikeProjectMutation from '../mutations/UnlikeProjectMutation';

import classNames from '../styles/HeartProjectStylesheet.css';

class HeartProject extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
    user: React.PropTypes.object,
    doesLike: React.PropTypes.bool,
    count: React.PropTypes.number.isRequired,
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
    const {doesLike, count} = this.props;

    return <div className={classNames.this}>
      <IconButton onTouchTap={this.handleToggleHeart} >
        {doesLike
          ? <MdFavorite className={classNames.icon} />
          : <MdFavoriteOutline className={classNames.icon} />
        }
      </IconButton>
      <h6 className={classNames.count}>{count}</h6>
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
