import React from 'react';
import Relay from 'react-relay';
import CSSTransitionLand from 'react-addons-css-transition-group';
import NewResourceDialog from './components/NewResourceDialog';
import NewLandDialog from './components/NewLandDialog';
import EditProfileDialog from './components/EditProfileDialog';
import ResourceItem from '../shared/components/ResourceItem';
import LandItem from '../shared/components/LandItem';
import HeroImage from '../shared/components/HeroImage';

import createColorChart from '../shared/themes/create-color-chart';
import transitionNames from '../shared/styles/transitions.css';
import classNames from './styles/ProfileContainerStylesheet.css';

class ProfileContainer extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
    master: React.PropTypes.object,
  };
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
    let landsUsingResources = resources.edges.map(edge => {
      return edge.node.lands.edges.map(landEdge => landEdge.node);
    });
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

    let landsUsingResources = resources.edges.map(edge => {
      return edge.node.lands.edges.map(landEdge => landEdge.node);
    });
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
  render () {
    const {viewer, master} = this.props;
    const {landsAdmin} = viewer;

    return <CSSTransitionLand
      transitionName={transitionNames}
      transitionAppear
      transitionAppearTimeout={350}
      transitionEnterTimeout={350}
      transitionLeave={false}
    >
      <div className={classNames.this} >
        <h2 className={classNames.pageHeading}>Profile</h2>
        <div className={classNames.actionsHeading}>
          <NewLandDialog user={viewer} master={master} />
          <NewResourceDialog user={viewer} master={master} />
          <EditProfileDialog user={viewer} master={master} />
        </div>
        <h3 className={classNames.contentHeading}>{viewer.name}</h3>
        <HeroImage image={viewer.image} />
        <h6 className={classNames.location}>{viewer.location}</h6>

        <div className={classNames.relationships} >
          {landsAdmin.edges.map(edge => {
            return <LandItem
              key={edge.node.id}
              land={edge.node}
              colorSwatch={this.state.colorChart[edge.node.id]}
              adminBadge
              enableEdit
            />;
          })}

          {this.state.landsUsingResources
            && this.state.landsUsingResources.length > 0
            && this.state.landsUsingResources.map(land => {
              return <LandItem
                key={land.id}
                land={land}
                colorSwatch={this.state.colorChart[land.id]}
              />;
            })
          }

          {viewer.resources.edges.map(edge => {
            return <ResourceItem
              key={edge.node.id}
              resource={edge.node}
              colorSwatches={edge.node.lands.edges.map(landEdge => {
                return this.state.colorChart[landEdge.node.id];
              })}
              enableEdit
            />;
          })}

          <p className={classNames.description}>{viewer.description}</p>
        </div>
      </div>
    </CSSTransitionLand>;
  }
}

export default Relay.createContainer(ProfileContainer, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        name,
        image,
        location,
        description,
        resources(first: 1) {
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
        ${NewResourceDialog.getFragment('user')},
        ${NewLandDialog.getFragment('user')},
        ${EditProfileDialog.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        ${NewResourceDialog.getFragment('master')},
        ${NewLandDialog.getFragment('master')},
        ${EditProfileDialog.getFragment('master')},
      }
    `,
  },
});
