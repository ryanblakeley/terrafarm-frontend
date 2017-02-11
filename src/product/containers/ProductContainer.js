import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
// Icons
import IoEdit from 'react-icons/lib/io/edit';
import IoDollar from 'react-icons/lib/io/social-usd-outline';
import IoIosCalendar from 'react-icons/lib/io/ios-calendar-outline';
import IoIosPeople from 'react-icons/lib/io/ios-people';
import IoIosTagsOutline from 'react-icons/lib/io/ios-pricetags-outline';
import IoIosTagOutline from 'react-icons/lib/io/ios-pricetag-outline';
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
  const isOwner = props.product.organizationByOrganizationId.userByOwnerId.rowId
    === context.userId;
  let isShareholder = false;
  const shareHolders = props.product.sharesByProductId.edges
    && props.product.sharesByProductId.edges.map(edge => {
      const customerName = edge.node.customerName;
      const user = edge.node.userByUserId;
      let itemUrl = null;

      if (edge.node.status === 'AVAILABLE'
        || edge.node.status === 'EXPIRED'
        || edge.node.status === 'CANCELED'
        || edge.node.status === 'EMPTY') {
        return null;
      }
      if (edge.node.userId === context.userId) {
        itemUrl = `/punch-card/${edge.node.rowId}`;
        isShareholder = true;
      } else if (isOwner) {
        itemUrl = `/punch-card/${edge.node.rowId}`;
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
        baseUrl={`/product/${props.product.rowId}`}
        header={{icon: <WheatIcon />, title: 'Product'}}
        disabled={!context.loggedIn || (!isOwner && isShareholder)}
        list={[
          {
            icon: <IoDollar />,
            title: 'Order punch card',
            url: 'order-punch-card',
            disabled: isOwner || isShareholder,
          },
          {
            icon: <IoEdit />,
            title: 'Edit',
            url: 'edit',
            disabled: !isOwner,
          },
          {
            icon: <IoIosTagsOutline />,
            title: 'Assign punch card',
            url: 'assign-punch-card',
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
                label: 'Card holders',
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
              text={`farm: ${props.product.organizationByOrganizationId.name}`}
            />
          </Link>
          <ContentSubheader icon={<IoDollar />} text={`${price} / card`} light />
          <ContentSubheader icon={<IoIosTagOutline />} text={`${props.product.creditsInitial} distributions / card`} light />
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
