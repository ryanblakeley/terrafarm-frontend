import React from 'react';
import Relay from 'react-relay';
import IconButton from 'material-ui/lib/icon-button';
import MdFavorite from 'react-icons/lib/md/favorite';
import MdFavoriteOutline from 'react-icons/lib/md/favorite-outline';

import LikeGroupMutation from '../mutations/LikeGroupMutation';
import UnlikeGroupMutation from '../mutations/UnlikeGroupMutation';

import classNames from '../styles/HeartGroupStylesheet.css';

class HeartGroup extends React.Component {
  static propTypes = {
    group: React.PropTypes.object,
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
    const {user, group} = this.props;
    Relay.Store.commitUpdate(
      new UnlikeGroupMutation({
        user,
        group,
      })
    );
  }
  handleLike = () => {
    const {user, group} = this.props;
    Relay.Store.commitUpdate(
      new LikeGroupMutation({
        user,
        group,
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

export default Relay.createContainer(HeartGroup, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        ${UnlikeGroupMutation.getFragment('group')},
        ${LikeGroupMutation.getFragment('group')},
      },
    `,
    user: () => Relay.QL`
      fragment on User {
        ${UnlikeGroupMutation.getFragment('user')},
        ${LikeGroupMutation.getFragment('user')},
      }
    `,
  },
});
