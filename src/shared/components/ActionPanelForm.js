import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { H5, P } from 'shared/components/Typography';
import { Form } from 'shared/components/Form';
import { FlatButton, RaisedButton } from 'shared/components/Material';
// import CloseButton from 'shared/components/CloseButton';
import FormError from 'shared/components/FormError';

const propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  bodyText: PropTypes.element,
  showForm: PropTypes.bool,
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
  onDelete: () => {
    console.warn('onDelete method not provided to form container.');
  },
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
      // notifyClose,
    } = this.props;
    const { canSubmit } = this.state;

    return <Layout>
      {title && <H5>{title}</H5>}
      {bodyText && <Layout center><P>{bodyText}</P></Layout>}
      <Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.handleSubmit}
        onInvalidSubmit={this.handleFormError}
      >
        <Layout center topSmall>
          {showForm && <RaisedButton
            label={'Save'}
            primary
            type={'submit'}
            disabled={!canSubmit}
          />}
          {showForm && <FlatButton
            label={'Close'}
            secondary
            onTouchTap={this.handleClose}
          />}
          {onDelete && <FlatButton
            label={'Delete'}
            onTouchTap={this.handleDelete}
          />}
        </Layout>
        {error && <FormError text={errorMessage} />}
        {showForm && children}
      </Form>
    </Layout>;
  }
}

//      {notifyClose && <CloseButton notifyClose={this.handleClose} />}

ActionPanelForm.propTypes = propTypes;
ActionPanelForm.defaultProps = defaultProps;

export default ActionPanelForm;
