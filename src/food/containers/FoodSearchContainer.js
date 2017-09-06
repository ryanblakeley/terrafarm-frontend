import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { FoodIcon } from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import { H3, Link, Span, WarningMessage } from 'shared/components/Typography';
import { FlatButton } from 'shared/components/Material';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
import ActionPanel from 'shared/components/ActionPanel';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import { TextInput } from 'shared/components/Form';
import validations, { validationErrors } from 'tools/validations';
import classNames from '../styles/FoodSearchContainerStylesheet.css';

const propTypes = {
  searchFoods: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const styles = {
  field: {
    width: 198,
  },
  fieldSmall: {
    width: 95,
  },
};

class FoodSearchContainer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      error: false,
      formData: {},
    };
  }
  /*
  componentWillMount () {
    const { router, location } = this.props;
    const { pathname, query } = location;
    const { id, description } = query;

    if (!description) {
      router.replace({
        pathname,
        query: Object.assign(query, {
          description: '',
        }),
      });
    }
  }
  */
  handleSubmit = data => {
    this.setState({ formData: data });
    this.updateFoodSearch(data);
  }
  handleSuccess = response => { // eslint-disable-line no-unused-vars
    // this.props.notifyClose();
    this.setState({ error: false });
  }
  handleFailure = error => {
    this.setState({ error: !!error });
  }
  updateFoodSearch (patch) {
    const { router, location } = this.props;
    const query = {};
    if (patch.foodId) {
      query.id = patch.foodId;
    }
    if (patch.foodDescription) {
      query.description = patch.foodDescription;
    }

    router.replace({
      pathname: location.pathname,
      query,
    });
  }
  render () {
    const { searchFoods, location } = this.props;
    const { error } = this.state;
    const { id, description } = location.query;
    const resultElements = searchFoods && searchFoods.edges.map(({ node }) => (
      <Layout key={node.rowId} >
        <Link to={`/food/${node.rowId}`} >
          <FlatButton label={`#${node.rowId}`} />
          <Span>{node.description}</Span>
        </Link>
      </Layout>
    ));
    const emptyResultsWarning = <WarningMessage>Search results empty.</WarningMessage>;

    return <TransitionWrapper>
      <Layout page >
        <Menu
          baseUrl={'/food'}
          header={{ icon: <FoodIcon />, title: 'Food' }}
          disabled
        />
      </Layout>
      <Layout topSmall className={classNames.this} >
        <Layout className={classNames.journalDatesWrapper} >
          <H3>Results</H3>
          {resultElements.length > 0 ? resultElements : emptyResultsWarning}
        </Layout>
        <Layout className={classNames.actionPanelWrapper} >
          <ActionPanel notifyClose={() => null} >
            <ActionPanelForm
              notifyClose={() => null}
              onValidSubmit={this.handleSubmit}
              error={error}
              showForm
              submitLabel={'Search'}
              cancelLabel={''}
            >
              <Layout flexCenter flexWrap >
                <Layout>
                  <TextInput
                    name={'foodId'}
                    label={'Food ID'}
                    placeholder={'Unique number'}
                    value={id}
                    validations={{ isNumeric: true }}
                    validationError={validationErrors.number}
                    maxLength={8}
                    style={styles.field}
                  />
                </Layout>
                <Layout leftSmall >
                  <TextInput
                    name={'foodDescription'}
                    label={'Food description'}
                    value={description}
                    validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
                    validationError={validationErrors.normalWords}
                    maxLength={50}
                    style={styles.field}
                  />
                </Layout>
              </Layout>
            </ActionPanelForm>
          </ActionPanel>
        </Layout>
      </Layout>
    </TransitionWrapper>;
  }
}

FoodSearchContainer.propTypes = propTypes;

export default createFragmentContainer(
  FoodSearchContainer,
  graphql`
    fragment FoodSearchContainer_searchFoods on FoodsConnection {
      edges {
        node {
          rowId
          description
        }
      }
    }
  `,
);
