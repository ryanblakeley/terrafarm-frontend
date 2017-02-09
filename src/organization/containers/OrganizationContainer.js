import React from 'react';
import Relay from 'react-relay';
// Icons
import IoEdit from 'react-icons/lib/io/edit';
import IoBriefcase from 'react-icons/lib/io/briefcase';
import IoPlus from 'react-icons/lib/io/plus';
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
import BarnIcon from '../components/BarnIcon';

import classNames from '../styles/OrganizationContainerStylesheet.css';

const OrganizationContainer = (props, context) => (!props.organization
  ? <NotFoundPage message={'Farm not found.'} />
  : <TransitionWrapper>
    <div className={classNames.this}>
      <Menu
        baseUrl={`/farm/${props.organization.rowId}`}
        header={{icon: <BarnIcon />, title: 'Farm'}}
        disabled={!context.loggedIn}
        list={[
          {
            icon: <IoEdit />,
            title: 'Edit Farm',
            url: 'edit',
            disabled: !props.organization.userByOwnerId.rowId === context.userId,
          },
          { icon: <IoPlus />, title: 'Create Product', url: 'create-product' },
        ]}
      />
      <ContentHeader text={props.organization.name} />
      <MainContentWrapper
        right={<Accordion
          panels={[
            {
              header: {
                icon: <IoPerson />,
                label: 'Owner',
              },
              body: <RelationshipList
                listItems={[{
                  id: props.organization.userByOwnerId.id,
                  name: props.organization.userByOwnerId.name,
                  itemId: props.organization.userByOwnerId.rowId,
                  itemUrl: `/user/${props.organization.userByOwnerId.rowId}`,
                }]}
              />,
            },
            {
              header: {
                icon: <IoBriefcase />,
                label: 'Products',
              },
              body: <RelationshipList
                listItems={props.organization.productsByOrganizationId
                  .edges.map(edge => ({
                    id: edge.node.id,
                    name: edge.node.name,
                    itemUrl: `/product/${edge.node.rowId}`,
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
              context.router.replace(`/farm/${props.organization.rowId}`);
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
        userByOwnerId {
          id,
          rowId,
          name,
        },
        productsByOrganizationId(first: 3) {
          edges {
            node {
              id,
              rowId,
              name,
            }
          }
        },
      }
    `,
  },
});
