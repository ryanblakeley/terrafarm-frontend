import React from 'react';
import Relay from 'react-relay';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import HeartLand from './components/HeartLand';
import EditLandDialog from './components/EditLandDialog';
import NewResourceOfferDialog from './components/NewResourceOfferDialog';
import NewProjectDialog from './components/NewProjectDialog';
import ResourcesPendingNotification from './components/ResourcesPendingNotification';
import PendingResourceDialog from './components/PendingResourceDialog';
import ResourceItem from '../shared/components/ResourceItem';
import UserItem from '../shared/components/UserItem';
import ProjectItem from '../shared/components/ProjectItem';
import RemoveResourceFromLandDialog from '../shared/components/RemoveResourceFromLandDialog';
import HeroImage from '../shared/components/HeroImage';

import createColorChart from '../shared/themes/create-color-chart';
import transitionNames from '../shared/styles/transitions.css';
import classNames from './styles/LandContainerStylesheet.css';

class LandContainer extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
    land: React.PropTypes.object,
    viewer: React.PropTypes.object,
  };
  state = {
    colorChart: {},
    isAdmin: false,
    doesLike: false,
    resourceOwners: [],
  };
  componentWillMount () {
    const {land, viewer} = this.props;
    const {resources, admins, likedBy} = land;

    this.updateViewerStatus(viewer, admins, likedBy);
    this.updateUserList(admins, resources);
    this.updateColorChart(resources);
  }
  componentWillReceiveProps (nextProps) {
    const {land, viewer} = nextProps;
    const {resources, admins, likedBy} = land;

    this.updateViewerStatus(viewer, admins, likedBy);
    this.updateUserList(admins, resources);
    this.updateColorChart(resources);
  }
  updateColorChart (resources) {
    const userIds = [];
    let resourceOwners = resources.edges.map(edge => (
      edge.node.users.edges.map(userEdge => userEdge.node)
    ));
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

    let resourceOwners = resources.edges.map(edge => (
      edge.node.users.edges.map(userEdge => userEdge.node)
    ));
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
    const {land, viewer, master} = this.props;
    const {isAdmin, doesLike, resourceOwners, colorChart} = this.state;
    const {
      admins,
      likedBy,
      projects,
      resources,
      resourcesPending,
      description,
      category,
      name,
      image,
      location,
    } = land;

    return <CSSTransitionGroup
      transitionName={transitionNames}
      transitionAppear
      transitionAppearTimeout={350}
      transitionEnterTimeout={350}
      transitionLeave={false}
    >
      <div className={classNames.this}>
        <h2 className={classNames.pageHeading}>Land</h2>
        <div className={classNames.actionsHeading}>
          <HeartLand
            land={land}
            user={viewer}
            doesLike={doesLike}
            count={likedBy.edges.length}
          />
          {doesLike
            && <NewResourceOfferDialog land={land} user={viewer} />
          }
          {isAdmin
            && <NewProjectDialog land={land} master={master} user={viewer} />
          }
          {isAdmin
            && <EditLandDialog land={land} master={master} user={viewer} />
          }
          {!!resourcesPending.edges.length
            && <ResourcesPendingNotification onTouchTap={this.scrollToResourcesPending} />
          }
        </div>
        <h3 className={classNames.contentHeading}>{name}</h3>
        <h4 className={classNames.contentSubheading}>| {category} |</h4>
        <HeroImage image={image} />
        <h6 className={classNames.location}>{location}</h6>

        <div className={classNames.relationships} >
          {projects
            && projects.edges.length > 0
            && projects.edges.map(edge => <ProjectItem
              key={edge.node.id}
              project={edge.node}
            />)
          }

          {admins
            && admins.edges.length > 0
            && admins.edges.map(edge => <UserItem
              key={edge.node.id}
              user={edge.node}
              colorSwatch={colorChart[edge.node.id]}
              adminBadge
            />)
          }

          {resourceOwners
            && resourceOwners.length > 0
            && resourceOwners.map(owner => <UserItem
              key={owner.id}
              user={owner}
              colorSwatch={colorChart[owner.id]}
            />)
          }

          {resources
            && resources.edges.length > 0
            && resources.edges.map(edge => {
              const owner = edge.node.users.edges[0].node;
              const action = (isAdmin || owner.id === viewer.id)
                ? <RemoveResourceFromLandDialog resource={edge.node} land={land} />
                : null;

              return <div key={edge.node.id}>
                <ResourceItem
                  key={edge.node.id}
                  resource={edge.node}
                  colorSwatches={[colorChart[owner.id]]}
                  action={action}
                />
              </div>;
            })
          }

          <div ref={'resourcesPending'}>
            {isAdmin
              && resourcesPending
              && resourcesPending.length > 0
              && resourcesPending.edges.map(edge => <div key={edge.node.id}>
                <ResourceItem
                  resource={edge.node}
                  action={<PendingResourceDialog
                    resource={edge.node}
                    land={land}
                  />}
                />
              </div>)
            }
          </div>
        </div>

        <p className={classNames.description}>{description}</p>
      </div>
    </CSSTransitionGroup>;
  }
}

export default Relay.createContainer(LandContainer, {
  initialVariables: {
    landId: null,
  },
  fragments: {
    land: () => Relay.QL`
      fragment on Land {
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
              ${RemoveResourceFromLandDialog.getFragment('resource')},
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
        projects(first: 18) {
          edges {
            node {
              id,
              name,
              ${ProjectItem.getFragment('project')},
            }
          }
        },
        ${EditLandDialog.getFragment('land')},
        ${HeartLand.getFragment('land')},
        ${NewResourceOfferDialog.getFragment('land')},
        ${PendingResourceDialog.getFragment('land')},
        ${RemoveResourceFromLandDialog.getFragment('land')},
        ${NewProjectDialog.getFragment('land')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        id,
        ${HeartLand.getFragment('user')},
        ${NewResourceOfferDialog.getFragment('user')},
        ${EditLandDialog.getFragment('user')},
        ${NewProjectDialog.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${EditLandDialog.getFragment('master')},
        ${NewProjectDialog.getFragment('master')},
      }
    `,
  },
});