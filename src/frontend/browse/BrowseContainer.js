import React from 'react';
import Relay from 'react-relay';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

import transitionNames from '../shared/styles/transitions.css';
import classNames from './styles/BrowseContainerStylesheet.css';
const styles = {
  tab: {
    fontSize: 17,
    letterSpacing: 0.3,
  },
};

class BrowsePage extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
  };
  render () {
    const {master} = this.props;
    const {users, resources, groups} = master;

    return <CSSTransitionGroup
      transitionName={transitionNames}
      transitionAppear
      transitionAppearTimeout={350}
      transitionEnterTimeout={350}
      transitionLeave={false}
    >
      <div className={classNames.this} >
        <h2 className={classNames.pageHeading}>Browse</h2>
        <Tabs secondary>
          <Tab label={'Users'} style={styles.tab}>
            <Table height={'425'} fixedHeader selectable={false} >
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn colSpan={2}>Name</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody showRowHover stripedRows displayRowCheckbox={false} >
                {users.edges.map(edge => <TableRow key={edge.node.id}>
                  <TableRowColumn>
                    <Link to={'/auth/user/' + edge.node.id}>
                      {edge.node.name}
                    </Link>
                  </TableRowColumn>
                </TableRow>)}
              </TableBody>
            </Table>
          </Tab>
          <Tab label={'Resources'} style={styles.tab}>
            <Table height={'425'} fixedHeader selectable={false} >
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn colSpan={2}>Name</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody showRowHover stripedRows displayRowCheckbox={false} >
                {resources.edges.map(edge => <TableRow key={edge.node.id}>
                  <TableRowColumn>
                    <Link to={'/auth/resource/' + edge.node.id}>
                      {edge.node.name}
                    </Link>
                  </TableRowColumn>
                </TableRow>)}
              </TableBody>
            </Table>
          </Tab>
          <Tab label={'Groups'} style={styles.tab}>
            <Table height={'425'} fixedHeader selectable={false} >
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn colSpan={2}>Name</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody showRowHover stripedRows displayRowCheckbox={false} >
                {groups.edges.map(edge => <TableRow key={edge.node.id}>
                  <TableRowColumn>
                    <Link to={'/auth/group/' + edge.node.id}>
                      {edge.node.name}
                    </Link>
                  </TableRowColumn>
                </TableRow>)}
              </TableBody>
            </Table>
          </Tab>
        </Tabs>
      </div>
    </CSSTransitionGroup>;
  }
}

export default Relay.createContainer(BrowsePage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        users(first: 18) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        resources(first: 18) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        groups(first: 18) {
          edges {
            node {
              id,
              name,
            }
          }
        },
      }
    `,
  },
});

