import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
// Icons
import IoEdit from 'react-icons/lib/io/edit';
import IoPerson from 'react-icons/lib/io/person';
import BarnIcon from 'organization/components/BarnIcon';
import WheatIcon from 'product/components/WheatIcon';
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
  ? <NotFoundPage message={'Farm not found.'} />
  : <TransitionWrapper>
    <div className={classNames.this}>
      <Menu
        baseUrl={`/farm/${props.organization.rowId}`}
        header={{icon: <BarnIcon />, title: 'Farm'}}
        disabled={props.organization.userByOwnerId.rowId !== context.userId}
        list={[
          {
            icon: <WheatIcon />,
            title: 'Create Product',
            url: 'create-product',
          },
          {
            icon: <IoEdit />,
            title: 'Edit Farm',
            url: 'edit',
          },
        ]}
      />
      <ContentHeader text={props.organization.name} />
      <MainContentWrapper
        right={<Accordion
          panels={[
            {
              header: {
                icon: <WheatIcon />,
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
            light
          />
          <Link
            to={`/user/${props.organization.userByOwnerId.rowId}`}
            className={classNames.link}
          >
            <ContentSubheader
              icon={<IoPerson />}
              text={`owner: ${props.organization.userByOwnerId.name}`}
            />
          </Link>
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
