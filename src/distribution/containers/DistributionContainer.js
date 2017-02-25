import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
// Icons
import IoEdit from 'react-icons/lib/io/edit';
import IoPerson from 'react-icons/lib/io/person';
import IoKey from 'react-icons/lib/io/key';
import IoIosArrowLeft from 'react-icons/lib/io/ios-arrow-thin-left';
import IoIosArrowRight from 'react-icons/lib/io/ios-arrow-thin-right';
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
  const isOwner = props.distribution.shareByShareId.productByProductId
    .organizationByOrganizationId.userByOwnerId.rowId === context.userId;
  const isCardholder = props.distribution.shareByShareId.userId === context.userId;
  let userElem;

  if (props.distribution.shareByShareId.userByUserId) {
    userElem = <Link
      to={`/user/${props.distribution.shareByShareId.userByUserId.rowId}`}
      className={classNames.link}
    >
      <ContentSubheader
        icon={<IoPerson width={24} height={24} />}
        text={`shareholder: ${props.distribution.shareByShareId.userByUserId.name}`}
      />
    </Link>;
  } else {
    userElem = <ContentSubheader
      icon={<IoPerson width={24} height={24} />}
      text={`shareholder: ${props.distribution.shareByShareId.customerName}`}
    />;
  }

  return <TransitionWrapper>
    <div className={classNames.this}>
      <Menu
        baseUrl={`/voucher/${props.distribution.rowId}`}
        header={{icon: <IoAsterisk />, title: 'Voucher'}}
        disabled={!isOwner && !isCardholder}
        list={[
          {
            icon: <IoEdit />,
            title: 'Edit Voucher',
            url: 'edit',
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
          <Link
            to={`/product/${props.distribution.shareByShareId.productId}`}
            className={classNames.link}
          >
            <ContentSubheader
              icon={<WheatIcon width={24} height={24} />}
              text={`product: ${props.distribution.shareByShareId.productName}`}
            />
          </Link>
          {userElem}
          {isCardholder && <ContentSubheader
            icon={<IoKey />}
            text={`token: ${props.distribution.token}`}
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
          {props.distribution.description && <ContentSubheader
            icon={<IoIosArrowRight />}
            text={`comments: ${props.distribution.description}`}
            light
          />}
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
