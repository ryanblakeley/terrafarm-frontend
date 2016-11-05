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
    <div className={classNames.children}>
      {props.children}
    </div>
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

ProfileContainer.propTypes = {
  user: React.PropTypes.object,
  query: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
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
                rowId,
                name,
              }
            }
          }
        },
        resourcesByOwnerId(first: 25) {
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
