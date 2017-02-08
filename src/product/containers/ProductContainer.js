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

import classNames from '../styles/ProductContainerStylesheet.css';

const ProductContainer = (props, context) => (!props.product
  ? <NotFoundPage message={'Product not found.'} />
  : <TransitionWrapper>
    <div className={classNames.this}>
      <Menu
        baseUrl={`/product/${props.product.rowId}`}
        header={{icon: <IoBriefcase />, title: 'Product'}}
        disabled={!context.loggedIn}
        list={[
          {
            icon: <IoEdit />,
            title: 'Edit',
            url: 'edit',
            disabled: !props.product.organizationByOrganizationId.userByOwnerId.rowId
              === context.userId,
          },
        ]}
      />
      <ContentHeader text={props.product.name} />
      <MainContentWrapper
        right={<Accordion
          panels={[
            {
              header: {
                icon: <IoPerson />,
                label: 'Shareholders',
              },
              body: <RelationshipList
                listItems={props.product.sharesByProductId.edges.length > 0
                  ? props.product.sharesByProductId.edges.map(edge => ({
                    id: edge.node.userByUserId.id,
                    name: edge.node.userByUserId.name,
                    itemId: edge.node.userByUserId.rowId,
                    itemUrl: `/user/${edge.node.userByUserId.rowId}`,
                  }))
                  : []
                }
              />,
            },
          ]}
        />}
        left={<div>
          <ActionPanel
            children={props.children}
            notifyClose={() => {
              context.router.replace(`/product/${props.product.rowId}`);
            }}
          />
          <ContentSubheader
            text={props.product.organizationByOrganizationId.name}
          />
          <ContentBodyText text={props.product.description} />
          <HeroImage image={props.product.imageUrl} />
        </div>}
      />
    </div>
  </TransitionWrapper>
);

ProductContainer.propTypes = {
  product: React.PropTypes.object,
  children: React.PropTypes.object,
};

ProductContainer.contextTypes = {
  loggedIn: React.PropTypes.bool,
  router: React.PropTypes.object,
  userId: React.PropTypes.string,
};

export default Relay.createContainer(ProductContainer, {
  initialVariables: {
    productId: null,
  },
  fragments: {
    product: () => Relay.QL`
      fragment on Product {
        rowId,
        name,
        imageUrl,
        description,
        organizationByOrganizationId {
          id,
          rowId,
          name,
          userByOwnerId {
            rowId,
          },
        },
        sharesByProductId(first: 8) {
          edges {
            node {
              userByUserId {
                id,
                rowId,
                name,
              },
            }
          }
        },
      }
    `,
  },
});
