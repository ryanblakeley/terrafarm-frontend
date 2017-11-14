import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Layout from 'shared/components/Layout';
import { ErrorMessage } from 'shared/components/Typography';
import { Dialog, FlatButton, RaisedButton } from 'shared/components/Material';
import { Form, TextInput } from 'shared/components/Form';
import validations, { validationErrors, conversions } from 'tools/validations';
import CreateFoodSelectionMutation from 'food-selection/mutations/CreateFoodSelectionMutation';

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
  relay: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

class CreateFoodSelectionContainer extends React.Component {
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
    router.replace(location.pathname.split('/new')[0]);
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
      this.createFoodSelection(data);
    }
  }
  handleSuccess = response => { // eslint-disable-line no-unused-vars
    this.handleClose();
  }
  handleFailure = error => {
    this.setState({ error: !!error, errorMessage: 'Internal server failure.' });
  }
  createFoodSelection (data) {
    const { currentPerson, relay } = this.props;

    const formattedData = Object.assign({}, data, {
      unitAmount: data.unitAmount || null,
      unitDescription: data.unitDescription || null,
      foodId: data.foodId || null,
      mass: data.mass || null,
      time: data.time || null,
      userId: currentPerson.rowId,
    });

    CreateFoodSelectionMutation.commit(
      relay.environment,
      currentPerson,
      formattedData,
      this.handleSuccess,
      this.handleFailure,
    );
  }
  render () {
    const { location } = this.props;
    const { open, canSubmit, error, errorMessage } = this.state;

    const date = location.pathname.split('/')[2];

    return <Dialog
      title={'New Journal Row'}
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
              validations={{ isNumeric: true }}
              validationError={validationErrors.number}
              maxLength={8}
              style={styles.field}
            />
          </Layout>
        </Layout>
        <Layout flexCenter flexWrap >
          <Layout leftSmall >
            <TextInput
              name={'date'}
              label={'Date*'}
              value={date}
              placeholder={'YYYY-MM-DD'}
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
              convertValue={conversions.time}
              validations={{ isTime: validations.isTime }}
              validationError={validationErrors.time}
              style={styles.field}
            />
          </Layout>
        </Layout>
        <Layout center topSmall >
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
        </Layout>
        {error && <Layout topSmall >
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </Layout>}
      </Form>
    </Dialog>;
  }
}

CreateFoodSelectionContainer.propTypes = propTypes;

export default createFragmentContainer(CreateFoodSelectionContainer, {
  currentPerson: graphql`
    fragment CreateFoodSelectionContainer_currentPerson on User {
      id
      rowId
    }
  `,
});
