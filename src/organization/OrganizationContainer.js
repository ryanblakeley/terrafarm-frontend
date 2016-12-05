import React from 'react';
import Relay from 'react-relay';
// Icons
import IoEdit from 'react-icons/lib/io/edit';
import IoBriefcase from 'react-icons/lib/io/briefcase';
import IoCube from 'react-icons/lib/io/cube';
import IoPerson from 'react-icons/lib/io/person';
import IoAndroidRadioButtonOn from 'react-icons/lib/io/android-radio-button-on';
import IoIosPaperOutline from 'react-icons/lib/io/ios-paper-outline';
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
          {
            icon: <IoAndroidRadioButtonOn />,
            title: 'Request Resource',
            url: 'request-resource',
            disabled: !props.organization.organizationMembersByOrganizationId.edges.find(edge => (
              edge.node.userByMemberId.rowId === context.userId
            )),
          },
          {
            icon: <IoCube />,
            title: 'Offer Resource',
            url: 'offer-resource',
          },
          {
            icon: <IoPerson />,
            title: 'New Member',
            url: 'new-member',
          },
          {
            icon: <IoEdit />,
            title: 'Edit',
            url: 'edit',
            disabled: !props.organization.organizationMembersByOrganizationId.edges.find(edge => (
              edge.node.userByMemberId.rowId === context.userId
            )),
          },
        ]}
      />
      <ContentHeader text={props.organization.name} />
      <MainContentWrapper
        right={<Accordion
          panels={[
            {
              header: {
                icon: <IoPerson />,
                label: 'Members',
              },
              body: <RelationshipList
                listItems={props.organization
                  .organizationMembersByOrganizationId.edges.map(edge => ({
                    id: edge.node.id,
                    name: edge.node.userByMemberId.name,
                    itemId: edge.node.userByMemberId.rowId,
                    itemUrl: `/user/${edge.node.userByMemberId.rowId}`,
                    actionUrl: `/organization/${props.organization.rowId}/review-membership/${edge.node.id}`,
                    status: edge.node.status === 'OFFERED'
                      ? edge.node.status
                      : null,
                    authorized: edge.node.memberId === context.userId,

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
                    id: edge.node.id,
                    name: edge.node.resourceByResourceId.name,
                    itemUrl: `/resource/${edge.node.resourceByResourceId.rowId}`,
                    actionUrl: `/organization/${props.organization.rowId}/review-allocation/${edge.node.id}`,
                    status: edge.node.status,
                    authorized: context.userId === edge.node.resourceByResourceId.ownerId
                      || props.organization.organizationMembersByOrganizationId
                        .edges.findIndex(edge2 => (
                          context.userId === edge2.node.memberId
                        )) > -1,
                  }))
                }
              />,
            },
            {
              header: {
                icon: <IoIosPaperOutline />,
                label: 'Tasks',
              },
              body: <RelationshipList
                listItems={props.organization.organizationTasksByOrganizationId.edges.map(edge => ({
                  id: edge.node.id,
                  name: edge.node.taskByTaskId.name,
                  itemUrl: `/task/${edge.node.taskByTaskId.rowId}`,
                }))}
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
          <ContentSubheader
            text={props.organization.placeByPlaceId
              && props.organization.placeByPlaceId.address}
          />
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
  userId: React.PropTypes.string,
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
        imageUrl,
        description,
        placeByPlaceId {
          address,
        },
        organizationResourcesByOrganizationId(first: 10) {
          edges {
            node {
              id,
              status,
              resourceByResourceId {
                rowId,
                name,
                ownerId,
              },
            }
          }
        },
        organizationMembersByOrganizationId(first: 10) {
          edges {
            node {
              id,
              status,
              memberId,
              userByMemberId {
                rowId,
                name,
              }
            }
          }
        },
        organizationTasksByOrganizationId(first: 10) {
          edges {
            node {
              id,
              taskByTaskId {
                name,
                rowId,
              }
            }
          }
        }
      }
    `,
  },
});
