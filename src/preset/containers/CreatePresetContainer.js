import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Layout from 'shared/components/Layout';
import { ErrorMessage } from 'shared/components/Typography';
import { Dialog, FlatButton, RaisedButton } from 'shared/components/Material';
import { Form, TextInput, Toggle } from 'shared/components/Form';
import validations, { validationErrors } from 'tools/validations';
import CreatePresetMutation from 'preset/mutations/CreatePresetMutation';

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

class CreatePresetContainer extends React.Component {
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
      this.createPreset(data);
    }
  }
  handleSuccess = response => { // eslint-disable-line no-unused-vars
    this.handleClose();
  }
  handleFailure = error => {
    this.setState({ error: !!error, errorMessage: 'Internal server failure.' });
  }
  createPreset (data) {
    const { currentPerson: user, relay } = this.props;

    const formattedData = Object.assign(data, {
      userId: user.rowId,
    });

    CreatePresetMutation.commit(
      relay.environment,
      user,
      formattedData,
      this.handleSuccess,
      this.handleFailure,
    );
  }
  render () {
    const { open, canSubmit, error, errorMessage } = this.state;

    return <Dialog
      title={'New Preset'}
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
        <Layout center >
          <TextInput
            name={'name'}
            label={'Preset name'}
            placeholder={'e.x. breakfast1, fish and chips'}
            validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
            validationError={validationErrors.normalWords}
            maxLength={50}
            required
            style={styles.field}
          />
          <Layout topSmall >
            <Toggle
              name={'active'}
              label={'Active'}
              value
              style={styles.field}
            />
          </Layout>
          <Layout topSmall >
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
        </Layout>
      </Form>
    </Dialog>;
  }
}

CreatePresetContainer.propTypes = propTypes;

export default createFragmentContainer(CreatePresetContainer, {
  currentPerson: graphql`
    fragment CreatePresetContainer_currentPerson on User {
      id
      rowId
    }
  `,
});
