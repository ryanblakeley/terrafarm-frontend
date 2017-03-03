import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
// Icons
import IoIosCalendar from 'react-icons/lib/io/ios-calendar-outline';
import IoEdit from 'react-icons/lib/io/edit';
import IoPerson from 'react-icons/lib/io/person';
import IoIosChatBubble from 'react-icons/lib/io/ios-chatbubble-outline';
import IoIosTagsOutline from 'react-icons/lib/io/ios-pricetags-outline';
import IoAsterisk from 'react-icons/lib/io/asterisk';
import IoKey from 'react-icons/lib/io/lock-combination';
import IoIosEmail from 'react-icons/lib/io/ios-email-outline';
import WheatIcon from 'product/components/WheatIcon';
// Components
import Accordion from 'shared/components/Accordion';
import RelationshipList from 'shared/components/RelationshipList';
import NotFoundPage from 'not-found/components/NotFoundPage';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
import ContentHeader from 'shared/components/ContentHeader';
import MainContentWrapper from 'shared/components/MainContentWrapper';
import ActionPanel from 'shared/components/ActionPanel';
import ContentSubheader from 'shared/components/ContentSubheader';

import classNames from '../styles/ProductShareContainerStylesheet.css';

const ProductShareContainer = (props, context) => {
  if (!props.share) {
    return <NotFoundPage message={'Punch card not found.'} />;
  }
  let isCardholder = false;
  let userElem;
  const isFarmOwner = props.share.productByProductId
    .organizationByOrganizationId.userByOwnerId.rowId === context.userId;
  const dates = props.share.startDate
    ? `from ${props.share.startDate} to ${props.share.endDate}`
    : 'dates not provided';
  const creditsRemaining = props.share.creditsInitial - props.share
    .distributionsByShareId.edges.filter(edge => (
      edge.node.status === 'RECEIVED' || edge.node.status === 'DONATED'
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
        icon={<IoPerson width={24} height={24} />}
        text={props.share.userByUserId.name}
      />
    </Link>;
  } else {
    userElem = <ContentSubheader
      icon={<IoPerson width={24} height={24} />}
      text={props.share.customerName}
    />;
  }

  return <TransitionWrapper>
    <div className={classNames.this}>
      <Menu
        baseUrl={`/share/${props.share.rowId}`}
        header={{icon: <IoIosTagsOutline />, title: 'Share'}}
        disabled={!isFarmOwner && !isCardholder}
        list={[
          {
            icon: <IoAsterisk />,
            title: 'Activate Share',
            url: isFarmOwner ? `validate-token/${props.share.token}` : 'validate-token',
            disabled: (!isFarmOwner && !isCardholder) || props.share.status === 'PURCHASED',
          },
          {
            icon: <IoAsterisk />,
            title: 'Create Voucher',
            url: 'create-voucher',
            disabled: !isFarmOwner && !isCardholder,
          },
          {
            icon: <IoEdit />,
            title: 'Edit Share',
            url: 'edit',
            disabled: !isFarmOwner && !isCardholder,
          },
        ]}
      />
      <ContentHeader text={`status: ${props.share.status}`} />
      <MainContentWrapper
        right={<Accordion
          panels={isFarmOwner || isCardholder
            ? [{
              header: {
                icon: <IoAsterisk width={58} height={40} />,
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
              icon={<IoKey />}
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
          <ContentSubheader icon={<IoIosCalendar />} text={dates} light />
          {props.share.status === 'PURCHASED'
            && <ContentSubheader icon={<IoAsterisk />} text={credits} light />}
          <ContentSubheader
            icon={<IoIosEmail />}
            text={props.share.customerContact}
            light
          />
          {props.share.customerNotes
            && <ContentSubheader
              icon={<IoIosChatBubble />}
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
