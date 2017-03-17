import React from 'react';
import Relay from 'react-relay';
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

const ProductShareContainer = (props, context) => {
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
};

ProductShareContainer.propTypes = {
  share: React.PropTypes.object,
  children: React.PropTypes.object,
};

ProductShareContainer.contextTypes = {
  loggedIn: React.PropTypes.bool,
  router: React.PropTypes.object,
  userId: React.PropTypes.string,
};

export default Relay.createContainer(ProductShareContainer, {
  initialVariables: {
    shareId: null,
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
        distributionsByShareId(first: 15) {
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
