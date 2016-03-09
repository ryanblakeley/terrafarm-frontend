import React from 'react';
import Relay from 'react-relay';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import NewResourceDialog from './components/NewResourceDialog';
import NewGroupDialog from './components/NewGroupDialog';
import ResourceItem from '../shared/components/ResourceItem';
import GroupItem from '../shared/components/GroupItem';
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
    groupsUsingResources: [],
  };
  componentWillMount () {
    const {viewer} = this.props;
    const {groupsAdmin, resources} = viewer;

    this.updateColorChart(resources);
    this.updateGroupList(groupsAdmin, resources);
  }
  componentWillReceiveProps (nextProps) {
    const {viewer} = nextProps;
    const {groupsAdmin, resources} = viewer;

    this.updateColorChart(resources);
    this.updateGroupList(groupsAdmin, resources);
  }
  updateColorChart (resources) {
    const groupIds = [];
    let groupsUsingResources = resources.edges.map(edge => {
      return edge.node.groups.edges.map(groupEdge => groupEdge.node);
    });
    groupsUsingResources = [].concat.apply([], groupsUsingResources);
    groupsUsingResources = groupsUsingResources.filter(group => {
      if (groupIds.indexOf(group.id) > -1) {
        return false;
      }
      groupIds.push(group.id);
      return true;
    });

    const colorChart = createColorChart(groupIds);

    this.setState({colorChart});
  }
  updateGroupList (groupsAdmin, resources) {
    const groupIds = groupsAdmin.edges.map(edge => edge.node.id);

    let groupsUsingResources = resources.edges.map(edge => {
      return edge.node.groups.edges.map(groupEdge => groupEdge.node);
    });
    groupsUsingResources = [].concat.apply([], groupsUsingResources);
    groupsUsingResources = groupsUsingResources.filter(group => {
      if (groupIds.indexOf(group.id) > -1) {
        return false;
      }
      groupIds.push(group.id);
      return true;
    });

    this.setState({groupsUsingResources});
  }
  render () {
    const {viewer, master} = this.props;
    const {groupsAdmin} = viewer;

    return <CSSTransitionGroup
      transitionName={transitionNames}
      transitionAppear
      transitionAppearTimeout={350}
      transitionEnterTimeout={350}
      transitionLeave={false}
    >
      <div className={classNames.this} >
        <h2 className={classNames.pageHeading}>Profile</h2>
        <div className={classNames.actionsHeading}>
          <NewGroupDialog user={viewer} master={master} />
          <NewResourceDialog user={viewer} master={master} />
        </div>
        <h3 className={classNames.contentHeading}>{viewer.name}</h3>
        <HeroImage image={viewer.image} />

        <div className={classNames.relationships} >
          {groupsAdmin.edges.map(edge => {
            return <GroupItem
              key={edge.node.id}
              group={edge.node}
              colorSwatch={this.state.colorChart[edge.node.id]}
              adminBadge
              enableEdit
            />;
          })}

          {this.state.groupsUsingResources
            && this.state.groupsUsingResources.length > 0
            && this.state.groupsUsingResources.map(group => {
              return <GroupItem
                key={group.id}
                group={group}
                colorSwatch={this.state.colorChart[group.id]}
              />;
            })
          }

          {viewer.resources.edges.map(edge => {
            return <ResourceItem
              key={edge.node.id}
              resource={edge.node}
              colorSwatches={edge.node.groups.edges.map(groupEdge => {
                return this.state.colorChart[groupEdge.node.id];
              })}
              enableEdit
            />;
          })}
        </div>
      </div>
    </CSSTransitionGroup>;
  }
}

export default Relay.createContainer(ProfileContainer, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        name,
        image,
        resources(first: 18) {
          edges {
            node {
              id,
              name,
              groups(first: 18) {
                edges {
                  node {
                    id,
                    name,
                    ${GroupItem.getFragment('group')}
                  }
                }
              },
              ${ResourceItem.getFragment('resource')},
            }
          },
        },
        groupsAdmin(first: 18) {
          edges {
            node {
              id,
              name,
              ${GroupItem.getFragment('group')}
            }
          }
        },
        ${NewResourceDialog.getFragment('user')},
        ${NewGroupDialog.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        ${NewResourceDialog.getFragment('master')},
        ${NewGroupDialog.getFragment('master')},
      }
    `,
  },
});
