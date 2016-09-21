import React from 'react';
import Relay from 'react-relay';
import IconButton from 'material-ui/lib/icon-button';
import IoIosHeart from 'react-icons/lib/io/ios-heart';
import IoIosHeartOutline from 'react-icons/lib/io/ios-heart-outline';

import LikeResourceMutation from '../mutations/LikeResourceMutation';
import UnlikeResourceMutation from '../mutations/UnlikeResourceMutation';

import classNames from '../styles/HeartResourceStylesheet.css';

class HeartResource extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
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
    const {user, resource} = this.props;
    Relay.Store.commitUpdate(
      new UnlikeResourceMutation({
        user,
        resource,
      })
    );
  }
  handleLike = () => {
    const {user, resource} = this.props;
    Relay.Store.commitUpdate(
      new LikeResourceMutation({
        user,
        resource,
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

export default Relay.createContainer(HeartResource, {
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        ${UnlikeResourceMutation.getFragment('resource')},
        ${LikeResourceMutation.getFragment('resource')},
      },
    `,
    user: () => Relay.QL`
      fragment on User {
        ${UnlikeResourceMutation.getFragment('user')},
        ${LikeResourceMutation.getFragment('user')},
      }
    `,
  },
});
