import React from 'react';
import Relay from 'react-relay';
import equal from 'deep-equal';
import {
  EditIcon,
  ExternalLinkIcon,
  DollarIcon,
  CalendarIcon,
  PeopleIcon,
  TagsIcon,
  AsteriskIcon,
  WheatIcon,
  BarnIcon,
} from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import {H3, P, A, WarningMessage} from 'shared/components/Typography';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
import MainContentWrapper from 'shared/components/MainContentWrapper';
import HeroImage from 'shared/components/HeroImage';
import Accordion from 'shared/components/Accordion';
import RelationshipList from 'shared/components/RelationshipList';
import ActionPanel from 'shared/components/ActionPanel';
import ContentSubheader from 'shared/components/ContentSubheader';

class ProductContainer extends React.Component {
  state = {
    relayVariables: {
      count: 8,
    },
  };
  componentWillMount () {
    const {product} = this.props;
    const {router, location} = this.context;
    const {relayVariables} = this.state;

    if (product.sharesByProductId.totalCount > relayVariables.count) {
      router.replace(Object.assign(location, {
        state: {loadMore: true},
      }));
    }
  }
  componentWillReceiveProps (nextProps, nextContext) {
    const {product} = this.props;
    const {router} = this.context;
    const {relayVariables} = this.state;
    const nextQuery = nextContext.location.query;
    const loadMore = nextContext.location.state && nextContext.location.state.loadMore;

    if (nextQuery.count > relayVariables.count) {
      this.changeRelayVars({count: nextQuery.count});
    }

    if (loadMore
      && nextQuery.count > product.sharesByProductId.totalCount) {
      router.replace(Object.assign(nextContext.location, {
        state: {loadMore: false},
      }));
    }
  }
  changeRelayVars = patch => {
    const {relay} = this.props;
    const {relayVariables} = this.state;
    const newVariables = {
      count: patch.count || relayVariables.count,
    };

    if (!equal(relayVariables, newVariables)) {
      relay.setVariables(newVariables);
      this.setState({ relayVariables: newVariables });
    }
  }
  render () {
    const {props, context} = this;
    const isOwner = props.product.organizationByOrganizationId.userByOwnerId.rowId
      === context.userId;
    let isShareholder = false;
    let currentPersonShareId = '';
    const shareHolderIds = [];
    const shareHolders = props.product.sharesByProductId.edges
      && props.product.sharesByProductId.edges.map(edge => {
        const customerName = edge.node.customerName;
        const user = edge.node.userByUserId;

        if (shareHolderIds.indexOf((user && user.id) || customerName) > -1) {
          return {};
        }
        shareHolderIds.push((user && user.id) || customerName);

        if (edge.node.status === 'CANCELED'
          || edge.node.status === 'EXPIRED') {
          return {};
        }

        if (edge.node.userId && edge.node.userId === context.userId) {
          isShareholder = true;
          currentPersonShareId = edge.node.rowId;
        }

        if (user) {
          return {
            id: user.id,
            name: user.name,
            actionUrl: `/share/${edge.node.rowId}`,
            status: edge.node.status,
            authorized: isOwner || isShareholder,
            alert: currentPersonShareId === edge.node.rowId,
            itemId: user.rowId,
            itemUrl: `/user/${user.rowId}`,
          };
        }
        return {
          id: customerName,
          name: customerName,
          actionUrl: `/share/${edge.node.rowId}`,
          status: edge.node.status,
          authorized: isOwner,
        };
      });
    const price = props.product.sharePrice
      ? `${props.product.sharePrice}`
      : <WarningMessage />;
    const dates = props.product.startDate
      ? `from ${props.product.startDate} to ${props.product.endDate}`
      : <WarningMessage />;

    return <TransitionWrapper>
      <Layout page>
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
            <ContentSubheader
              icon={<BarnIcon />}
              text={props.product.organizationByOrganizationId.name}
              url={`/farm/${props.product.organizationByOrganizationId.rowId}`}
            />
            <ContentSubheader icon={<DollarIcon />} text={`${price}`} light />
            <ContentSubheader icon={<AsteriskIcon />} text={`${props.product.creditsInitial} distributions / share`} light />
            <ContentSubheader icon={<CalendarIcon />} text={dates} light />
            {props.product.url && <ContentSubheader
              icon={<ExternalLinkIcon />}
              text={<A href={props.product.url}>{props.product.url}</A>}
              light
            />}
            <P>{props.product.description}</P>
            <HeroImage image={props.product.imageUrl} />
          </div>}
        />
      </Layout>
    </TransitionWrapper>;
  }
}

ProductContainer.propTypes = {
  product: React.PropTypes.object,
  children: React.PropTypes.object,
  relay: React.PropTypes.object,
};

ProductContainer.contextTypes = {
  loggedIn: React.PropTypes.bool,
  router: React.PropTypes.object,
  location: React.PropTypes.object,
  userId: React.PropTypes.string,
};

export default Relay.createContainer(ProductContainer, {
  initialVariables: {
    productId: null,
    count: 8,
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
        url,
        organizationByOrganizationId {
          id,
          rowId,
          name,
          userByOwnerId {
            rowId,
          },
        },
        sharesByProductId(first:$count) {
          totalCount,
          edges {
            node {
              rowId,
              status,
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
