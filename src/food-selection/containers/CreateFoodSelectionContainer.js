import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import moment from 'moment';
import Layout from 'shared/components/Layout';
import { ErrorMessage } from 'shared/components/Typography';
import { Dialog, FlatButton, RaisedButton, Tabs, Tab } from 'shared/components/Material';
import { Form, TextInput } from 'shared/components/Form';
import validations, { validationErrors } from 'tools/validations';
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
  query: PropTypes.object.isRequired,
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
    const { query, currentPerson, relay } = this.props;

    // console.log('Create food selection data:', data);

    const formattedData = Object.assign({}, data, {
      measureWeightAmount: data.measureWeightAmount || null,
      measureWeightUnit: data.measureWeightUnit || null,
      measureVolumeAmount: data.measureVolumeAmount || null,
      measureVolumeUnit: data.measureVolumeUnit || null,
      measureCommonAmount: data.measureCommonAmount || null,
      measureCommonUnit: data.measureCommonUnit || null,
      foodId: data.foodId || null,
      mass: data.mass || null,
      userId: currentPerson.rowId,
    });

    CreateFoodSelectionMutation.commit(
      relay.environment,
      query,
      formattedData,
      this.handleSuccess,
      this.handleFailure,
    );
  }
  render () {
    const { location } = this.props;
    const { open, canSubmit, error, errorMessage } = this.state;
    const journalDate = location.pathname.split('/')[2];
    // const date = moment(journalDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
    const time = moment().format('HH:mm:ss Z');
    const datetime = moment(`${journalDate} ${time}`, 'YYYY-MM-DD HH:mm:ss Z')
      .format('YYYY-MM-DD HH:mm:ss Z');

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
            <Tabs>
              <Tab label={'Weight'} >
                <Layout>
                  <TextInput
                    name={'measureWeightAmount'}
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
                    name={'measureWeightUnit'}
                    label={'Unit'}
                    placeholder={'Word'}
                    validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
                    validationError={validationErrors.normalWords}
                    maxLength={50}
                    style={styles.fieldSmall}
                  />
                </Layout>
              </Tab>
              <Tab label={'Volume'} >
                <Layout>
                  <TextInput
                    name={'measureVolumeAmount'}
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
                    name={'measureVolumeUnit'}
                    label={'Unit'}
                    placeholder={'Word'}
                    validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
                    validationError={validationErrors.normalWords}
                    maxLength={50}
                    style={styles.fieldSmall}
                  />
                </Layout>
              </Tab>
              <Tab label={'Common'} >
                <Layout>
                  <TextInput
                    name={'measureCommonAmount'}
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
                    name={'measureCommonUnit'}
                    label={'Unit'}
                    placeholder={'Word'}
                    validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
                    validationError={validationErrors.normalWords}
                    maxLength={50}
                    style={styles.fieldSmall}
                  />
                </Layout>
              </Tab>
            </Tabs>
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
  query: graphql`
    fragment CreateFoodSelectionContainer_query on Query {
      id
    }
  `,
  currentPerson: graphql`
    fragment CreateFoodSelectionContainer_currentPerson on User {
      id
      rowId
    }
  `,
});
