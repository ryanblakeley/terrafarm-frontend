import React from 'react';
import Relay from 'react-relay';
// Icons
import IoEdit from 'react-icons/lib/io/edit';
import GoRepo from 'react-icons/lib/go/repo';
import IoBriefcase from 'react-icons/lib/io/briefcase';
import IoPlus from 'react-icons/lib/io/plus';
import IoCube from 'react-icons/lib/io/cube';
import IoPerson from 'react-icons/lib/io/person';
import IoAndroidRadioButtonOn from 'react-icons/lib/io/android-radio-button-on';
// Components
import NotFoundPage from '../not-found/NotFoundPage';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import Menu from '../shared/components/Menu';
import ContentHeader from '../shared/components/ContentHeader';
import MainContentWrapper from '../shared/components/MainContentWrapper';
import HeroImage from '../shared/components/HeroImage';
import Accordion from '../shared/components/Accordion';
import RelationshipList from '../shared/components/RelationshipList';
import ActionPanel from '../shared/components/ActionPanel';
import ContentSubheader from '../shared/components/ContentSubheader';
import ContentBodyText from '../shared/components/ContentBodyText';

import classNames from './styles/OrganizationContainerStylesheet.css';

const OrganizationContainer = (props, context) => (!props.organization
  ? <NotFoundPage message={'Organization not found.'} />
  : <TransitionWrapper>
    <div className={classNames.this}>
      <Menu
        baseUrl={`/organization/${props.organization.rowId}`}
        header={{icon: <IoBriefcase />, title: 'Organization'}}
        disabled={!context.loggedIn}
        list={[
          { icon: <IoPlus />, title: 'New Project', url: 'new-project' },
          { icon: <IoCube />, title: 'Offer Resource', url: 'offer-resource' },
          { icon: <IoAndroidRadioButtonOn />, title: 'Request Resource', url: 'request-resource' },
          { icon: <IoEdit />, title: 'Edit', url: 'edit' },
        ]}
      />
      <ContentHeader text={props.organization.name} />
      <MainContentWrapper
        right={<Accordion
          panels={[
            {
              header: {
                icon: <GoRepo />,
                label: 'Projects',
              },
              body: <RelationshipList
                listItems={props.organization.projectsByOrganizationId.edges.map(edge => ({
                  name: edge.node.name,
                  itemId: edge.node.rowId,
                  itemUrl: 'project',
                }))}
              />,
            },
            {
              header: {
                icon: <IoPerson />,
                label: 'Members',
              },
              body: <RelationshipList
                listItems={props.organization
                  .organizationMembersByOrganizationId.edges.map(edge => ({
                    name: edge.node.userByMemberId.name,
                    itemId: edge.node.userByMemberId.rowId,
                    itemUrl: 'user',
                  }))
                }
              />,
            },
            {
              header: {
                icon: <IoCube />,
                label: 'Resources',
              },
              body: <RelationshipList
                listItems={props.organization
                  .organizationResourcesByOrganizationId.edges.map(edge => ({
                    name: edge.node.resourceByResourceId.name,
                    itemId: edge.node.resourceByResourceId.rowId,
                    itemUrl: 'resource',
                    baseId: props.organization.rowId,
                    baseUrl: 'organization',
                    relationshipId: edge.node.id,
                    status: edge.node.status,
                    isAdmin: context.loggedIn,
                  }))
                }
              />,
            },
          ]}
        />}
        left={<div>
          <ActionPanel
            children={props.children}
            notifyClose={() => {
              context.router.replace(`/organization/${props.organization.rowId}`);
            }}
          />
          <ContentSubheader text={props.organization.location} />
          <ContentBodyText text={props.organization.description} />
          <HeroImage image={props.organization.imageUrl} />
        </div>}
      />
    </div>
  </TransitionWrapper>
);

OrganizationContainer.propTypes = {
  organization: React.PropTypes.object,
  children: React.PropTypes.object,
};

OrganizationContainer.contextTypes = {
  loggedIn: React.PropTypes.bool,
  router: React.PropTypes.object,
};

export default Relay.createContainer(OrganizationContainer, {
  initialVariables: {
    organizationId: null,
  },
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        rowId,
        name,
        location,
        imageUrl,
        description,
        projectsByOrganizationId(first: 10) {
          edges {
            node {
              rowId,
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
                rowId,
                name,
              },
            }
          }
        },
        organizationMembersByOrganizationId(first: 10) {
          edges {
            node {
              userByMemberId {
                rowId,
                name,
              }
            }
          }
        },
      }
    `,
  },
});
