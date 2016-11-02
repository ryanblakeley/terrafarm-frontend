import React from 'react';
import Relay from 'react-relay';
import GoRepo from 'react-icons/lib/go/repo';
import IoCube from 'react-icons/lib/io/cube';
import IoPerson from 'react-icons/lib/io/person';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import HeroImage from '../shared/components/HeroImage';
import RelationshipList from '../shared/components/RelationshipList';
import OrganizationActionTabs from './components/OrganizationActionTabs';
import UpdateOrganizationResourceMutation from './mutations/UpdateOrganizationResourceMutation';
import DeleteOrganizationResourceMutation from './mutations/DeleteOrganizationResourceMutation';
import classNames from './styles/OrganizationContainerStylesheet.css';

class OrganizationContainer extends React.Component {
  static propTypes = {
    organization: React.PropTypes.object,
    query: React.PropTypes.object,
  };
  static contextTypes = {
    loggedIn: React.PropTypes.bool,
  };
  acceptResource = relationship => {
    Relay.Store.commitUpdate(
      new UpdateOrganizationResourceMutation({
        organizationResourcePatch: {
          status: 'ACCEPTED',
        },
        organizationResource: relationship,
      })
    );
  }
  declineResource = relationship => {
    Relay.Store.commitUpdate(
      new UpdateOrganizationResourceMutation({
        organizationResourcePatch: {
          status: 'DECLINED',
        },
        organizationResource: relationship,
      })
    );
  }
  removeResource = relationship => {
    Relay.Store.commitUpdate(
      new DeleteOrganizationResourceMutation({
        organizationResource: relationship,
      })
    );
  }
  render () {
    const {organization, query} = this.props;
    const {loggedIn} = this.context;

    return <TransitionWrapper>
      <div className={classNames.this}>
        <OrganizationActionTabs
          isAdmin={loggedIn}
          organization={organization}
          query={query}
        />
        <h3 className={classNames.contentHeading}>{organization.name}</h3>
        <h4 className={classNames.contentSubheading}>
          <span className={classNames.location}>{organization.location}</span>
        </h4>
        <HeroImage image={organization.imageUrl} />
        <p className={classNames.description}>{organization.description}</p>
        <RelationshipList
          icon={<GoRepo />}
          title={'Projects'}
          pathname={'project'}
          listItems={organization.projectsByOrganizationId.edges.map(edge => ({
            name: edge.node.name,
            itemId: edge.node.id,
          }))}
        />
        <RelationshipList
          icon={<IoPerson />}
          title={'Members'}
          pathname={'user'}
          listItems={organization.organizationMembersByOrganizationId.edges.map(edge => ({
            name: edge.node.userByMemberId.name,
            itemId: edge.node.userByMemberId.id,
          }))}
        />
        <RelationshipList
          icon={<IoCube />}
          title={'Resources'}
          pathname={'resource'}
          listItems={organization.organizationResourcesByOrganizationId.edges.map(edge => ({
            name: edge.node.resourceByResourceId.name,
            itemId: edge.node.resourceByResourceId.id,
            relationship: edge.node,
            status: edge.node.status,
            isAdmin: loggedIn,
            accept: this.acceptResource,
            decline: this.declineResource,
            remove: this.removeResource,
          }))}
        />
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
        name,
        location,
        imageUrl,
        description,
        projectsByOrganizationId(first: 10) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        organizationResourcesByOrganizationId(first: 10) {
          edges {
            node {
              id,
              status,
              resourceByResourceId {
                id,
                name,
              },
              ${UpdateOrganizationResourceMutation.getFragment('organizationResource')},
              ${DeleteOrganizationResourceMutation.getFragment('organizationResource')},
            }
          }
        },
        organizationMembersByOrganizationId(first: 10) {
          edges {
            node {
              userByMemberId {
                id,
                name,
              }
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
