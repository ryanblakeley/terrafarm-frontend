import React from 'react';
import Relay from 'react-relay';
import IoIosBriefcase from 'react-icons/lib/io/ios-briefcase';
import IoIosPaperOutline from 'react-icons/lib/io/ios-paper-outline';
import IoCube from 'react-icons/lib/io/cube';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import HeroImage from '../shared/components/HeroImage';
import RelationshipList from '../shared/components/RelationshipList';
import UserActionTabs from './components/UserActionTabs';
import classNames from './styles/UserContainerStylesheet.css';

const UserContainer = props => <TransitionWrapper>
  <div className={classNames.this}>
    <UserActionTabs />
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
        name: edge.node.organizationByOrganizationId.name,
        itemId: edge.node.organizationByOrganizationId.rowId,
      }))}
    />
    <RelationshipList
      icon={<IoIosPaperOutline />}
      title={'Tasks'}
      pathname={'task'}
      listItems={props.user.tasksByAuthorId.edges.map(edge => ({
        name: edge.node.name,
        itemId: edge.node.rowId,
      }))}
    />
    <RelationshipList
      icon={<IoCube />}
      title={'Resources'}
      pathname={'resource'}
      listItems={props.user.resourcesByOwnerId.edges.map(edge => ({
        name: edge.node.name,
        itemId: edge.node.rowId,
      }))}
    />
  </div>
</TransitionWrapper>;

UserContainer.propTypes = {
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
    location: React.PropTypes.string,
    description: React.PropTypes.string,
    imageUrl: React.PropTypes.string,
    organizationMembersByMemberId: React.PropTypes.object,
    resourcesByOwnerId: React.PropTypes.object,
    tasksByAuthorId: React.PropTypes.object,
  }).isRequired,
};

export default Relay.createContainer(UserContainer, {
  initialVariables: {
    userId: null,
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name,
        location,
        imageUrl,
        description,
        organizationMembersByMemberId(first: 5) {
          edges {
            node {
              organizationByOrganizationId {
                rowId,
                name,
              }
            }
          }
        },
        resourcesByOwnerId(first: 10) {
          edges {
            node {
              rowId,
              name,
            }
          }
        },
        tasksByAuthorId(first: 10) {
          edges {
            node {
              rowId,
              name,
            }
          }
        },
      }
    `,
  },
});
