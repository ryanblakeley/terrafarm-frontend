import React from 'react';
import Relay from 'react-relay';
import IoIosBriefcase from 'react-icons/lib/io/ios-briefcase';
import IoIosPaperOutline from 'react-icons/lib/io/ios-paper-outline';
import IoCube from 'react-icons/lib/io/cube';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import HeroImage from '../shared/components/HeroImage';
import RelationshipList from '../shared/components/RelationshipList';
import ProjectActionTabs from './components/ProjectActionTabs';
import UpdateProjectResourceMutation from './mutations/UpdateProjectResourceMutation';
import DeleteProjectResourceMutation from './mutations/DeleteProjectResourceMutation';
import classNames from './styles/ProjectContainerStylesheet.css';

class ProjectContainer extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
    query: React.PropTypes.object,
  };

  static contextTypes = {
    loggedIn: React.PropTypes.bool,
  };
  acceptResource = relationship => {
    Relay.Store.commitUpdate(
      new UpdateProjectResourceMutation({
        projectResourcePatch: {
          status: 'ACCEPTED',
        },
        projectResource: relationship,
      })
    );
  }
  declineResource = relationship => {
    Relay.Store.commitUpdate(
      new UpdateProjectResourceMutation({
        projectResourcePatch: {
          status: 'DECLINED',
        },
        projectResource: relationship,
      })
    );
  }
  removeResource = relationship => {
    Relay.Store.commitUpdate(
      new DeleteProjectResourceMutation({
        projectResource: relationship,
      })
    );
  }
  render () {
    const {project, query, children} = this.props;
    const {loggedIn} = this.context;

    return <TransitionWrapper>
      <div className={classNames.this}>
        <ProjectActionTabs
          isAdmin={loggedIn}
          project={project}
          query={query}
        />
        <div className={classNames.children}>
          {children}
        </div>
        <h3 className={classNames.contentHeading}>{project.name}</h3>
        <HeroImage image={project.imageUrl} />
        <p className={classNames.description}>{project.description}</p>
        <RelationshipList
          icon={<IoIosBriefcase />}
          title={'Parent Organization'}
          pathname={'organization'}
          listItems={[{
            name: project.organizationByOrganizationId.name,
            itemId: project.organizationByOrganizationId.rowId,
          }]}
        />
        <RelationshipList
          icon={<IoIosPaperOutline />}
          title={'Tasks'}
          pathname={'task'}
          listItems={project.tasksByProjectId.edges.map(edge => ({
            name: edge.node.name,
            itemId: edge.node.rowId,
          }))}
        />
        <RelationshipList
          icon={<IoCube />}
          title={'Resources'}
          pathname={'resource'}
          listItems={project.projectResourcesByProjectId.edges.map(edge => ({
            name: edge.node.resourceByResourceId.name,
            itemId: edge.node.resourceByResourceId.rowId,
            relationship: edge.node,
            status: edge.node.status,
            isAdmin: loggedIn,
            accept: this.acceptResource,
            decline: this.declineResource,
            remove: this.removeResource,
          }))}
        />
      </div>
    </TransitionWrapper>;
  }
}

export default Relay.createContainer(ProjectContainer, {
  initialVariables: {
    projectId: null,
  },
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        name,
        imageUrl,
        description,
        organizationByOrganizationId {
          rowId,
          name,
        },
        tasksByProjectId(first: 10) {
          edges {
            node {
              rowId,
              name,
            }
          }
        },
        projectResourcesByProjectId(first: 10) {
          edges {
            node {
              status,
              resourceByResourceId {
                rowId,
                name,
              }
              ${UpdateProjectResourceMutation.getFragment('projectResource')},
              ${DeleteProjectResourceMutation.getFragment('projectResource')},
            }
          }
        },
        ${ProjectActionTabs.getFragment('project')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${ProjectActionTabs.getFragment('query')},
      }
    `,
  },
});
