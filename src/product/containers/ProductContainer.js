import React from 'react';
import Relay from 'react-relay';
import {
  EditIcon,
  DollarIcon,
  CalendarIcon,
  PeopleIcon,
  TagsIcon,
  AsteriskIcon,
  WheatIcon,
  BarnIcon,
} from 'shared/components/Icons';
import {H3, P, Link} from 'shared/components/Typography';
import NotFoundPage from 'not-found/components/NotFoundPage';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
import MainContentWrapper from 'shared/components/MainContentWrapper';
import HeroImage from 'shared/components/HeroImage';
import Accordion from 'shared/components/Accordion';
import RelationshipList from 'shared/components/RelationshipList';
import ActionPanel from 'shared/components/ActionPanel';
import ContentSubheader from 'shared/components/ContentSubheader';

import classNames from '../styles/ProductContainerStylesheet.css';

const ProductContainer = (props, context) => {
  if (!props.product) {
    return <NotFoundPage message={'Product not found.'} />;
  }
  const isOwner = props.product.organizationByOrganizationId.userByOwnerId.rowId
    === context.userId;
  let isShareholder = false;
  let currentPersonShareId = '';
  const shareHolderIds = [];
  const shareHolders = props.product.sharesByProductId.edges
    && props.product.sharesByProductId.edges.map(edge => {
      const customerName = edge.node.customerName;
      const user = edge.node.userByUserId;
      let itemUrl = null;

      if (shareHolderIds.indexOf((user && user.id) || customerName) > -1) {
        return {};
      }
      shareHolderIds.push((user && user.id) || customerName);

      if (edge.node.status === 'AVAILABLE'
        || edge.node.status === 'EXPIRED'
        || edge.node.status === 'CANCELED'
        || edge.node.status === 'EMPTY') {
        return {};
      }

      if (edge.node.userId && edge.node.userId === context.userId) {
        isShareholder = true;
        currentPersonShareId = edge.node.rowId;
      }

      if (isOwner) {
        itemUrl = `/share/${edge.node.rowId}`;
      } else if (user) {
        itemUrl = `/user/${user.rowId}`;
      }

      if (user) {
        return {
          id: user.id,
          name: user.name,
          itemId: user.rowId,
          itemUrl,
        };
      }
      return {
        id: customerName,
        name: customerName,
        itemUrl,
      };
    });
  const price = props.product.sharePrice
    ? `${props.product.sharePrice}`
    : 'price not provided';
  const dates = props.product.startDate
    ? `from ${props.product.startDate} to ${props.product.endDate}`
    : 'dates not provided';

  return <TransitionWrapper>
    <div className={classNames.this}>
      <Menu
        baseUrl={''}
        header={{icon: <WheatIcon />, title: 'Product'}}
        disabled={!context.loggedIn}
        list={[
          {
            icon: <TagsIcon />,
            title: 'Reserve share',
            url: `product/${props.product.rowId}/reserve-share`,
            disabled: isOwner || isShareholder,
          },
          {
            icon: <TagsIcon />,
            title: 'My share',
            url: `share/${currentPersonShareId}`,
            disabled: !isShareholder,
          },
          {
            icon: <TagsIcon />,
            title: 'Assign share',
            url: `product/${props.product.rowId}/assign-share`,
            disabled: !isOwner,
          },
          {
            icon: <EditIcon />,
            title: 'Edit Product',
            url: `product/${props.product.rowId}/edit`,
            disabled: !isOwner,
          },
        ]}
      />
      <H3>{props.product.name}</H3>
      <MainContentWrapper
        right={<Accordion
          panels={[
            {
              header: {
                icon: <PeopleIcon />,
                label: 'Shareholders',
              },
              body: <RelationshipList listItems={shareHolders} />,
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
          <ContentSubheader icon={<DollarIcon />} text={`${price}`} light />
          <ContentSubheader icon={<AsteriskIcon />} text={`${props.product.creditsInitial} distributions / share`} light />
          <ContentSubheader icon={<CalendarIcon />} text={dates} light />
          <P>{props.product.description}</P>
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
        creditsInitial,
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
              rowId,
              userId,
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
