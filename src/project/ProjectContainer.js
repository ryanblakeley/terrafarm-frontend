import React from 'react';
import Relay from 'react-relay';
// Icons
import IoEdit from 'react-icons/lib/io/edit';
import IoIosBriefcase from 'react-icons/lib/io/ios-briefcase';
import IoIosPaperOutline from 'react-icons/lib/io/ios-paper-outline';
import IoCube from 'react-icons/lib/io/cube';
import IoPlus from 'react-icons/lib/io/plus';
import IoAndroidRadioButtonOn from 'react-icons/lib/io/android-radio-button-on';
import GoRepo from 'react-icons/lib/go/repo';
// Components
import TransitionWrapper from '../shared/components/TransitionWrapper';
import MainContentWrapper from '../shared/components/MainContentWrapper';
import ContentHeader from '../shared/components/ContentHeader';
import HeroImage from '../shared/components/HeroImage';
import RelationshipList from '../shared/components/RelationshipList';
import Menu from '../shared/components/Menu';
import ActionPanel from '../shared/components/ActionPanel';
import Accordion from '../shared/components/Accordion';
import ContentBodyText from '../shared/components/ContentBodyText';

import classNames from './styles/ProjectContainerStylesheet.css';

const ProjectContainer = (props, context) => <TransitionWrapper>
  <div className={classNames.this}>
    <Menu
      baseUrl={`/project/${props.project.rowId}`}
      header={{icon: <GoRepo />, title: 'Project'}}
      disabled={!context.loggedIn}
      list={[
        { icon: <IoPlus />, title: 'New Task', url: 'new-task' },
        { icon: <IoCube />, title: 'Offer Resource', url: 'offer-resource' },
        { icon: <IoAndroidRadioButtonOn />, title: 'Request Resource', url: 'request-resource' },
        { icon: <IoEdit />, title: 'Edit', url: 'edit' },
      ]}
    />
    <ContentHeader text={props.project.name} />
    <MainContentWrapper
      right={<Accordion
        panels={[
          {
            header: {
              icon: <IoIosBriefcase />,
              label: 'Parent Organization',
            },
            body: <RelationshipList
              listItems={[{
                name: props.project.organizationByOrganizationId.name,
                itemId: props.project.organizationByOrganizationId.rowId,
                itemUrl: 'organization',
              }]}
            />,
          },
          {
            header: {
              icon: <IoIosPaperOutline />,
              label: 'Tasks',
            },
            body: <RelationshipList
              listItems={props.project.tasksByProjectId.edges.map(edge => ({
                name: edge.node.name,
                itemId: edge.node.rowId,
                itemUrl: 'task',
              }))}
            />,
          },
          {
            header: {
              icon: <IoCube />,
              label: 'Resources',
            },
            body: <RelationshipList
              listItems={props.project.projectResourcesByProjectId.edges.map(edge => ({
                name: edge.node.resourceByResourceId.name,
                itemId: edge.node.resourceByResourceId.rowId,
                itemUrl: 'resource',
                baseId: props.project.rowId,
                baseUrl: 'project',
                relationshipId: edge.node.id,
                status: edge.node.status,
                isAdmin: context.loggedIn,
              }))}
            />,
          },
        ]}
      />}
      left={<div>
        <ActionPanel
          children={props.children}
          notifyClose={() => (
            context.router.replace(`/project/${props.project.rowId}`)
          )}
        />
        <ContentBodyText text={props.project.description} />
        <HeroImage image={props.project.imageUrl} />
      </div>}
    />
  </div>
</TransitionWrapper>;

ProjectContainer.propTypes = {
  project: React.PropTypes.object,
  children: React.PropTypes.object,
};

ProjectContainer.contextTypes = {
  loggedIn: React.PropTypes.bool,
  router: React.PropTypes.object,
};

export default Relay.createContainer(ProjectContainer, {
  initialVariables: {
    projectId: null,
  },
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        rowId,
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
              id,
              status,
              resourceByResourceId {
                rowId,
                name,
              }
            }
          }
        },
      }
    `,
  },
});
