import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import Layout from 'shared/components/Layout';
import { H4, P, Link, ErrorMessage } from 'shared/components/Typography';
import { FlatButton } from 'shared/components/Material';
import { TextInput } from 'shared/components/Form';
import validations, { validationErrors, conversions } from 'tools/validations';
import SelectionNutritionValues from '../components/SelectionNutritionValues';
import SelectionPossibleMass from '../components/SelectionPossibleMass';
import UpdateFoodSelectionMutation from 'food-selection/mutations/UpdateFoodSelectionMutation';
import DeleteFoodSelectionMutation from 'food-selection/mutations/DeleteFoodSelectionMutation';
import classNames from '../styles/JournalEditRecordContainerStylesheet.css';

const styles = {
  field: {
    width: 198,
  },
  fieldSmall: {
    width: 95,
  },
};

const propTypes = {
  userByRowId: PropTypes.object.isRequired,
  foodSelectionByRowId: PropTypes.object.isRequired,
  notifyClose: PropTypes.func.isRequired,
  relay: PropTypes.object.isRequired,
};

class JournalEditRecordContainer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      error: false,
      formData: {},
      isChangingDate: false,
      isChangingFoodDescription: false,
    };
  }
  handleSubmit = data => {
    const patch = Object.assign(data, {
      foodId: data.foodId || null,
      mass: data.mass || null,
    });

    this.setState({ formData: data });
    this.updateFoodSelection(patch);
  }
  handleDelete = response => {  // eslint-disable-line no-unused-vars
    const { userByRowId: user, foodSelectionByRowId: foodSelection, relay } = this.props;

    DeleteFoodSelectionMutation.commit(
      relay.environment,
      user,
      foodSelection,
      this.handleSuccessDelete,
      this.handleFailure,
    );
  }
  handleSuccess = response => { // eslint-disable-line no-unused-vars
    const { isChangingDate, isChangingFoodDescription } = this.state;
    if (isChangingDate || isChangingFoodDescription) {
      // Special case where we need to forcefully refetch data. Until found-relay
      // offers a way to do this we just have to reload the whole page.
      window.location.reload();
    }

    // this.props.notifyClose();
  }
  handleFailure = error => {
    this.setState({ error: !!error });
  }
  handleSuccessDelete = response => { // eslint-disable-line no-unused-vars
    // TODO: fix the mutation sharedUpdater to get the connections needed.
    // For now, do a forceful page reload. :(
    window.location.reload();
    this.props.notifyClose();
  }
  handleChangeFoodId = (foodId) => {
    this.updateFoodSelection({ foodId });
  }
  handleChangeMass = (mass) => {
    this.updateFoodSelection({ mass });
  }
  updateFoodSelection (patch) {
    const { foodSelectionByRowId: foodSelection, relay } = this.props;

    this.setState({
      isChangingDate: patch.date
        && patch.date !== foodSelection.date,
      isChangingFoodDescription: patch.foodDescription
        && patch.foodDescription !== foodSelection.foodDescription,
    });

    UpdateFoodSelectionMutation.commit(
      relay.environment,
      foodSelection,
      patch,
      this.handleSuccess,
      this.handleFailure,
    );
  }
  render () {
    const { foodSelectionByRowId: foodSelection, notifyClose } = this.props;
    const { error } = this.state;
    const foodLinkLabel = foodSelection.foodByFoodId
      ? foodSelection.foodByFoodId.description
      : `Food #${foodSelection.foodId}`;
    const foodLink = <Layout center >
      <P>
        <Link to={`/food/${foodSelection.foodId}`} >
          <FlatButton label={foodLinkLabel} />
        </Link>
      </P>
    </Layout>;
    const possibleFoods = foodSelection.investigationsByFoodSelectionId;
    let possibleFoodsElement;

    if (!possibleFoods.edges.length) {
      possibleFoodsElement = <Layout center >
        <ErrorMessage>Food ID is needed to calculate nutrition values.</ErrorMessage>
      </Layout>;
    } else {
      possibleFoodsElement = <Layout center >
        <Layout>
          <H4 className={classNames.contentSubheading} >Possible food and mass</H4>
        </Layout>
        {possibleFoods.edges.map(({ node }) => {
          const food = node.foodByFoodId;
          return <Layout key={node.id} >
            <Layout className={classNames.possibleFood} >
              <FlatButton
                label={`${food.rowId} ${food.description}`}
                onClick={() => { this.handleChangeFoodId(food.rowId); }}
              />
              <SelectionPossibleMass
                unit={foodSelection.unitOfMeasureByUnitOfMeasureId}
                amount={foodSelection.unitAmount}
                show={!foodSelection.mass}
                handleClickMassSuggestion={this.handleChangeMass}
              />
            </Layout>
          </Layout>;
        })}
      </Layout>;
    }

    return <ActionPanelForm
      title={'Edit Journal Row'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={this.handleDelete}
      error={error}
      showForm
      submitLabel={''}
    >
      <Layout flexCenter flexWrap >
        <Layout>
          <TextInput
            name={'foodDescription'}
            label={'Food description*'}
            value={foodSelection.foodDescription}
            validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
            validationError={validationErrors.normalWords}
            maxLength={50}
            required
            style={styles.field}
          />
        </Layout>
        <Layout leftSmall flexCenter >
          <Layout>
            <TextInput
              name={'unitAmount'}
              label={'Amount'}
              placeholder={'Number'}
              value={foodSelection.unitAmount}
              validations={{ isNumeric: true }}
              validationError={validationErrors.number}
              maxLength={8}
              style={styles.fieldSmall}
            />
          </Layout>
          <Layout leftSmall >
            <TextInput
              name={'unitDescription'}
              label={'Unit name'}
              value={foodSelection.unitDescription}
              validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
              validationError={validationErrors.normalWords}
              maxLength={50}
              style={styles.fieldSmall}
            />
          </Layout>
        </Layout>
      </Layout>
      <Layout flexCenter flexWrap >
        <Layout>
          <TextInput
            name={'foodId'}
            label={'Food ID'}
            placeholder={'Unique number'}
            value={foodSelection.foodId}
            validations={{ isNumeric: true }}
            validationError={validationErrors.number}
            maxLength={8}
            style={styles.field}
          />
        </Layout>
        <Layout leftSmall >
          <TextInput
            name={'mass'}
            label={'Mass (grams)'}
            placeholder={'Number'}
            value={foodSelection.mass}
            validations={{ isNumeric: true }}
            validationError={validationErrors.number}
            maxLength={8}
            style={styles.field}
          />
        </Layout>
      </Layout>
      {foodSelection.foodId && foodSelection.mass ? foodLink : possibleFoodsElement}
      <SelectionNutritionValues
        food={foodSelection.foodByFoodId}
        mass={foodSelection.mass}
      />
      <Layout flexCenter flexWrap >
        <Layout>
          <TextInput
            name={'brandDescription'}
            label={'Brand name'}
            value={foodSelection.brandDescription}
            validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
            validationError={validationErrors.normalWords}
            maxLength={50}
            style={styles.field}
          />
        </Layout>
        <Layout leftSmall >
          <TextInput
            name={'physicalModDescription'}
            label={'Physical modification'}
            placeholder={'e.x. chopped, sliced, melted'}
            value={foodSelection.physicalModDescription}
            validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
            validationError={validationErrors.normalWords}
            maxLength={50}
            style={styles.field}
          />
        </Layout>
      </Layout>
      <Layout flexCenter flexWrap >
        <Layout>
          <TextInput
            name={'time'}
            label={'Time (converts to 24-hour)'}
            placeholder={'e.x. 2:05 pm, 8 am, 16:50'}
            value={foodSelection.time}
            convertValue={conversions.time}
            validations={{ isTime: validations.isTime }}
            validationError={validationErrors.time}
            style={styles.field}
          />
        </Layout>
        <Layout leftSmall >
          <TextInput
            name={'date'}
            label={'Date*'}
            placeholder={'YYYY-MM-DD'}
            value={foodSelection.date}
            validations={{ matchRegexp: validations.matchDate }}
            validationError={validationErrors.date}
            required
            style={styles.field}
          />
        </Layout>
      </Layout>
    </ActionPanelForm>;
  }
}

JournalEditRecordContainer.propTypes = propTypes;

export default createFragmentContainer(JournalEditRecordContainer, {
  userByRowId: graphql`
    fragment JournalEditRecordContainer_userByRowId on User {
      id
      rowId
    }
  `,
  foodSelectionByRowId: graphql`
    fragment JournalEditRecordContainer_foodSelectionByRowId on FoodSelection {
      id
      rowId
      foodDescription
      foodId
      foodByFoodId {
        rowId
        description
        calories
        protein
        fat
        carbs
      }
      mass
      unitAmount
      unitDescription
      unitOfMeasureId
      unitOfMeasureByUnitOfMeasureId {
        category
        siFactor
      }
      brandDescription
      physicalModDescription
      date
      time
      investigationsByFoodSelectionId(first: 2147483647) {
        edges {
          node {
            id
            foodByFoodId {
              rowId
              description
            }
          }
        }
      }
    }
  `,
});
