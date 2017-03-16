import React from 'react';
import Relay from 'react-relay';
import {
  EditIcon,
  PersonIcon,
  TokenIcon,
  ArrowLeftIcon,
  ChatBubbleIcon,
  AsteriskIcon,
  WheatIcon,
  CheckmarkIcon,
  TrashIcon,
} from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import {H3} from 'shared/components/Typography';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
import ActionPanel from 'shared/components/ActionPanel';
import MainContentWrapper from 'shared/components/MainContentWrapper';
import ContentSubheader from 'shared/components/ContentSubheader';

const DistributionContainer = (props, context) => {
  const organizationId = props.distribution.shareByShareId.productByProductId.organizationId;
  const isOwner = props.distribution.shareByShareId.productByProductId
    .organizationByOrganizationId.userByOwnerId.rowId === context.userId;
  const isCardholder = props.distribution.shareByShareId.userId === context.userId;
  const shareholderIsUser = !!props.distribution.shareByShareId.userByUserId;
  let userElem;

  if (shareholderIsUser) {
    userElem = <ContentSubheader
      icon={<PersonIcon width={24} height={24} />}
      text={props.distribution.shareByShareId.userByUserId.name}
      url={`/user/${props.distribution.shareByShareId.userByUserId.rowId}`}
    />;
  } else {
    userElem = <ContentSubheader
      icon={<PersonIcon />}
      text={props.distribution.shareByShareId.customerName}
    />;
  }

  return <TransitionWrapper>
    <Layout page>
      <Menu
        baseUrl={''}
        header={{icon: <AsteriskIcon />, title: 'Voucher'}}
        disabled={!isOwner && !isCardholder}
        list={[
          {
            icon: <CheckmarkIcon />,
            title: 'Validate Voucher',
            url: `voucher/${props.distribution.rowId}/validate/${props.distribution.token}`,
            disabled: (!isCardholder && shareholderIsUser)
              || props.distribution.status === 'VALIDATED'
              || props.distribution.status === 'CANCELED',
          },
          {
            icon: <CheckmarkIcon />,
            title: 'Validate Voucher',
            url: `farm/${organizationId}/accept-voucher`,
            disabled: !shareholderIsUser || !isOwner
              || props.distribution.status === 'VALIDATED'
              || props.distribution.status === 'CANCELED',
          },
          {
            icon: <TrashIcon />,
            title: 'Cancel Voucher',
            url: `voucher/${props.distribution.rowId}/cancel`,
            disabled: (!isCardholder && !isOwner)
              || props.distribution.status === 'VALIDATED'
              || props.distribution.status === 'CANCELED',
          },
          {
            icon: <EditIcon />,
            title: 'Edit Voucher',
            url: `voucher/${props.distribution.rowId}/edit`,
            disabled: !isOwner && !isCardholder,
          },
        ]}
      />
      <H3>{`status: ${props.distribution.status}`}</H3>
      <MainContentWrapper
        right={<div />}
        left={<div>
          <ActionPanel
            children={props.children}
            notifyClose={() => {
              context.router.replace(`/voucher/${props.distribution.rowId}`);
            }}
          />
          {(isCardholder || (isOwner && !shareholderIsUser))
            && (props.distribution.status === 'PLANNED'
            || props.distribution.status === 'HARVESTED'
            || props.distribution.status === 'READY')
            && <ContentSubheader
              icon={<TokenIcon />}
              text={props.distribution.token}
              light
            />}
          {userElem}
          <ContentSubheader
            icon={<WheatIcon width={24} height={24} />}
            text={props.distribution.shareByShareId.productName}
            url={`/product/${props.distribution.shareByShareId.productId}`}
          />
          {props.distribution.description && <ContentSubheader
            icon={<ChatBubbleIcon />}
            text={props.distribution.description}
            light
          />}
          <ContentSubheader
            icon={<ArrowLeftIcon />}
            text={'back to share'}
            url={`/share/${props.distribution.shareByShareId.rowId}`}
            light
          />
        </div>}
      />
    </Layout>
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
