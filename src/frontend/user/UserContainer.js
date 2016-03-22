import React from 'react';
import Relay from 'react-relay';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ResourceItem from '../shared/components/ResourceItem';
import GroupItem from '../shared/components/GroupItem';
import HeroImage from '../shared/components/HeroImage';

import createColorChart from '../shared/themes/create-color-chart';
import transitionNames from '../shared/styles/transitions.css';
import classNames from './styles/UserContainerStylesheet.css';

class UserContainer extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
  };
  state = {
    colorChart: {},
    groupsUsingResources: [],
  };
  componentWillMount () {
    const {user} = this.props;
    const {groupsAdmin, resources} = user;

    this.updateColorChart(resources);
    this.updateGroupList(groupsAdmin, resources);
  }
  componentWillReceiveProps (nextProps) {
    const {user} = nextProps;
    const {groupsAdmin, resources} = user;

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
    const {user} = this.props;
    const {groupsAdmin} = user;

    return <CSSTransitionGroup
      transitionName={transitionNames}
      transitionAppear
      transitionAppearTimeout={350}
      transitionEnterTimeout={350}
      transitionLeave={false}
    >
      <div className={classNames.this} >
        <h2 className={classNames.pageHeading}>User</h2>
        <h3 className={classNames.contentHeading}>{user.name}</h3>
        <HeroImage image={user.image} />
        <h6 className={classNames.location}>{user.location}</h6>

        <div className={classNames.relationships} >
          {groupsAdmin.edges.map(edge => {
            return <GroupItem
              key={edge.node.id}
              group={edge.node}
              colorSwatch={this.state.colorChart[edge.node.id]}
              adminBadge
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

          {user.resources.edges.map(edge => {
            return <ResourceItem
              key={edge.node.id}
              resource={edge.node}
              colorSwatches={edge.node.groups.edges.map(groupEdge => {
                return this.state.colorChart[groupEdge.node.id];
              })}
            />;
          })}

          <p className={classNames.description}>{user.description}</p>
        </div>
      </div>
    </CSSTransitionGroup>;
  }
}

export default Relay.createContainer(UserContainer, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        image,
        location,
        description,
        resources(first: 18) {
          edges {
            node {
              id,
              name,
              groups(first: 18) {
                edges {
                  node {
                    name,
                    id,
                    ${GroupItem.getFragment('group')},
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
              ${GroupItem.getFragment('group')},
            }
          }
        },
      }
    `,
  },
});


