import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import Layout from 'shared/components/Layout';
import { P, Link } from 'shared/components/Typography';
import { FlatButton } from 'shared/components/Material';
import { SearchIcon } from 'shared/components/Icons';
import { TextInput } from 'shared/components/Form';
import validations, { validationErrors, conversions } from 'tools/validations';
import SelectionNutritionValues from '../components/SelectionNutritionValues';
import SelectionInvestigations from '../components/SelectionInvestigations';
import UpdateFoodSelectionMutation from 'food-selection/mutations/UpdateFoodSelectionMutation';
import DeleteFoodSelectionMutation from 'food-selection/mutations/DeleteFoodSelectionMutation';

const styles = {
  field: {
    width: 198,
  },
  fieldSmall: {
    width: 95,
  },
};

const propTypes = {
  currentPerson: PropTypes.object.isRequired,
  foodSelectionByRowId: PropTypes.object.isRequired,
  notifyClose: PropTypes.func.isRequired,
  relay: PropTypes.object.isRequired,
};

class JournalEditRecordContainer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      error: false,
      errorMessage: '',
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
    const {
      currentPerson: user,
      foodSelectionByRowId: foodSelection,
      relay,
    } = this.props;

    const presetName = foodSelection.presetSelectionsBySelectionId.edges.length > 0
      && foodSelection.presetSelectionsBySelectionId.edges[0].node.presetByPresetId.name;

    if (presetName) {
      this.setState({ error: true, errorMessage: `Cannot delete, used by preset ${presetName}` });
    } else {
      DeleteFoodSelectionMutation.commit(
        relay.environment,
        user,
        foodSelection,
        this.handleSuccessDelete,
        this.handleFailure,
      );
    }
  }
  handleSuccess = response => { // eslint-disable-line no-unused-vars
    // this.props.notifyClose();
  }
  handleFailure = error => {
    this.setState({ error: !!error, errorMessage: 'Internal server failure.' });
  }
  handleSuccessDelete = response => { // eslint-disable-line no-unused-vars
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

    const formattedPatch = Object.assign({}, patch, {
      unitAmount: patch.unitAmount || null,
    });

    UpdateFoodSelectionMutation.commit(
      relay.environment,
      foodSelection,
      formattedPatch,
      this.handleSuccess,
      this.handleFailure,
    );
  }
  render () {
    const {
      foodSelectionByRowId: foodSelection,
      notifyClose,
    } = this.props;
    const { error, errorMessage } = this.state;
    const foodLinkLabel = foodSelection.foodByFoodId && foodSelection.foodByFoodId.description;
    const foodLink = <Layout center >
      <P>
        <Link to={`/foods/${foodSelection.foodId}`} >
          <FlatButton label={foodLinkLabel} />
        </Link>
      </P>
    </Layout>;
    const possibleFoods = foodSelection.investigationsByFoodSelectionId;
    const hasPresetSelections = foodSelection.presetSelectionsBySelectionId
      && foodSelection.presetSelectionsBySelectionId.edges.length > 0;

    return <ActionPanelForm
      title={'Edit Journal Item'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={hasPresetSelections ? null : this.handleDelete}
      error={error}
      errorMessage={errorMessage}
      showForm
      submitLabel={''}
    >
      <Layout flexCenter flexWrap >
        <Layout>
          <TextInput
            name={'foodDescription'}
            label={'Food description*'}
            placeholder={'Words'}
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
              label={'Unit'}
              placeholder={'Word'}
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
      {foodSelection.foodId && foodLink}
      {!(foodSelection.foodId && foodSelection.mass)
        && <SelectionInvestigations
          foodSelection={foodSelection}
          possibleFoods={possibleFoods}
          handleChangeFoodId={this.handleChangeFoodId}
          handleChangeMass={this.handleChangeMass}
        />
      }
      {!foodSelection.foodId && <Layout center >
        <P>
          <Link
            to={{
              pathname: '/foods',
              query: {
                description: foodSelection.foodDescription,
              },
              state: {
                foodSelectionId: foodSelection.rowId,
              },
            }}
          >
            <FlatButton
              icon={<SearchIcon />}
              label={'Food search'}
            />
          </Link>
        </P>
      </Layout>}
      <SelectionNutritionValues
        food={foodSelection.foodByFoodId}
        mass={foodSelection.mass}
      />
      {/*
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
      */}
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
  currentPerson: graphql`
    fragment JournalEditRecordContainer_currentPerson on User {
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
      presetSelectionsBySelectionId(first: 1) {
        edges {
          node {
            presetByPresetId {
              name
            }
          }
        }
      }
    }
  `,
});
