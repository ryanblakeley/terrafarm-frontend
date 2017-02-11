import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
// Icons
import IoEdit from 'react-icons/lib/io/edit';
import IoDollar from 'react-icons/lib/io/social-usd-outline';
import IoIosCalendar from 'react-icons/lib/io/ios-calendar-outline';
import IoIosPeople from 'react-icons/lib/io/ios-people';
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

  const shareHolders = props.product.sharesByProductId.edges
    && props.product.sharesByProductId.edges.map(edge => {
      const customerName = edge.node.customerName;
      const user = edge.node.userByUserId;
      if (user) {
        return {
          id: user.id,
          name: user.name,
          itemId: user.rowId,
          itemUrl: `/user/${user.rowId}`,
        };
      }
      return {
        id: customerName,
        name: customerName,
      };
    });

  const price = props.product.sharePrice
    ? `${props.product.sharePrice} per share`
    : 'Price not provided';
  const dates = props.product.startDate
    ? `${props.product.startDate} to ${props.product.endDate}`
    : 'Dates not provided';

  return <TransitionWrapper>
    <div className={classNames.this}>
      <Menu
        baseUrl={`/product/${props.product.rowId}`}
        header={{icon: <WheatIcon />, title: 'Product'}}
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
                icon: <IoIosPeople />,
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
          <ContentSubheader icon={<IoIosCalendar />} text={dates} light />
          <ContentSubheader icon={<IoDollar />} text={price} light />
          <ContentSubheader icon={<IoIosPeople />} text={`${props.product.maxShares} shares max`} light />
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
