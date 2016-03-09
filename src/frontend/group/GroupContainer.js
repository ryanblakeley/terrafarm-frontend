import React from 'react';
import Relay from 'react-relay';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import HeartGroup from './components/HeartGroup';
import EditGroupDialog from './components/EditGroupDialog';
import NewResourceOfferDialog from './components/NewResourceOfferDialog';
import ResourcesPendingNotification from './components/ResourcesPendingNotification';
import PendingResourceDialog from './components/PendingResourceDialog';
import ResourceItem from '../shared/components/ResourceItem';
import UserItem from '../shared/components/UserItem';
import RemoveResourceFromGroupDialog from '../shared/components/RemoveResourceFromGroupDialog';
import HeroImage from '../shared/components/HeroImage';

import createColorChart from '../shared/themes/create-color-chart';
import transitionNames from '../shared/styles/transitions.css';
import classNames from './styles/GroupContainerStylesheet.css';

class GroupContainer extends React.Component {
  static propTypes = {
    group: React.PropTypes.object,
    viewer: React.PropTypes.object,
  };
  state = {
    colorChart: {},
    isAdmin: false,
    doesLike: false,
    resourceOwners: [],
  };
  componentWillMount () {
    const {group, viewer} = this.props;
    const {resources, admins, likedBy} = group;

    this.updateColorChart(resources);
    this.updateViewerStatus(viewer, admins, likedBy);
    this.updateUserList(admins, resources);
  }
  componentWillReceiveProps (nextProps) {
    const {group, viewer} = nextProps;
    const {resources, admins, likedBy} = group;

    this.updateColorChart(resources);
    this.updateViewerStatus(viewer, admins, likedBy);
    this.updateUserList(admins, resources);
  }
  updateColorChart (resources) {
    const userIds = [];
    let resourceOwners = resources.edges.map(edge => {
      return edge.node.users.edges.map(userEdge => userEdge.node);
    });
    resourceOwners = [].concat.apply([], resourceOwners);
    resourceOwners = resourceOwners.filter(user => {
      if (userIds.indexOf(user.id) > -1) {
        return false;
      }
      userIds.push(user.id);
      return true;
    });

    const colorChart = createColorChart(userIds);

    this.setState({colorChart});
  }
  updateViewerStatus (user, admins, likedBy) {
    const isAdmin = admins.edges.findIndex(edge => edge.node.id === user.id) > -1;
    const doesLike = likedBy.edges.findIndex(edge => edge.node.id === user.id) > -1;

    this.setState({isAdmin, doesLike});
  }
  updateUserList (admins, resources) {
    const userIds = admins.edges.map(edge => edge.node.id);

    let resourceOwners = resources.edges.map(edge => {
      return edge.node.users.edges.map(userEdge => userEdge.node);
    });
    resourceOwners = [].concat.apply([], resourceOwners);
    resourceOwners = resourceOwners.filter(user => {
      if (userIds.indexOf(user.id) > -1) {
        return false;
      }
      userIds.push(user.id);
      return true;
    });

    this.setState({resourceOwners});
  }
  scrollToResourcesPending = () => {
    const {resourcesPending} = this.refs;
    resourcesPending.scrollIntoView();
  }
  render () {
    const {group, viewer} = this.props;
    const {resourceOwners, isAdmin, doesLike, colorChart} = this.state;
    const {admins, likedBy} = group;

    return <CSSTransitionGroup
      transitionName={transitionNames}
      transitionAppear
      transitionAppearTimeout={350}
      transitionEnterTimeout={350}
      transitionLeave={false}
    >
      <div className={classNames.this}>
        <h2 className={classNames.pageHeading}>Group</h2>
        <div className={classNames.actionsHeading}>
          <HeartGroup
            group={group}
            user={viewer}
            doesLike={doesLike}
            count={likedBy.edges.length}
          />
          {isAdmin
            && <EditGroupDialog group={group} />
          }
          {doesLike
            && <NewResourceOfferDialog group={group} user={viewer} />
          }
          {!!group.resourcesPending.edges.length
            && <ResourcesPendingNotification onTouchTap={this.scrollToResourcesPending} />
          }
        </div>
        <h3 className={classNames.contentHeading}>{group.name}</h3>
        <h4 className={classNames.contentSubheading}>| {group.category} |</h4>
        <HeroImage image={group.image} />
        <h6 className={classNames.location}>{group.location}</h6>

        <div className={classNames.relationships} >
          {admins.edges.map(edge => {
            return <UserItem
              key={edge.node.id}
              user={edge.node}
              colorSwatch={colorChart[edge.node.id]}
              adminBadge
            />;
          })}

          {resourceOwners
            && resourceOwners.length > 0
            && resourceOwners.map(owner => {
              return <UserItem
                key={owner.id}
                user={owner}
                colorSwatch={colorChart[owner.id]}
              />;
            })
          }

          {group.resources.edges.map(edge => {
            const owner = edge.node.users.edges[0].node;
            const action = (isAdmin || owner.id === viewer.id)
              ? <RemoveResourceFromGroupDialog resource={edge.node} group={group} />
              : null;

            return <div key={edge.node.id}>
              <ResourceItem
                key={edge.node.id}
                resource={edge.node}
                colorSwatches={[colorChart[owner.id]]}
                action={action}
              />
            </div>;
          })}

          <div ref={'resourcesPending'}>
            {isAdmin
              && group.resourcesPending.edges.map(edge => {
                return <div key={edge.node.id}>
                  <ResourceItem
                    resource={edge.node}
                    action={<PendingResourceDialog
                      resource={edge.node}
                      group={group}
                    />}
                  />
                </div>;
              })
            }
          </div>
        </div>

        <p className={classNames.description}>{group.description}</p>
      </div>
    </CSSTransitionGroup>;
  }
}

export default Relay.createContainer(GroupContainer, {
  initialVariables: {
    groupId: null,
  },
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        name,
        location,
        description,
        category,
        image,
        resources(first: 18) {
          edges {
            node {
              id,
              name,
              users(first: 1) {
                edges {
                  node {
                    id,
                    name,
                    ${UserItem.getFragment('user')},
                  }
                }
              },
              ${RemoveResourceFromGroupDialog.getFragment('resource')},
              ${ResourceItem.getFragment('resource')},
            }
          }
        },
        resourcesPending(first: 18) {
          edges {
            node {
              id,
              name,
              ${PendingResourceDialog.getFragment('resource')},
              ${ResourceItem.getFragment('resource')},
            }
          }
        },
          admins(first: 18) {
          edges {
            node {
              id,
              name,
              ${UserItem.getFragment('user')},
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
        ${EditGroupDialog.getFragment('group')},
        ${HeartGroup.getFragment('group')},
        ${NewResourceOfferDialog.getFragment('group')},
        ${PendingResourceDialog.getFragment('group')},
        ${RemoveResourceFromGroupDialog.getFragment('group')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        id,
        ${HeartGroup.getFragment('user')},
        ${NewResourceOfferDialog.getFragment('user')},
      }
    `,
  },
});
