import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
// Icons
import IoIosCalendar from 'react-icons/lib/io/ios-calendar-outline';
import IoEdit from 'react-icons/lib/io/edit';
import IoPerson from 'react-icons/lib/io/person';
import IoIosArrowRight from 'react-icons/lib/io/ios-arrow-thin-right';
import IoIosTagsOutline from 'react-icons/lib/io/ios-pricetags-outline';
import IoAsterisk from 'react-icons/lib/io/asterisk';
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
  const isOwner = props.share.productByProductId.organizationByOrganizationId.userByOwnerId.rowId
    === context.userId;
  const dates = props.share.startDate
    ? `from ${props.share.startDate} to ${props.share.endDate}`
    : 'dates not provided';
  const credits = `${props.share.creditsRemaining} credits remaining`;
  const distributions = props.share.distributionsByShareId.edges.map(edge => ({
    id: edge.node.id,
    status: edge.node.status,
    name: edge.node.description || '(No description)',
    itemId: edge.node.rowId,
    itemUrl: `/voucher/${edge.node.rowId}`,
    actionUrl: `/voucher/${edge.node.rowId}`,
    authorized: isOwner || isCardholder,
  }));

  if (props.share.userByUserId) {
    isCardholder = props.share.userByUserId.rowId === context.userId;
    userElem = <Link
      to={`/user/${props.share.userByUserId.rowId}`}
      className={classNames.link}
    >
      <ContentSubheader
        icon={<IoPerson width={24} height={24} />}
        text={`shareholder: ${props.share.userByUserId.name}`}
      />
    </Link>;
  } else {
    userElem = <ContentSubheader
      icon={<IoPerson width={24} height={24} />}
      text={`shareholder: ${props.share.customerName}`}
    />;
  }

  return <TransitionWrapper>
    <div className={classNames.this}>
      <Menu
        baseUrl={`/share/${props.share.rowId}`}
        header={{icon: <IoIosTagsOutline />, title: 'Share'}}
        disabled={!isOwner && !isCardholder}
        list={[
          {
            icon: <IoAsterisk />,
            title: 'Create Voucher',
            url: 'create-voucher',
            disabled: !isOwner && !isCardholder,
          },
          {
            icon: <IoEdit />,
            title: 'Edit Share',
            url: 'edit',
            disabled: !isOwner && !isCardholder,
          },
        ]}
      />
      <ContentHeader text={credits} />
      <MainContentWrapper
        right={<Accordion
          panels={isOwner || isCardholder
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
          <Link
            to={`/product/${props.share.productByProductId.rowId}`}
            className={classNames.link}
          >
            <ContentSubheader
              icon={<WheatIcon width={24} height={24} />}
              text={`product: ${props.share.productByProductId.name}`}
            />
          </Link>
          {userElem}
          <ContentSubheader
            icon={<IoIosEmail />}
            text={`contact: ${props.share.customerContact}`}
            light
          />
          <ContentSubheader
            icon={<IoIosArrowRight />}
            text={`comments: ${props.share.customerNotes}`}
            light
          />
          <ContentSubheader icon={<IoIosArrowRight />} text={`status: ${props.share.status}`} light />
          <ContentSubheader icon={<IoIosCalendar />} text={dates} light />
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
        price,
        status,
        creditsRemaining,
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
