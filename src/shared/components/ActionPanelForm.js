import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { H5, P } from 'shared/components/Typography';
import { Form } from 'shared/components/Form';
import { FlatButton, RaisedButton, IconButton } from 'shared/components/Material';
import { CheckmarkIcon, CloseIcon } from 'shared/components/Icons';
import { green500 } from 'tools/colors';
import FormError from 'shared/components/FormError';
import classNames from 'shared/styles/ActionPanelFormStylesheet.css';

const propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  bodyText: PropTypes.element,
  showForm: PropTypes.bool,
  submitLabel: PropTypes.string,
  cancelButton: PropTypes.element,
  notifyClose: PropTypes.func.isRequired,
  onValidSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

const defaultProps = {
  title: null,
  bodyText: null,
  showForm: true,
  submitLabel: 'Submit',
  cancelButton: <IconButton>
    <CloseIcon />
  </IconButton>,
  onDelete: null,
  error: false,
  errorMessage: 'Internal server error.',
};

class ActionPanelForm extends React.Component {
  state = {
    canSubmit: false,
  };
  handleValid = () => {
    this.setState({ canSubmit: true });
  }
  handleInvalid = () => {
    this.setState({ canSubmit: false });
  }
  handleClose = () => {
    this.props.notifyClose();
  }
  handleFormError = data => {
    /*
    disabling the submit button should prevent this handler from ever being called
    this.setState({
      errorMessage: 'Form error');
    });
    */
    console.error('Form error:', data);
  }
  handleSubmit = data => {
    const { onValidSubmit } = this.props;
    const { canSubmit } = this.state;

    if (!canSubmit) {
      console.warn('Form is not ready');
    } else if (onValidSubmit) {
      onValidSubmit(data);
      // forms handles it's own closing based on success or failed submit
      // this.handleClose();
    }
  }
  handleClickDelete = () => {
    const confirmMessage = 'Are you sure you want to delete this journal row?';
    const confirmPrompt = window.confirm(confirmMessage); // eslint-disable-line no-alert
    if (confirmPrompt) {
      this.handleDelete();
    }
  }
  handleDelete = () => {
    this.props.onDelete();
    this.handleClose();
  }
  render () {
    const {
      title,
      children,
      onDelete,
      bodyText,
      showForm,
      error,
      errorMessage,
      submitLabel,
      cancelButton,
      // notifyClose,
    } = this.props;
    const { canSubmit } = this.state;

    return <Layout>
      {bodyText && <Layout center ><P>{bodyText}</P></Layout>}
      <Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.handleSubmit}
        onInvalidSubmit={this.handleFormError}
      >
        <Layout flexCenter >
          {showForm && submitLabel === '' ?
            <IconButton
              type={'submit'}
              disabled={!canSubmit}
            >
              <CheckmarkIcon color={green500} />
            </IconButton>
            : <RaisedButton
              label={submitLabel}
              primary
              type={'submit'}
              disabled={!canSubmit}
            />
          }
          {showForm && cancelButton && React.cloneElement(cancelButton, {
            onTouchTap: this.handleClose,
          })}
        </Layout>
        {title && <Layout center >
          <H5 className={classNames.title} >{title}</H5>
        </Layout>}
        {error && <FormError text={errorMessage} />}
        {showForm && children}
        {showForm && <Layout center topSmall >
          {submitLabel === '' && <RaisedButton
            label={'Save'}
            primary
            type={'submit'}
            disabled={!canSubmit}
          />}
          {cancelButton && <FlatButton
            label={'Close'}
            onTouchTap={this.handleClose}
          />}
          {onDelete && <FlatButton
            label={'Delete'}
            secondary
            onTouchTap={this.handleClickDelete}
          />}
        </Layout>}
      </Form>
    </Layout>;
  }
}

//      {notifyClose && <CloseButton notifyClose={this.handleClose} />}

ActionPanelForm.propTypes = propTypes;
ActionPanelForm.defaultProps = defaultProps;

export default ActionPanelForm;
