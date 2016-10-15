import React from 'react';
import Relay from 'react-relay';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import HeroImage from '../shared/components/HeroImage';
import ProjectItem from '../shared/components/ProjectItem';
import OrganizationActionTabs from './components/OrganizationActionTabs';
import classNames from './styles/OrganizationContainerStylesheet.css';

const OrganizationContainer = (props, context) => <TransitionWrapper>
  <div className={classNames.this}>
    <OrganizationActionTabs
      isAdmin={context.loggedIn}
      organization={props.organization}
      query={props.query}
    />
    <h3 className={classNames.contentHeading}>{props.organization.name}</h3>
    <h4 className={classNames.contentSubheading}>
      <span className={classNames.location}>{props.organization.location}</span>
    </h4>
    <HeroImage image={props.organization.imageUrl} />
    <p className={classNames.description}>{props.organization.description}</p>
    {props.organization.projectsByOrganizationId.edges.map(edge => <ProjectItem
      key={edge.node.id}
      project={edge.node}
    />)}
  </div>
</TransitionWrapper>;

OrganizationContainer.propTypes = {
  organization: React.PropTypes.object,
  query: React.PropTypes.object,
};

OrganizationContainer.contextTypes = {
  loggedIn: React.PropTypes.bool,
};

export default Relay.createContainer(OrganizationContainer, {
  initialVariables: {
    organizationId: null,
  },
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        name,
        location,
        imageUrl,
        description,
        projectsByOrganizationId(first: 10) {
          edges {
            node {
              id,
              ${ProjectItem.getFragment('project')},
            }
          }
        },
        ${OrganizationActionTabs.getFragment('organization')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${OrganizationActionTabs.getFragment('query')},
      }
    `,
  },
});

/*

import ResourceItem from '../shared/components/ResourceItem';
import UserItem from '../shared/components/UserItem';
import RemoveResourceFromOrganizationDialog
  from '../shared/components/RemoveResourceFromOrganizationDialog';
import PendingResourceDialog from './components/PendingResourceDialog';

import createColorChart from '../shared/themes/create-color-chart';

class OrganizationContainer extends React.Component {
  static propTypes = {
    organization: React.PropTypes.object,
  };
  state = {
    colorChart: {},
    isAdmin: false,
    doesLike: false,
    resourceOwners: [],
  };
  componentWillMount () {
    const {organization, viewer} = this.props;
    const {resources, admins, likedBy} = organization;

    this.updateViewerStatus(viewer, admins, likedBy);
    this.updateUserList(admins, resources);
    this.updateColorChart(resources);
  }
  componentWillReceiveProps (nextProps) {
    const {organization, viewer} = nextProps;
    const {resources, admins, likedBy} = organization;

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
  render () {
    const {master, organization, viewer} = this.props;
    const {isAdmin, doesLike, resourceOwners, colorChart} = this.state;
    const {
      admins,
      projects,
      resources,
      resourcesPending,
      description,
      size,
      name,
      image,
      location,
    } = organization;

    return <TransitionWrapper>
      <div className={classNames.this}>
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
                ? <RemoveResourceFromOrganizationDialog
                  resource={edge.node}
                  organization={organization} />
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
              && resourcesPending.edges.length > 0
              && resourcesPending.edges.map(edge => <div key={edge.node.id}>
                <ResourceItem
                  resource={edge.node}
                  action={<PendingResourceDialog
                    resource={edge.node}
                    organization={organization}
                  />}
                />
              </div>)
            }
          </div>
        </div>

        <p className={classNames.description}>{description}</p>
      </div>
    </TransitionWrapper>;
  }
}

export default Relay.createContainer(OrganizationContainer, {
  initialVariables: {
    organizationId: null,
  },
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        id,
        name,
        location,
        description,
        size,
        image,
        resources(first: 3) {
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
              ${RemoveResourceFromOrganizationDialog.getFragment('resource')},
              ${ResourceItem.getFragment('resource')},
            }
          }
        },
        resourcesPending(first: 3) {
          edges {
            node {
              id,
              name,
              ${PendingResourceDialog.getFragment('resource')},
              ${ResourceItem.getFragment('resource')},
            }
          }
        },
        admins(first: 1) {
          edges {
            node {
              id,
              name,
              ${UserItem.getFragment('user')},
            }
          }
        },
        likedBy(first: 6) {
          edges {
            node {
              id,
            }
          }
        },
        projects(first: 6) {
          edges {
            node {
              id,
              name,
              ${ProjectItem.getFragment('project')},
            }
          }
        },
        ${PendingResourceDialog.getFragment('organization')},
        ${RemoveResourceFromOrganizationDialog.getFragment('organization')},
        ${OrganizationActionTabs.getFragment('organization')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        id,
        ${OrganizationActionTabs.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${OrganizationActionTabs.getFragment('master')},
      }
    `,
  },
});
*/
