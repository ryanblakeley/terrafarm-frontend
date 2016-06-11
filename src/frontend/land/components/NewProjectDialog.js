import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import Dialog from 'material-ui/lib/dialog';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import GoRepo from 'react-icons/lib/go/repo';
import TextInput from '../../shared/components/TextInput';
import SelectInput from '../../shared/components/SelectInput';
import NewProject from './NewProject';

import classNames from '../styles/NewProjectDialogStylesheet.css';

class NewProjectDialog extends React.Component {
  static propTypes = {
    land: React.PropTypes.object,
    user: React.PropTypes.object,
    master: React.PropTypes.object,
    categories: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    categories: ['Hold', 'Ready', 'Urgent', 'Done'],
  };
  state = {
    open: false,
    canSubmit: false,
    attributes: {
      name: '',
      description: '',
      category: '',
    },
    categoryIndex: null,
  };
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
  }
  handleValid = () => {
    const currentValues = this.refs.form.getCurrentValues();
    const {name, description, categoryIndex} = currentValues;

    this.setState({
      attributes: {
        name,
        description,
        category: this.props.categories[categoryIndex],
      },
      canSubmit: true,
    });
  }
  handleInvalid = () => {
    this.setState({canSubmit: false});
  }
  handleChange = (currentValues, isChanged) => {
    const {name, description, categoryIndex} = currentValues;

    if (isChanged) {
      this.setState({
        attributes: {
          name,
          description,
          category: this.props.categories[categoryIndex],
        },
      });
    }
  }
  render () {
    const {master, land, user, categories} = this.props;
    const {attributes, canSubmit, open, categoryIndex} = this.state;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <NewProject
        land={land}
        master={master}
        user={user}
        primary
        onComplete={this.handleClose}
        attributes={attributes}
        disabled={!canSubmit}
      />,
    ];
    const projectCategories = categories.map((item, index) => <MenuItem
      key={item}
      value={index}
      primaryText={item}
    />);

    return <div className={classNames.this} >
      <MenuItem primaryText={'New project'} onTouchTap={this.handleOpen} />
      <Dialog
        title={'New Project'}
        actions={actions}
        onRequestClost={null}
        open={open}
      >
        <Formsy.Form
          ref={'form'}
          onValid={this.handleValid}
          onInvalid={this.handleInvalid}
        >
          <TextInput
            name={'name'}
            label={'Name'}
            validations={{matchRegexp: /[A-Za-z,\.0-9]*/}}
            required
          />
          <TextInput
            name={'description'}
            label={'Description'}
            placeholder={'Overview of project specification.'}
            validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
            required
            multiLine
            rows={3}
          />
          <SelectInput
            name={'categoryIndex'}
            label={'Category'}
            initialValue={categoryIndex}
            validations={'isNumeric,isExisty'}
            required
          >
            {projectCategories}
          </SelectInput>
        </Formsy.Form>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(NewProjectDialog, {
  fragments: {
    land: () => Relay.QL`
      fragment on Land {
        ${NewProject.getFragment('land')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        ${NewProject.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        ${NewProject.getFragment('master')},
      }
    `,
  },
});

