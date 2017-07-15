import React from 'react';
import Relay from 'react-relay';
import {PersonIcon} from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
import FoodSelectionJournal from 'food-selection/containers/FoodSelectionJournal';
import JournalItem from 'food-selection/components/JournalItem';

const UserContainer = (props, context) => <TransitionWrapper>
  <Layout page>
    <Menu
      baseUrl={`/user/${props.user.rowId}`}
      header={{icon: <PersonIcon />, title: 'User'}}
      disabled
    />
    <FoodSelectionJournal
      items={props.user.foodSelectionsByUserId.edges.map(s => (
        <JournalItem foodSelection={s.node} />
      ))}
      children={props.children}
    />
  </Layout>
</TransitionWrapper>;

UserContainer.propTypes = {
  user: React.PropTypes.shape({
    rowId: React.PropTypes.string,
    foodSelectionsByUserId: React.PropTypes.object,
  }),
  children: React.PropTypes.object,
};

UserContainer.contextTypes = {
  userId: React.PropTypes.string,
  router: React.PropTypes.object,
};

export default Relay.createContainer(UserContainer, {
  initialVariables: {
    userId: null,
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        rowId,
        foodSelectionsByUserId (orderBy: 'DATE_DESC', first: 40) {
          edges {
            node {
              rowId,
              foodDescription,
              foodId,
              foodIdSource,
              mass,
              massSource,
              unitQuantity,
              unitOfMeasureByUnitOfMeasureId {
                fullName,
              },
            },
          },
        },
      }
    `,
  },
});
