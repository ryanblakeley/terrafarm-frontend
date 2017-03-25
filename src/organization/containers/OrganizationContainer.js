import React from 'react';
import Relay from 'react-relay';
import equal from 'deep-equal';
import {
  EditIcon,
  ExternalLinkIcon,
  PersonIcon,
  AsteriskIcon,
  BarnIcon,
  WheatIcon,
  LocationOutlineIcon,
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

class OrganizationContainer extends React.Component {
  state = {
    relayVariables: {
      count: 8,
    },
  };
  componentWillMount () {
    const {organization} = this.props;
    const {router, location} = this.context;
    const {relayVariables} = this.state;

    if (organization.productsByOrganizationId.totalCount > relayVariables.count) {
      router.replace(Object.assign(location, {
        state: {loadMore: true},
      }));
    }
  }
  componentWillReceiveProps (nextProps, nextContext) {
    const {organization} = this.props;
    const {router} = this.context;
    const {relayVariables} = this.state;
    const nextQuery = nextContext.location.query;
    const loadMore = nextContext.location.state && nextContext.location.state.loadMore;

    if (nextQuery.count > relayVariables.count) {
      this.changeRelayVars({count: nextQuery.count});
    }

    if (loadMore
      && nextQuery.count > organization.productsByOrganizationId.totalCount) {
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

    return <TransitionWrapper>
      <Layout page>
        <Menu
          baseUrl={`/farm/${props.organization.rowId}`}
          header={{icon: <BarnIcon />, title: 'Farm'}}
          disabled={props.organization.userByOwnerId.rowId !== context.userId}
          list={[
            {
              icon: <AsteriskIcon />,
              title: 'Accept Voucher',
              url: 'accept-voucher',
            },
            {
              icon: <WheatIcon />,
              title: 'Create Product',
              url: 'create-product',
            },
            {
              icon: <EditIcon />,
              title: 'Edit Farm',
              url: 'edit',
            },
          ]}
        />
        <H3>{props.organization.name}</H3>
        <MainContentWrapper
          right={<Accordion
            panels={[
              {
                header: {
                  icon: <WheatIcon />,
                  label: 'Products',
                },
                body: (<RelationshipList
                  listItems={props.organization.productsByOrganizationId
                    .edges.map(edge => ({
                      id: edge.node.id,
                      name: edge.node.name,
                      itemUrl: `/product/${edge.node.rowId}`,
                    }))
                  }
                />),
              },
            ]}
          />}
          left={<div>
            <ActionPanel
              children={props.children}
              notifyClose={() => {
                context.router.replace(`/farm/${props.organization.rowId}`);
              }}
            />
            <ContentSubheader
              icon={<LocationOutlineIcon />}
              text={(props.organization.placeByPlaceId
                && props.organization.placeByPlaceId.address)
                || <WarningMessage />
              }
              light
            />
            <ContentSubheader
              icon={<PersonIcon />}
              text={props.organization.userByOwnerId.name}
              url={`/user/${props.organization.userByOwnerId.rowId}`}
            />
            {props.organization.url && <ContentSubheader
              icon={<ExternalLinkIcon />}
              text={<A href={props.organization.url}>{props.organization.url}</A>}
              light
            />}
            <P>{props.organization.description}</P>
            <HeroImage image={props.organization.imageUrl} />
          </div>}
        />
      </Layout>
    </TransitionWrapper>;
  }
}

OrganizationContainer.propTypes = {
  organization: React.PropTypes.object,
  children: React.PropTypes.object,
  relay: React.PropTypes.object,
};

OrganizationContainer.contextTypes = {
  loggedIn: React.PropTypes.bool,
  router: React.PropTypes.object,
  location: React.PropTypes.object,
  userId: React.PropTypes.string,
};

export default Relay.createContainer(OrganizationContainer, {
  initialVariables: {
    organizationId: null,
    count: 8,
  },
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        rowId,
        name,
        imageUrl,
        description,
        url,
        placeByPlaceId {
          address,
        },
        userByOwnerId {
          id,
          rowId,
          name,
        },
        productsByOrganizationId(first:$count) {
          totalCount,
          edges {
            node {
              id,
              rowId,
              name,
            }
          }
        },
      }
    `,
  },
});
