import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Layout from 'shared/components/Layout';
import { P, Link, ErrorMessage } from 'shared/components/Typography';
import { Dialog, FlatButton, RaisedButton } from 'shared/components/Material';
import { SearchIcon } from 'shared/components/Icons';
import { Form, TextInput } from 'shared/components/Form';
import validations, { validationErrors, conversions } from 'tools/validations';
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
  fieldSmall: {
    width: 95,
  },
};

const propTypes = {
  currentPerson: PropTypes.object.isRequired,
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
      currentPerson: user,
      foodSelectionByRowId: foodSelection,
      relay,
    } = this.props;

    DeleteFoodSelectionMutation.commit(
      relay.environment,
      user,
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
    const { currentPerson, foodSelectionByRowId: foodSelection, relay } = this.props;

    const formattedPatch = Object.assign({}, patch, {
      unitAmount: patch.unitAmount || null,
      unitDescription: patch.unitDescription || null,
      foodId: patch.foodId || null,
      mass: patch.mass || null,
      time: patch.time || null,
    });

    UpdateFoodSelectionMutation.commit(
      relay.environment,
      currentPerson,
      foodSelection,
      formattedPatch,
      this.handleSuccess,
      this.handleFailure,
    );
  }
  render () {
    const { foodSelectionByRowId: foodSelection } = this.props;
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

    return <Dialog
      title={'Edit Journal Row'}
      titleStyle={{ textAlign: 'center' }}
      modal={false}
      open={open}
      onRequestClose={this.handleClose}
    >
      <Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.handleSubmit}
        onInvalidSubmit={this.handleFormError}
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
        <Layout
          flexCenter
          flexWrap
          className={cx({ attentionFields: !(foodSelection.foodByFoodId && foodSelection.mass) })}
        >
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
                  journalDate: foodSelection.date,
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
        <Layout flexCenter flexWrap >
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
  currentPerson: graphql`
    fragment EditFoodSelectionContainer_currentPerson on User {
      id
      rowId
    }
  `,
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