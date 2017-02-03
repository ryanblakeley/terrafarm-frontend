import React from 'react';
import Relay from 'react-relay';
// Icons
import IoEdit from 'react-icons/lib/io/edit';
import IoBriefcase from 'react-icons/lib/io/briefcase';
import IoPerson from 'react-icons/lib/io/person';
// Components
import NotFoundPage from 'not-found/components/NotFoundPage';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
import ContentHeader from 'shared/components/ContentHeader';
import MainContentWrapper from 'shared/components/MainContentWrapper';
import HeroImage from 'shared/components/HeroImage';
import Accordion from 'shared/components/Accordion';
import RelationshipList from 'shared/components/RelationshipList';
import ActionPanel from 'shared/components/ActionPanel';
import ContentSubheader from 'shared/components/ContentSubheader';
import ContentBodyText from 'shared/components/ContentBodyText';

import classNames from '../styles/OrganizationContainerStylesheet.css';

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
      }
    `,
  },
});
