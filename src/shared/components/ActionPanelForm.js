import React from 'react';
import Formsy from 'formsy-react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CloseButton from '../../shared/components/CloseButton';
import FormError from '../../shared/components/FormError';
import NotAuthorized from '../../shared/components/NotAuthorized';
import classNames from '../styles/ActionPanelFormStylesheet.css';

class ActionPanelForm extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.object, React.PropTypes.array,
    ]),
    bodyText: React.PropTypes.element,
    showForm: React.PropTypes.bool,
    formBlockedMessage: React.PropTypes.oneOfType([
      React.PropTypes.element, React.PropTypes.string,
    ]),
    notifyClose: React.PropTypes.func,
    onValidSubmit: React.PropTypes.func,
    onDelete: React.PropTypes.func,
    error: React.PropTypes.bool,
    errorMessage: React.PropTypes.string,
  };
  static defaultProps = {
    showForm: true,
    error: false,
    errorMessage: 'Internal server error.',
    formBlockedMessage: <NotAuthorized />,
  };
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
    const {notifyClose} = this.props;
    if (notifyClose) notifyClose();
  }
  // disabling the submit button should prevent this handler from ever being called
  handleFormError = data => {
    /*
    this.setState({
      errorMessage: 'Form error');
    });
    */
    console.error('Form error:', data);
  }
  handleSubmit = data => {
    const {onValidSubmit} = this.props;
    const {canSubmit} = this.state;

    if (!canSubmit) {
      console.warn('Form is not ready');
      return;
    } else if (onValidSubmit) {
      onValidSubmit(data);
      // delegate closing to the form, which can determine if it was successful or failed
      // this.handleClose();
    }
  }
  handleDelete = () => {
    const {onDelete} = this.props;
    if (onDelete) onDelete();
    this.handleClose();
  }
  render () {
    const {
      title, children, onDelete, bodyText, showForm, formBlockedMessage, error,
      errorMessage, notifyClose,
    } = this.props;
    const {canSubmit} = this.state;

    return <div className={classNames.this}>
      {notifyClose && <CloseButton notifyClose={this.handleClose} />}
      {title && <h5 className={classNames.title}>{title}</h5>}
      {bodyText && <div className={classNames.bodyText}>
        {bodyText}
      </div>}
      {!showForm && formBlockedMessage && <div>
        {formBlockedMessage}
      </div>}
      <Formsy.Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.handleSubmit}
        onInvalidSubmit={this.handleFormError}
      >
        {showForm && children}
        {error && <FormError text={errorMessage} /> }
        <div className={classNames.buttons}>
          {onDelete && <FlatButton
            label={'Delete'}
            onTouchTap={this.handleDelete}
          />}
          {showForm && <FlatButton
            label={'Cancel'}
            secondary
            onTouchTap={this.handleClose}
          />}
          {showForm && <RaisedButton
            label={'Save'}
            primary
            type={'submit'}
            disabled={!canSubmit}
          />}
        </div>
      </Formsy.Form>
    </div>;
  }
}

export default ActionPanelForm;
