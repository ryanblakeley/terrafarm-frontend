import React from 'react';
import Relay from 'react-relay';
// Icons
import IoEdit from 'react-icons/lib/io/edit';
import IoPerson from 'react-icons/lib/io/person';
import IoPlus from 'react-icons/lib/io/plus';
import IoIosBriefcase from 'react-icons/lib/io/ios-briefcase';
// Components
import TransitionWrapper from 'shared/components/TransitionWrapper';
import MainContentWrapper from 'shared/components/MainContentWrapper';
import ContentHeader from 'shared/components/ContentHeader';
import HeroImage from 'shared/components/HeroImage';
import RelationshipList from 'shared/components/RelationshipList';
import Menu from 'shared/components/Menu';
import ActionPanel from 'shared/components/ActionPanel';
import Accordion from 'shared/components/Accordion';
import ContentSubheader from 'shared/components/ContentSubheader';
import ContentBodyText from 'shared/components/ContentBodyText';

import classNames from '../styles/ProfileContainerStylesheet.css';

const ProfileContainer = (props, context) => <TransitionWrapper>
  <div className={classNames.this}>
    <Menu
      baseUrl={'/profile'}
      header={{icon: <IoPerson />, title: 'Profile'}}
      list={[
        { icon: <IoPlus />, title: 'New Organization', url: 'new-organization' },
        { icon: <IoEdit />, title: 'Edit', url: 'edit' },
      ]}
    />
    <ContentHeader text={props.user.name} />
    <MainContentWrapper
      right={<Accordion
        panels={[
          {
            header: {
              icon: <IoIosBriefcase />,
              label: 'Organizations',
            },
            body: <RelationshipList
              listItems={props.user.organizationMembersByMemberId.edges.map(edge => ({
                id: edge.node.id,
                name: edge.node.organizationByOrganizationId.name,
                itemUrl: `/organization/${edge.node.organizationByOrganizationId.rowId}`,
                actionUrl: `/organization/${edge.node.organizationByOrganizationId.rowId}/review-membership/${edge.node.id}`,
                status: edge.node.status === 'OFFERED'
                  ? edge.node.status
                  : null,
                authorized: true,
              }))}
            />,
          },
        ]}
      />}
      left={<div>
        <ActionPanel children={props.children} notifyClose={() => context.router.replace('/profile')} />
        <ContentSubheader text={props.user.placeByPlaceId && props.user.placeByPlaceId.address} />
        <ContentBodyText text={props.user.description} />
        <HeroImage image={props.user.imageUrl} />
      </div>}
    />
  </div>
</TransitionWrapper>;

ProfileContainer.propTypes = {
  user: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
};

ProfileContainer.contextTypes = {
  router: React.PropTypes.object,
};

export default Relay.createContainer(ProfileContainer, {
  initialVariables: {
    userId: null,
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name,
        imageUrl,
        description,
        placeByPlaceId {
          address,
        },
        organizationMembersByMemberId(first: 5) {
          edges {
            node {
              id,
              status,
              organizationByOrganizationId {
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
