import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
// Icons
import IoEdit from 'react-icons/lib/io/edit';
import IoPerson from 'react-icons/lib/io/person';
import IoKey from 'react-icons/lib/io/lock-combination';
import IoIosArrowLeft from 'react-icons/lib/io/ios-arrow-thin-left';
import IoIosChatBubble from 'react-icons/lib/io/ios-chatbubble-outline';
import IoAsterisk from 'react-icons/lib/io/asterisk';
import WheatIcon from 'product/components/WheatIcon';
// Components
import NotFoundPage from 'not-found/components/NotFoundPage';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
import ContentHeader from 'shared/components/ContentHeader';
import ActionPanel from 'shared/components/ActionPanel';
import MainContentWrapper from 'shared/components/MainContentWrapper';
import ContentSubheader from 'shared/components/ContentSubheader';

import classNames from '../styles/DistributionContainerStylesheet.css';

const DistributionContainer = (props, context) => {
  if (!props.distribution) {
    return <NotFoundPage message={'Voucher not found.'} />;
  }
  const organizationId = props.distribution.shareByShareId.productByProductId.organizationId;
  const isOwner = props.distribution.shareByShareId.productByProductId
    .organizationByOrganizationId.userByOwnerId.rowId === context.userId;
  const isCardholder = props.distribution.shareByShareId.userId === context.userId;
  const shareholderIsUser = !!props.distribution.shareByShareId.userByUserId;
  let userElem;

  if (shareholderIsUser) {
    userElem = <Link
      to={`/user/${props.distribution.shareByShareId.userByUserId.rowId}`}
      className={classNames.link}
    >
      <ContentSubheader
        icon={<IoPerson width={24} height={24} />}
        text={props.distribution.shareByShareId.userByUserId.name}
      />
    </Link>;
  } else {
    userElem = <ContentSubheader
      icon={<IoPerson width={24} height={24} />}
      text={props.distribution.shareByShareId.customerName}
    />;
  }

  return <TransitionWrapper>
    <div className={classNames.this}>
      <Menu
        baseUrl={''}
        header={{icon: <IoAsterisk />, title: 'Voucher'}}
        disabled={!isOwner && !isCardholder}
        list={[
          {
            icon: <IoAsterisk />,
            title: 'Validate Voucher',
            url: `voucher/${props.distribution.rowId}/process-token/${props.distribution.token}`,
            disabled: (!isCardholder && shareholderIsUser) || props.distribution.status === 'RECEIVED',
          },
          {
            icon: <IoAsterisk />,
            title: 'Validate Voucher',
            url: `farm/${organizationId}/accept-voucher`,
            disabled: !isOwner || props.distribution.status === 'RECEIVED',
          },
          {
            icon: <IoEdit />,
            title: 'Edit Voucher',
            url: `voucher/${props.distribution.rowId}/edit`,
            disabled: !isOwner && !isCardholder,
          },
        ]}
      />
      <ContentHeader text={`status: ${props.distribution.status}`} />
      <MainContentWrapper
        right={<div />}
        left={<div>
          <ActionPanel
            children={props.children}
            notifyClose={() => {
              context.router.replace(`/voucher/${props.distribution.rowId}`);
            }}
          />
          {isCardholder
            && (props.distribution.status === 'PLANNED' || props.distribution.status === 'HARVESTED')
            && <ContentSubheader
              icon={<IoKey />}
              text={props.distribution.token}
              light
            />}
          {userElem}
          <Link
            to={`/product/${props.distribution.shareByShareId.productId}`}
            className={classNames.link}
          >
            <ContentSubheader
              icon={<WheatIcon width={24} height={24} />}
              text={props.distribution.shareByShareId.productName}
            />
          </Link>
          {props.distribution.description && <ContentSubheader
            icon={<IoIosChatBubble />}
            text={props.distribution.description}
            light
          />}
          <Link
            to={`/share/${props.distribution.shareByShareId.rowId}`}
            className={classNames.link}
          >
            <ContentSubheader
              icon={<IoIosArrowLeft />}
              text={'back to share'}
              light
            />
          </Link>
        </div>}
      />
    </div>
  </TransitionWrapper>;
};

DistributionContainer.propTypes = {
  distribution: React.PropTypes.object,
  children: React.PropTypes.object,
};

DistributionContainer.contextTypes = {
  loggedIn: React.PropTypes.bool,
  router: React.PropTypes.object,
  userId: React.PropTypes.string,
};

export default Relay.createContainer(DistributionContainer, {
  initialVariables: {
    distributionId: null,
  },
  fragments: {
    distribution: () => Relay.QL`
      fragment on Distribution {
        rowId,
        status,
        token,
        description,
        shareByShareId {
          rowId,
          productName,
          productId,
          customerName,
          userId,
          userByUserId {
            rowId,
            name,
          },
          productByProductId {
            organizationId,
            organizationByOrganizationId {
              userByOwnerId {
                rowId,
              }
            }
          }
        },
      }
    `,
  },
});
