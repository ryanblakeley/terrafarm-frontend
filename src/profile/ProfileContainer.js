import React from 'react';
import Relay from 'react-relay';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import classNames from './styles/ProfileContainerStylesheet.css';
/*
const ProfileContainer = props => <TransitionWrapper>
  <div className={classNames.this} >
    <p>Profile for {props.user.name}</p>
    {console.log('profile id:', props.user.id)}
  </div>
</TransitionWrapper>;
*/

class ProfileContainer extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object,
    userId: React.PropTypes.string,
  };
  componentDidMount () {
    const {router, location, userId} = this.context;
    router.push({
      pathname: location.pathname,
      state: {
        userId,
      },
    });
  }
  render () {
    const {location} = this.context;
    console.log('location state:', location);
    return <TransitionWrapper>
      <div className={classNames.this} >
        <p>Profile for...</p>
      </div>
    </TransitionWrapper>;
  }
}

ProfileContainer.propTypes = {
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
  }),
};

// export default ProfileContainer;

export default Relay.createContainer(ProfileContainer, {
  initialVariables: {
    userId: null,
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
      }
    `,
  },
});

/*
import ResourceItem from '../shared/components/ResourceItem';
import LandItem from '../shared/components/LandItem';
import HeroImage from '../shared/components/HeroImage';
import ProfileActionTabs from './components/ProfileActionTabs';
import createColorChart from '../shared/themes/create-color-chart';

    <ProfileActionTabs
      master={master}
      user={viewer}
      isAdmin
    />
    <h3 className={classNames.contentHeading}>{viewer.name}</h3>
    <h4 className={classNames.contentSubheading}>
      <span className={classNames.location}>{viewer.location}</span>
    </h4>
    <HeroImage image={viewer.image} />
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

      {viewer.resources.edges.map(edge => <ResourceItem
        key={edge.node.id}
        resource={edge.node}
        colorSwatches={edge.node.lands.edges.map(landEdge => (
          this.state.colorChart[landEdge.node.id]
        ))}
      />)}
      <p className={classNames.description}>{viewer.description}</p>
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
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${ProfileActionTabs.getFragment('master')},
      }
    `,

*/
