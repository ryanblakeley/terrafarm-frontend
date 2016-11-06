import React from 'react';
import Formsy from 'formsy-react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CloseButton from '../../shared/components/CloseButton';
import classNames from '../styles/ActionPanelFormStylesheet.css';

class ActionPanelForm extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.object, React.PropTypes.array,
    ]),
    bodyText: React.PropTypes.element,
    showForm: React.PropTypes.bool,
    notifyClose: React.PropTypes.func,
    onValidSubmit: React.PropTypes.func,
    onDelete: React.PropTypes.func,
  };
  static defaultProps = {
    showForm: true,
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
  handleFormError = data => {
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
      this.handleClose();
    }
  }
  handleDelete = () => {
    const {onDelete} = this.props;
    if (onDelete) onDelete();
    this.handleClose();
  }
  render () {
    const {title, children, onDelete, bodyText, showForm} = this.props;
    const {canSubmit} = this.state;

    return <div className={classNames.this}>
      <CloseButton notifyClose={this.handleClose} />
      <h5 className={classNames.title}>{title}</h5>
      {bodyText && <div className={classNames.bodyText}>
        {bodyText}
      </div>}
      <Formsy.Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.handleSubmit}
        onInvalidSubmit={this.handleFormError}
      >
        {showForm && children}
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
