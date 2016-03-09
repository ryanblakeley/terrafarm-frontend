import React from 'react';
import Relay from 'react-relay';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import HeartResource from './components/HeartResource';
import EditResourceDialog from './components/EditResourceDialog';
import UserItem from '../shared/components/UserItem';
import GroupItem from '../shared/components/GroupItem';
import HeroImage from '../shared/components/HeroImage';
import RemoveResourceFromGroupDialog from '../shared/components/RemoveResourceFromGroupDialog';

import transitionNames from '../shared/styles/transitions.css';
import classNames from './styles/ResourceContainerStylesheet.css';

class ResourceContainer extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    viewer: React.PropTypes.object,
  };
  state = {
    isOwner: false,
    doesLike: false,
  };
  componentWillMount () {
    const {resource, viewer} = this.props;
    const {users, likedBy} = resource;
    const ownerId = users.edges[0].node.id;

    this.updateViewerStatus(viewer, ownerId, likedBy);
  }
  componentWillReceiveProps (nextProps) {
    const {resource, viewer} = nextProps;
    const {users, likedBy} = resource;
    const ownerId = users.edges[0].node.id;

    this.updateViewerStatus(viewer, ownerId, likedBy);
  }
  updateViewerStatus (user, ownerId, likedBy) {
    const isOwner = user.id === ownerId;
    const doesLike = likedBy.edges.findIndex(edge => edge.node.id === user.id) > -1;

    this.setState({isOwner, doesLike});
  }
  render () {
    const {resource, viewer} = this.props;
    const {isOwner, doesLike} = this.state;
    const owner = resource.users.edges[0].node;
    const {likedBy} = resource;

    return <CSSTransitionGroup
      transitionName={transitionNames}
      transitionAppear
      transitionAppearTimeout={350}
      transitionEnterTimeout={350}
      transitionLeave={false}
    >
      <div className={classNames.this} >
        <h2 className={classNames.pageHeading}>Resource</h2>
        <div className={classNames.actionsHeading}>
          <HeartResource
            resource={resource}
            user={viewer}
            doesLike={doesLike}
            count={likedBy.edges.length}
          />
          {isOwner
            && <EditResourceDialog resource={resource} />
          }
        </div>
        <h3 className={classNames.contentHeading}>{resource.name}</h3>
        <h4 className={classNames.contentSubheading}>| {resource.category} |</h4>
        <HeroImage image={resource.image} />

        <div className={classNames.relationships}>
          <UserItem user={owner} adminBadge />
          {resource.groups.edges.map(edge => {
            const action = isOwner
              ? <RemoveResourceFromGroupDialog resource={resource} group={edge.node} />
              : null;

            return <GroupItem
              key={edge.node.id}
              group={edge.node}
              action={action}
            />;
          })}
        </div>

        <p className={classNames.description}>{resource.description}</p>
      </div>
    </CSSTransitionGroup>;
  }
}

export default Relay.createContainer(ResourceContainer, {
  initialVariables: {
    resourceId: null,
  },
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        name,
        description,
        category,
        image,
        users(first: 1) {
          edges {
            node {
              id,
              name,
              ${UserItem.getFragment('user')},
            }
          }
        },
        groups(first: 5) {
          edges {
            node {
              id,
              name,
              ${GroupItem.getFragment('group')},
              ${RemoveResourceFromGroupDialog.getFragment('group')},
            }
          }
        },
        likedBy(first: 18) {
          edges {
            node {
              id,
            }
          }
        },
        ${EditResourceDialog.getFragment('resource')},
        ${HeartResource.getFragment('resource')},
        ${RemoveResourceFromGroupDialog.getFragment('resource')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        id,
        ${HeartResource.getFragment('user')},
      }
    `,
  },
});


