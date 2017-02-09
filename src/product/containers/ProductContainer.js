import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
// Icons
import IoEdit from 'react-icons/lib/io/edit';
import IoBriefcase from 'react-icons/lib/io/briefcase';
import IoPerson from 'react-icons/lib/io/person';
import BarnIcon from 'organization/components/BarnIcon';
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

const ProductContainer = (props, context) => {
  if (!props.product) {
    return <NotFoundPage message={'Product not found.'} />;
  }
  const price = props.product.sharePrice
    ? `$${props.product.sharePrice} per share`
    : 'Price not provided';

  return <TransitionWrapper>
    <div className={classNames.this}>
      <Menu
        baseUrl={`/product/${props.product.rowId}`}
        header={{icon: <IoBriefcase />, title: 'Product'}}
        disabled={!context.loggedIn}
        list={[
          {
            icon: <IoEdit />,
            title: 'Order share',
            url: 'order-share',
            disabled: props.product.organizationByOrganizationId.userByOwnerId.rowId
              === context.userId,
          },
          {
            icon: <IoEdit />,
            title: 'Edit',
            url: 'edit',
            disabled: props.product.organizationByOrganizationId.userByOwnerId.rowId
              !== context.userId,
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
                    id: (edge.node.userByUserId
                      && edge.node.userByUserId.id)
                      || edge.node.id,
                    name: (edge.node.userByUserId
                      && edge.node.userByUserId.name)
                      || edge.node.customerName,
                    itemId: (edge.node.userByUserId
                      && edge.node.userByUserId.rowId)
                      || 'not-a-user',
                    itemUrl: (edge.node.userByUserId
                      && `/user/${edge.node.userByUserId.rowId}`)
                      || '',
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
          <Link
            to={`/farm/${props.product.organizationByOrganizationId.rowId}`}
            className={classNames.link}
          >
            <ContentSubheader
              icon={<BarnIcon width={24} height={24} />}
              text={props.product.organizationByOrganizationId.name}
            />
          </Link>
          <h5 className={classNames.articleHeading}>{props.product.startDate} &mdash; {props.product.endDate}</h5>
          <h5 className={classNames.articleHeading}>{price}</h5>
          <h5 className={classNames.articleHeading}>Maximum {props.product.maxShares} shares</h5>
          <ContentBodyText text={props.product.description} />
          <HeroImage image={props.product.imageUrl} />
        </div>}
      />
    </div>
  </TransitionWrapper>;
};

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
        sharePrice,
        maxShares,
        startDate,
        endDate,
        organizationByOrganizationId {
          id,
          rowId,
          name,
          userByOwnerId {
            rowId,
          },
        },
        sharesByProductId(first: 8) {
          totalCount,
          edges {
            node {
              id,
              customerName,
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
