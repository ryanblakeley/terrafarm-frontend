import React from 'react';
import Relay from 'react-relay';

class Container extends React.Component {
  static propTypes = {
    distributionByDistributionToken: React.PropTypes.object,
    organization: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
    children: React.PropTypes.object,
  };
  static contextTypes = {
    router: React.PropTypes.object,
  };
  componentWillMount () {
    const {organization, currentPerson, distributionByDistributionToken} = this.props;
    const isFarmOwner = organization.ownerId === currentPerson.rowId;
    const isFarmProduct = distributionByDistributionToken
      && organization.rowId === distributionByDistributionToken
        .shareByShareId.productByProductId.organizationId;
    const valid = distributionByDistributionToken
      && (distributionByDistributionToken.status === 'PLANNED'
      || distributionByDistributionToken.status === 'HARVESTED'
      || distributionByDistributionToken.status === 'READY');

    if (valid && isFarmOwner && isFarmProduct) {
      this.forwardVoucherAndToken();
    } else {
      this.returnToLookupVoucher();
    }
  }
  forwardVoucherAndToken () {
    const { distributionByDistributionToken } = this.props;
    const {router} = this.context;

    router.replace(`/voucher/${distributionByDistributionToken.rowId}/validate/${distributionByDistributionToken.token}`);
  }
  returnToLookupVoucher () {
    const {organization} = this.props;
    const {router} = this.context;

    router.replace(`/farm/${organization.rowId}/accept-voucher`);
  }
  render () {
    // TODO if distributionByDistributionToken && authorized show "Forwarding..." message
    return null;
  }
}

export default Relay.createContainer(Container, {
  initialVariables: {
    distributionToken: null,
    organizationId: null,
  },
  fragments: {
    distributionByDistributionToken: () => Relay.QL`
      fragment on Distribution {
        id,
        rowId,
        token,
        description,
        status,
        shareByShareId {
          productByProductId {
            organizationId,
          }
        },
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        rowId,
      }
    `,
    organization: () => Relay.QL`
      fragment on Organization {
        ownerId,
        rowId,
      }
    `,
  },
});
