import React from 'react';
import Relay from 'react-relay';
import equal from 'deep-equal';
import {
  CalendarIcon,
  EditIcon,
  PersonIcon,
  ChatBubbleIcon,
  TagsIcon,
  AsteriskIcon,
  TokenIcon,
  EmailIcon,
  WheatIcon,
  CheckmarkIcon,
  TrashIcon,
} from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import {H3, WarningMessage} from 'shared/components/Typography';
import Accordion from 'shared/components/Accordion';
import RelationshipList from 'shared/components/RelationshipList';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
import MainContentWrapper from 'shared/components/MainContentWrapper';
import ActionPanel from 'shared/components/ActionPanel';
import ContentSubheader from 'shared/components/ContentSubheader';

class ProductShareContainer extends React.Component {
  state = {
    relayVariables: {
      count: 8,
    },
  };
  componentWillMount () {
    const {share} = this.props;
    const {router, location} = this.context;
    const {relayVariables} = this.state;

    if (share.distributionsByShareId.totalCount > relayVariables.count) {
      router.replace(Object.assign(location, {
        state: {loadMore: true},
      }));
    }
  }
  componentWillReceiveProps (nextProps, nextContext) {
    const {share} = this.props;
    const {router} = this.context;
    const {relayVariables} = this.state;
    const nextQuery = nextContext.location.query;
    const loadMore = nextContext.location.state && nextContext.location.state.loadMore;

    if (nextQuery.count > relayVariables.count) {
      this.changeRelayVars({count: nextQuery.count});
    }

    if (loadMore
      && nextQuery.count > share.distributionsByShareId.totalCount) {
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
    let isCardholder = false;
    let userElem;
    const isFarmOwner = props.share.productByProductId
      .organizationByOrganizationId.userByOwnerId.rowId === context.userId;
    const dates = props.share.startDate
      ? `from ${props.share.startDate} to ${props.share.endDate}`
      : <WarningMessage />;
    const creditsRemaining = props.share.creditsInitial - props.share
      .distributionsByShareId.edges.filter(edge => (
        edge.node.status === 'VALIDATED' // || edge.node.status === 'RECEIVED'
      )).length;
    const credits = `${creditsRemaining} credits remaining / ${props.share.creditsInitial}`;

    if (props.share.userByUserId) {
      isCardholder = props.share.userByUserId.rowId === context.userId;
      userElem = <ContentSubheader
        icon={<PersonIcon />}
        text={props.share.userByUserId.name}
        url={`/user/${props.share.userByUserId.rowId}`}
      />;
    } else {
      userElem = <ContentSubheader
        icon={<PersonIcon />}
        text={props.share.customerName}
      />;
    }

    const distributions = props.share.distributionsByShareId.edges.map(edge => ({
      id: edge.node.id,
      status: edge.node.status,
      name: edge.node.description || <WarningMessage>(No description)</WarningMessage>,
      itemId: edge.node.rowId,
      itemUrl: `/voucher/${edge.node.rowId}`,
      actionUrl: `/voucher/${edge.node.rowId}`,
      authorized: isFarmOwner || isCardholder,
    }));

    return <TransitionWrapper>
      <Layout page>
        <Menu
          baseUrl={`/share/${props.share.rowId}`}
          header={{icon: <TagsIcon />, title: 'Share'}}
          disabled={!isFarmOwner && !isCardholder}
          list={[
            {
              icon: <CheckmarkIcon />,
              title: 'Activate Share',
              url: isFarmOwner ? `activate/${props.share.token}` : 'activate',
              disabled: (!isFarmOwner && !isCardholder)
                || props.share.status !== 'RESERVED',
            },
            {
              icon: <TrashIcon />,
              title: 'Cancel Share',
              url: 'cancel',
              disabled: (!isFarmOwner && !isCardholder)
                || props.share.status !== 'RESERVED',
            },
            {
              icon: <AsteriskIcon />,
              title: 'Create Voucher',
              url: 'create-voucher',
              disabled: (!isFarmOwner && !isCardholder)
                || props.share.status !== 'ACTIVE',
            },
            {
              icon: <EditIcon />,
              title: 'Edit Share',
              url: 'edit',
              disabled: !isFarmOwner && !isCardholder,
            },
          ]}
        />
        <H3>{`status: ${props.share.status}`}</H3>
        <MainContentWrapper
          right={<Accordion
            panels={isFarmOwner || isCardholder
              ? [{
                header: {
                  icon: <AsteriskIcon width={58} height={40} />,
                  label: 'Vouchers',
                },
                body: <RelationshipList listItems={distributions} />,
              }]
              : []
            }
          />}
          left={<div>
            <ActionPanel
              children={props.children}
              notifyClose={() => {
                context.router.replace(`/share/${props.share.rowId}`);
              }}
            />
            {isFarmOwner
              && props.share.status === 'RESERVED'
              && <ContentSubheader
                icon={<TokenIcon />}
                text={props.share.token}
                light
              />}
            {userElem}
            <ContentSubheader
              icon={<WheatIcon width={24} height={24} />}
              text={props.share.productByProductId.name}
              url={`/product/${props.share.productByProductId.rowId}`}
            />
            <ContentSubheader icon={<CalendarIcon />} text={dates} light />
            {(props.share.status === 'ACTIVE' || props.share.status === 'RENEWED')
              && <ContentSubheader icon={<AsteriskIcon />} text={credits} light />}
            <ContentSubheader
              icon={<EmailIcon />}
              text={props.share.customerContact}
              light
            />
            {props.share.customerNotes
              && <ContentSubheader
                icon={<ChatBubbleIcon />}
                text={props.share.customerNotes}
                light
              />}
          </div>}
        />
      </Layout>
    </TransitionWrapper>;
  }
}

ProductShareContainer.propTypes = {
  share: React.PropTypes.object,
  children: React.PropTypes.object,
  relay: React.PropTypes.object,
};

ProductShareContainer.contextTypes = {
  loggedIn: React.PropTypes.bool,
  router: React.PropTypes.object,
  location: React.PropTypes.object,
  userId: React.PropTypes.string,
};

export default Relay.createContainer(ProductShareContainer, {
  initialVariables: {
    shareId: null,
    count: 8,
  },
  fragments: {
    share: () => Relay.QL`
      fragment on Share {
        rowId,
        customerName,
        customerContact,
        customerNotes,
        startDate,
        endDate,
        token,
        status,
        creditsInitial,
        productByProductId {
          rowId,
          name,
          organizationByOrganizationId {
            userByOwnerId {
              rowId,
            }
          }
        },
        userByUserId {
          rowId,
          name,
        },
        distributionsByShareId(first:$count) {
          totalCount,
          edges {
            node {
              id,
              rowId,
              status,
              description,
            }
          }
        },
      }
    `,
  },
});
