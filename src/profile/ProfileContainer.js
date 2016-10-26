import React from 'react';
import Relay from 'react-relay';
import IoIosBriefcase from 'react-icons/lib/io/ios-briefcase';
import IoCube from 'react-icons/lib/io/cube';
import IoIosPaperOutline from 'react-icons/lib/io/ios-paper-outline';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import HeroImage from '../shared/components/HeroImage';
import RelationshipList from '../shared/components/RelationshipList';
import ProfileActionTabs from './components/ProfileActionTabs';
import classNames from './styles/ProfileContainerStylesheet.css';

const ProfileContainer = props => <TransitionWrapper>
  <div className={classNames.this}>
    <ProfileActionTabs user={props.user} query={props.query} />
    <h3 className={classNames.contentHeading}>{props.user.name}</h3>
    <h4 className={classNames.contentSubheading}>
      <span className={classNames.location}>{props.user.location}</span>
    </h4>
    <HeroImage image={props.user.imageUrl} />
    <p className={classNames.description}>{props.user.description}</p>
    <RelationshipList
      icon={<IoIosBriefcase />}
      title={'Organizations'}
      pathname={'organization'}
      listItems={props.user.organizationMembersByMemberId.edges.map(edge => ({
        id: edge.node.organizationByOrganizationId.id,
        name: edge.node.organizationByOrganizationId.name,
      }))}
    />
    <RelationshipList
      icon={<IoIosPaperOutline />}
      title={'Tasks'}
      pathname={'task'}
      listItems={props.user.tasksByAuthorId.edges.map(edge => ({
        id: edge.node.id,
        name: edge.node.name,
      }))}
    />
    <RelationshipList
      icon={<IoCube />}
      title={'Resources'}
      pathname={'resource'}
      listItems={props.user.resourcesByOwnerId.edges.map(edge => ({
        id: edge.node.id,
        name: edge.node.name,
      }))}
    />
  </div>
</TransitionWrapper>;

ProfileContainer.propTypes = {
  user: React.PropTypes.object,
  query: React.PropTypes.object,
};

export default Relay.createContainer(ProfileContainer, {
  initialVariables: {
    userId: null,
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name,
        location
        imageUrl,
        description,
        organizationMembersByMemberId(first: 5) {
          edges {
            node {
              organizationByOrganizationId {
                id,
                name,
              }
            }
          }
        },
        resourcesByOwnerId(first: 10) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        tasksByAuthorId(first: 10) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        ${ProfileActionTabs.getFragment('user')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${ProfileActionTabs.getFragment('query')},
      }
    `,
  },
});

/*
import RemoveResourceFromProfileDialog
  from '../shared/components/RemoveResourceFromProfileDialog';
import PendingResourceDialog from './components/PendingResourceDialog';
import createColorChart from '../shared/themes/create-color-chart';

    <div className={classNames.relationships} >
      {landsAdmin.edges.map(edge => <LandItem
        key={edge.node.id}
        land={edge.node}
        colorSwatch={this.state.colorChart[edge.node.id]}
        adminBadge
      />)}

      {this.state.landsUsingResources
        && this.state.landsUsingResources.length > 0
        && this.state.landsUsingResources.map(land => <LandItem
          key={land.id}
          land={land}
          colorSwatch={this.state.colorChart[land.id]}
        />)
      }
    </div>

  state = {
    colorChart: {},
    landsUsingResources: [],
  };
  componentWillMount () {
    const {viewer} = this.props;
    const {landsAdmin, resources} = viewer;

    this.updateColorChart(resources);
    this.updateLandList(landsAdmin, resources);
  }
  componentWillReceiveProps (nextProps) {
    const {viewer} = nextProps;
    const {landsAdmin, resources} = viewer;

    this.updateColorChart(resources);
    this.updateLandList(landsAdmin, resources);
  }
  updateColorChart (resources) {
    const landIds = [];
    let landsUsingResources = resources.edges.map(edge => (
      edge.node.lands.edges.map(landEdge => landEdge.node)
    ));
    landsUsingResources = [].concat.apply([], landsUsingResources);
    landsUsingResources = landsUsingResources.filter(land => {
      if (landIds.indexOf(land.id) > -1) {
        return false;
      }
      landIds.push(land.id);
      return true;
    });

    const colorChart = createColorChart(landIds);

    this.setState({colorChart});
  }
  updateLandList (landsAdmin, resources) {
    const landIds = landsAdmin.edges.map(edge => edge.node.id);

    let landsUsingResources = resources.edges.map(edge => (
      edge.node.lands.edges.map(landEdge => landEdge.node)
    ));
    landsUsingResources = [].concat.apply([], landsUsingResources);
    landsUsingResources = landsUsingResources.filter(land => {
      if (landIds.indexOf(land.id) > -1) {
        return false;
      }
      landIds.push(land.id);
      return true;
    });

    this.setState({landsUsingResources});
  }

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        name,
        image,
        location,
        description,
        resources(first: 3) {
          edges {
            node {
              id,
              name,
              lands(first: 1) {
                edges {
                  node {
                    id,
                    name,
                    ${LandItem.getFragment('land')}
                  }
                }
              },
              ${ResourceItem.getFragment('resource')},
            }
          },
        },
        landsAdmin(first: 1) {
          edges {
            node {
              id,
              name,
              ${LandItem.getFragment('land')}
            }
          }
        },
        ${ProfileActionTabs.getFragment('user')},
      }
    `,
*/
