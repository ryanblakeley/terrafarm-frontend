import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
// Icons
import IoEdit from 'react-icons/lib/io/edit';
import IoDollar from 'react-icons/lib/io/social-usd-outline';
import IoIosCalendar from 'react-icons/lib/io/ios-calendar-outline';
import IoIosPeople from 'react-icons/lib/io/ios-people';
import IoIosTagsOutline from 'react-icons/lib/io/ios-pricetags-outline';
import IoAsterisk from 'react-icons/lib/io/asterisk';
import WheatIcon from 'product/components/WheatIcon';
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
  let currentPersonShareId = '';
  const isOwner = props.product.organizationByOrganizationId.userByOwnerId.rowId
    === context.userId;
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

      if (edge.node.userId && edge.node.userId === context.userId) {
        currentPersonShareId = edge.node.rowId;
      }

      if (edge.node.status === 'AVAILABLE'
        || edge.node.status === 'EXPIRED'
        || edge.node.status === 'CANCELED'
        || edge.node.status === 'EMPTY') {
        return {};
      }
      // mark these share items as links to shares instead of products
      if (edge.node.userId === context.userId) {
        itemUrl = `/share/${edge.node.rowId}`;
        // let isShareholder = true;
      } else if (isOwner) {
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
            icon: <IoIosTagsOutline />,
            title: 'Reserve share',
            url: `product/${props.product.rowId}/reserve-share`,
            disabled: isOwner || currentPersonShareId,
          },
          {
            icon: <IoIosTagsOutline />,
            title: 'My share',
            url: `share/${currentPersonShareId}`,
            disabled: !currentPersonShareId,
          },
          {
            icon: <IoIosTagsOutline />,
            title: 'Assign share',
            url: `product/${props.product.rowId}/assign-share`,
            disabled: !isOwner,
          },
          {
            icon: <IoEdit />,
            title: 'Edit Product',
            url: `product/${props.product.rowId}/edit`,
            disabled: !isOwner,
          },
        ]}
      />
      <ContentHeader text={props.product.name} />
      <MainContentWrapper
        right={<Accordion
          panels={[
            {
              header: {
                icon: <IoIosPeople width={58} height={40} />,
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
          <ContentSubheader icon={<IoDollar />} text={`${price}`} light />
          <ContentSubheader icon={<IoAsterisk />} text={`${props.product.creditsInitial} vouchers / share`} light />
          <ContentSubheader icon={<IoIosCalendar />} text={dates} light />
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
