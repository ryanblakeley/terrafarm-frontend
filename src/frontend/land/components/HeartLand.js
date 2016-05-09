import React from 'react';
import Relay from 'react-relay';
import IconButton from 'material-ui/lib/icon-button';
import MdFavorite from 'react-icons/lib/md/favorite';
import MdFavoriteOutline from 'react-icons/lib/md/favorite-outline';

import LikeLandMutation from '../mutations/LikeLandMutation';
import UnlikeLandMutation from '../mutations/UnlikeLandMutation';

import classNames from '../styles/HeartLandStylesheet.css';

class HeartLand extends React.Component {
  static propTypes = {
    land: React.PropTypes.object,
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
    const {user, land} = this.props;
    Relay.Store.commitUpdate(
      new UnlikeLandMutation({
        user,
        land,
      })
    );
  }
  handleLike = () => {
    const {user, land} = this.props;
    Relay.Store.commitUpdate(
      new LikeLandMutation({
        user,
        land,
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

export default Relay.createContainer(HeartLand, {
  fragments: {
    land: () => Relay.QL`
      fragment on Land {
        ${UnlikeLandMutation.getFragment('land')},
        ${LikeLandMutation.getFragment('land')},
      },
    `,
    user: () => Relay.QL`
      fragment on User {
        ${UnlikeLandMutation.getFragment('user')},
        ${LikeLandMutation.getFragment('user')},
      }
    `,
  },
});
