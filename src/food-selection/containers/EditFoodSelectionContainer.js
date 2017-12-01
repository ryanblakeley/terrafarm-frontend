import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import moment from 'moment';
import Layout from 'shared/components/Layout';
import { P, Link, ErrorMessage } from 'shared/components/Typography';
import { Dialog, FlatButton, RaisedButton, Tabs, Tab } from 'shared/components/Material';
import { SearchIcon } from 'shared/components/Icons';
import { Form, TextInput } from 'shared/components/Form';
import validations, { validationErrors } from 'tools/validations';
import SelectionInvestigations from 'journal/components/SelectionInvestigations';
import UpdateFoodSelectionMutation from 'food-selection/mutations/UpdateFoodSelectionMutation';
import DeleteFoodSelectionMutation from 'food-selection/mutations/DeleteFoodSelectionMutation';
import classnames from 'classnames/bind';
import classNames from 'food-selection/styles/EditFoodSelectionContainerStylesheet.css';

const cx = classnames.bind(classNames);

const styles = {
  field: {
    width: 198,
  },
  smallField: {
    width: 95,
  },
};

const propTypes = {
  query: PropTypes.object.isRequired,
  // currentPerson: PropTypes.object.isRequired,
  foodSelectionByRowId: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

class EditFoodSelectionContainer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      open: true,
      canSubmit: false,
      error: false,
      errorMessage: '',
      formData: {},
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  }
  handleClose = () => {
    const { router, location } = this.props;
    this.setState({ open: false });
    router.replace(location.pathname.split('/edit')[0]);
  }
  handleValid = () => {
    this.setState({ canSubmit: true });
  }
  handleInvalid = () => {
    this.setState({ canSubmit: false });
  }
  handleFormError = data => {
    // the submit button being disabled prevents this trigger from being used
    console.error('Form error:', data);
  }
  handleSubmit = data => {
    const { canSubmit } = this.state;
    this.setState({ formData: data });
    if (!canSubmit) {
      console.warn('Form is not ready');
    } else {
      this.updateFoodSelection(data);
    }
  }
  handleClickDelete = () => {
    const { foodSelectionByRowId: foodSelection } = this.props;

    const presetName = foodSelection.presetSelectionsBySelectionId.edges.length > 0
      && foodSelection.presetSelectionsBySelectionId.edges[0].node.presetByPresetId.name;

    if (presetName) {
      this.setState({
        error: true,
        errorMessage: `Cannot delete this because it is used by a preset: ${presetName}.`,
      });
    } else {
      const confirmMessage = 'Are you sure you want to delete this journal row?';
      const confirmPrompt = window.confirm(confirmMessage); // eslint-disable-line no-alert
      if (confirmPrompt) {
        this.handleDelete();
      }
    }
  }
  handleDelete = response => {  // eslint-disable-line no-unused-vars
    const {
      query,
      foodSelectionByRowId: foodSelection,
      relay,
    } = this.props;

    DeleteFoodSelectionMutation.commit(
      relay.environment,
      query,
      foodSelection,
      this.handleSuccessDelete,
      this.handleFailure,
    );
  }
  handleSuccess = response => { // eslint-disable-line no-unused-vars
    this.handleClose();
  }
  handleSuccessDelete = response => { // eslint-disable-line no-unused-vars
    this.handleClose();
  }
  handleFailure = error => {
    this.setState({ error: !!error, errorMessage: 'Internal server failure.' });
  }
  handleChangeFoodId = (foodId) => {
    this.updateFoodSelection({ foodId });
  }
  handleChangeMass = (mass) => {
    this.updateFoodSelection({ mass });
  }
  updateFoodSelection (patch) {
    const { query, foodSelectionByRowId: foodSelection, relay } = this.props;

    // console.log('Update food selection patch:', patch);

    const formattedPatch = Object.assign({}, patch, {
      measureWeightAmount: patch.measureWeightAmount || null,
      measureWeightUnit: patch.measureWeightUnit || null,
      measureVolumeAmount: patch.measureVolumeAmount || null,
      measureVolumeUnit: patch.measureVolumeUnit || null,
      measureCommonAmount: patch.measureCommonAmount || null,
      measureCommonUnit: patch.measureCommonUnit || null,
      foodId: patch.foodId || null,
      mass: patch.mass || null,
    });

    UpdateFoodSelectionMutation.commit(
      relay.environment,
      query,
      foodSelection,
      formattedPatch,
      this.handleSuccess,
      this.handleFailure,
    );
  }
  render () {
    const { foodSelectionByRowId: foodSelection, location } = this.props;
    const { open, canSubmit, error, errorMessage } = this.state;
    const foodLinkLabel = foodSelection.foodByFoodId && foodSelection.foodByFoodId.description;
    const foodLink = <Layout center >
      <P>
        <Link to={`/foods/${foodSelection.foodId}`} >
          <FlatButton label={foodLinkLabel} />
        </Link>
      </P>
    </Layout>;
    const possibleFoods = foodSelection.investigationsByFoodSelectionId;
    const journalDate = location.pathname.split('/')[2];
    const datetime = moment(foodSelection.occurredOn, 'YYYY-MM-DD HH:mm:ss Z')
      .format('YYYY-MM-DD HH:mm:ss Z');

    return <Dialog
      title={'Edit Journal Row'}
      titleStyle={{ textAlign: 'center' }}
      modal
      open={open}
      onRequestClose={this.handleClose}
    >
      <Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.handleSubmit}
        onInvalidSubmit={this.handleFormError}
      >
        <Layout center >
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
          <Layout>
            <Tabs>
              <Tab label={'Weight'} >
                <Layout>
                  <TextInput
                    name={'measureWeightAmount'}
                    label={'Amount'}
                    placeholder={'Number'}
                    value={foodSelection.measureWeightAmount}
                    validations={{ isNumeric: true }}
                    validationError={validationErrors.number}
                    maxLength={8}
                    style={styles.field}
                  />
                </Layout>
                <Layout leftSmall >
                  <TextInput
                    name={'measureWeightUnit'}
                    label={'Unit'}
                    placeholder={'Word'}
                    value={foodSelection.measureWeightUnit}
                    validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
                    validationError={validationErrors.normalWords}
                    maxLength={50}
                    style={styles.field}
                  />
                </Layout>
              </Tab>
              <Tab label={'Volume'} >
                <Layout>
                  <TextInput
                    name={'measureVolumeAmount'}
                    label={'Amount'}
                    placeholder={'Number'}
                    value={foodSelection.measureVolumeAmount}
                    validations={{ isNumeric: true }}
                    validationError={validationErrors.number}
                    maxLength={8}
                    style={styles.field}
                  />
                </Layout>
                <Layout leftSmall >
                  <TextInput
                    name={'measureVolumeUnit'}
                    label={'Unit'}
                    placeholder={'Word'}
                    value={foodSelection.measureVolumeUnit}
                    validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
                    validationError={validationErrors.normalWords}
                    maxLength={50}
                    style={styles.field}
                  />
                </Layout>
              </Tab>
              <Tab label={'Common'} >
                <Layout>
                  <TextInput
                    name={'measureCommonAmount'}
                    label={'Amount'}
                    placeholder={'Number'}
                    value={foodSelection.measureCommonAmount}
                    validations={{ isNumeric: true }}
                    validationError={validationErrors.number}
                    maxLength={8}
                    style={styles.field}
                  />
                </Layout>
                <Layout leftSmall >
                  <TextInput
                    name={'measureCommonUnit'}
                    label={'Unit'}
                    placeholder={'Word'}
                    value={foodSelection.measureCommonUnit}
                    validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
                    validationError={validationErrors.normalWords}
                    maxLength={50}
                    style={styles.field}
                  />
                </Layout>
              </Tab>
            </Tabs>
          </Layout>
          <Layout
            className={cx({
              attentionFields: !(foodSelection.foodByFoodId && foodSelection.mass),
            })}
          >
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
                  journalDate,
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
        <Layout center >
          <TextInput
            name={'occurredOn'}
            label={'Occurred on'}
            placeholder={'YYYY-MM-DD HH:mm:ss Z'}
            value={datetime}
            validations={{ isDatetime: validations.isDatetime }}
            validationError={validationErrors.datetime}
            required
            style={styles.field}
          />
        </Layout>
        <Layout center topSmall >
          {/*
            These maybe should be moved to <Dialog actions={[...]} />
            it would style them as always present in the dialog, instead of
            below the end of the dialog body content. To make the move though,
            you have to reconcile not having the submit button within the <Form>,
            where Formsy expects it to be; Formsy automatically binds it to submit
            the data in the form fields.
          */}
          <RaisedButton
            label={'Save'}
            primary
            type={'submit'}
            disabled={!canSubmit}
          />
          <FlatButton
            label={'Close'}
            onTouchTap={this.handleClose}
          />
          <FlatButton
            label={'Delete'}
            secondary
            onTouchTap={this.handleClickDelete}
          />
        </Layout>
        {error && <Layout topSmall >
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </Layout>}
      </Form>
    </Dialog>;
  }
}

EditFoodSelectionContainer.propTypes = propTypes;

export default createFragmentContainer(EditFoodSelectionContainer, {
  query: graphql`
    fragment EditFoodSelectionContainer_query on Query {
      id
    }
  `,
/*
  currentPerson: graphql`
    fragment EditFoodSelectionContainer_currentPerson on User {
      id
      rowId
    }
  `,
*/
  foodSelectionByRowId: graphql`
    fragment EditFoodSelectionContainer_foodSelectionByRowId on FoodSelection {
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
      measureWeightAmount
      measureWeightUnit
      measureWeightUnitId
      measureVolumeAmount
      measureVolumeUnit
      measureCommonAmount
      measureCommonUnit
      unitOfMeasureByMeasureWeightUnitId {
        category
        siFactor
      }
      occurredOn
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

/*
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
*/
