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
import {H3, Link} from 'shared/components/Typography';
import Accordion from 'shared/components/Accordion';
import RelationshipList from 'shared/components/RelationshipList';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
import MainContentWrapper from 'shared/components/MainContentWrapper';
import ActionPanel from 'shared/components/ActionPanel';
import ContentSubheader from 'shared/components/ContentSubheader';

import classNames from '../styles/ProductShareContainerStylesheet.css';

const ProductShareContainer = (props, context) => {
  let isCardholder = false;
  let userElem;
  const isFarmOwner = props.share.productByProductId
    .organizationByOrganizationId.userByOwnerId.rowId === context.userId;
  const dates = props.share.startDate
    ? `from ${props.share.startDate} to ${props.share.endDate}`
    : 'dates not provided';
  const creditsRemaining = props.share.creditsInitial - props.share
    .distributionsByShareId.edges.filter(edge => (
      edge.node.status === 'RECEIVED' || edge.node.status === 'VALIDATED'
    )).length;
  const credits = `${creditsRemaining} credits remaining / ${props.share.creditsInitial}`;
  const distributions = props.share.distributionsByShareId.edges.map(edge => ({
    id: edge.node.id,
    status: edge.node.status,
    name: edge.node.description || '(No description)',
    itemId: edge.node.rowId,
    itemUrl: `/voucher/${edge.node.rowId}`,
    actionUrl: `/voucher/${edge.node.rowId}`,
    authorized: isFarmOwner || isCardholder,
  }));

  if (props.share.userByUserId) {
    isCardholder = props.share.userByUserId.rowId === context.userId;
    userElem = <Link
      to={`/user/${props.share.userByUserId.rowId}`}
      className={classNames.link}
    >
      <ContentSubheader
        icon={<PersonIcon width={24} height={24} />}
        text={props.share.userByUserId.name}
      />
    </Link>;
  } else {
    userElem = <ContentSubheader
      icon={<PersonIcon width={24} height={24} />}
      text={props.share.customerName}
    />;
  }

  return <TransitionWrapper>
    <div className={classNames.this}>
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
          <Link
            to={`/product/${props.share.productByProductId.rowId}`}
            className={classNames.link}
          >
            <ContentSubheader
              icon={<WheatIcon width={24} height={24} />}
              text={props.share.productByProductId.name}
            />
          </Link>
          <ContentSubheader icon={<CalendarIcon />} text={dates} light />
          {props.share.status === 'PURCHASED'
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
    </div>
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
