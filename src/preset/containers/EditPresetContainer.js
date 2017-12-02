import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Layout from 'shared/components/Layout';
import { Form, TextInput, Toggle } from 'shared/components/Form';
import { Dialog, FlatButton, RaisedButton } from 'shared/components/Material';
import { ErrorMessage } from 'shared/components/Typography';
import validations, { validationErrors } from 'tools/validations';
import UpdatePresetMutation from 'preset/mutations/UpdatePresetMutation';

const styles = {
  field: {
    width: 198,
  },
  smallField: {
    width: 95,
  },
};

const propTypes = {
  currentPerson: PropTypes.object.isRequired,
  presetByRowId: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

class EditPresetContainer extends React.Component {
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
      this.updatePreset(data);
    }
  }
  handleSuccess = response => { // eslint-disable-line no-unused-vars
    this.handleClose();
  }
  handleFailure = error => {
    this.setState({ error: !!error, errorMessage: 'Internal server failure.' });
  }
  updatePreset (patch) {
    const { currentPerson: user, presetByRowId: preset, relay } = this.props;

    UpdatePresetMutation.commit(
      relay.environment,
      user,
      preset,
      patch,
      this.handleSuccess,
      this.handleFailure,
    );
  }
  render () {
    const { presetByRowId: preset } = this.props;
    const { open, canSubmit, error, errorMessage } = this.state;

    return <Dialog
      title={'Edit Preset'}
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
            value={preset.name}
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
              value={preset.active}
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

EditPresetContainer.propTypes = propTypes;

export default createFragmentContainer(EditPresetContainer, {
  currentPerson: graphql`
    fragment EditPresetContainer_currentPerson on User {
      id
      rowId
    }
  `,
  presetByRowId: graphql`
    fragment EditPresetContainer_presetByRowId on Preset {
      id
      rowId
      name
      active
    }
  `,
});
