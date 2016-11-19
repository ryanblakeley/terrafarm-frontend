import React from 'react';
import Formsy from 'formsy-react';
import IoIosSearch from 'react-icons/lib/io/ios-search';
import IoIosCloseEmpty from 'react-icons/lib/io/ios-close-empty';
import FormError from '../../shared/components/FormError';
import TextInput from '../../shared/components/TextInput';
import IconButton from '../../shared/components/IconButton';
import classNames from '../styles/SearchBarStylesheet.css';

class SearchBar extends React.Component {
  static propTypes = {
    onChangeSearchText: React.PropTypes.func,
  };
  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object,
  };
  state = {
    canSubmit: false,
    error: null,
    searchText: '',
  }
  componentWillMount () {
    const {location} = this.context;
    const search = location.query.text || '';

    this.setState({searchText: search});
  }
  componentWillReceiveProps (props, context) {
    const {location} = context;
    const search = location.query.text;

    if (!search) {
      this.setState({searchText: ''});
    }
  }
  handleChange = (event, value) => {
    this.setState({
      searchText: value,
    });
  }
  handleValid = () => {
    this.setState({ canSubmit: true });
  }
  handleInvalid = () => {
    this.setState({ canSubmit: false });
  }
  // disabling the submit button should prevent this handler from ever being called
  handleFormError = data => {
    this.setState({
      error: 'Form error',
    });
    console.error('Form error:', data);
  }
  handleSubmit = data => {
    const {canSubmit, searchText} = this.state;
    const {onChangeSearchText} = this.props;

    if (!canSubmit) {
      console.warn('Form is not ready');
      return;
    }

    onChangeSearchText(searchText);
  }
  handleClear = () => {
    const {router, location} = this.context;
    const {onChangeSearchText} = this.props;

    this.setState({
      searchText: '',
    });
    router.replace({
      pathname: location.pathname,
    });

    onChangeSearchText('');
  }
  render () {
    const {canSubmit, searchText, error} = this.state;

    return <div className={classNames.this}>
      <Formsy.Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.handleSubmit}
        onInvalidSubmit={this.handleFormError}
        className={classNames.form}
      >
        <TextInput
          name={'searchText'}
          label={'Search'}
          validations={{matchRegexp: /[A-Za-z,0-9]*/}}
          onChange={this.handleChange}
          initialValue={searchText}
          required
        />
        {error && <FormError text={error} /> }
        <div className={classNames.buttons}>
          <IconButton
            type={'submit'}
            disabled={!canSubmit}
          >
            <IoIosSearch className={classNames.icon} />
          </IconButton>
          <IconButton
            onTouchTap={this.handleClear}
            disabled={!canSubmit}
          >
            <IoIosCloseEmpty className={classNames.icon} />
          </IconButton>
        </div>
      </Formsy.Form>
    </div>;
  }
}

export default SearchBar;
