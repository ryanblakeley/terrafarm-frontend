import React from 'react';
import {GoogleApiWrapper} from 'shared/components/GoogleMaps';
import {SearchIcon} from 'shared/components/Icons';
import {Form, TextInput} from 'shared/components/Form';
import FormError from 'shared/components/FormError';
import {IconButton} from 'shared/components/Material';
import classNames from '../styles/BrowseFormStylesheet.css';

class Container extends React.Component {
  static propTypes = {
    google: React.PropTypes.object,
    setSearchParams: React.PropTypes.func,
    initialAddress: React.PropTypes.string,
    resourceTypes: React.PropTypes.array,
  };
  static defaultProps = {
    google: window.google,
    initialAddress: '23.3988813,-125.898086',
  };
  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object,
  };
  state = {
    canSubmit: false,
    error: null,
    mapCenterAddress: '',
  };
  handleValid = () => {
    this.setState({ canSubmit: true });
  }
  handleInvalid = () => {
    this.setState({ canSubmit: false });
  }
  handleFormError = data => {
    // should not be possible to get here because submit button would be disabled
    this.setState({
      error: 'Form error',
    });
    console.error('Form error:', data);
  }
  handleSubmit = data => {
    const {canSubmit, mapCenterAddress} = this.state;
    const address = data.location;

    if (!canSubmit) {
      // should not be possible to get here because submit button would be disabled
      console.warn('Unable to submit, form is invalid.');
      return;
    }

    if (address && address !== mapCenterAddress) {
      this.geocode({address}, (results, status) => {
        if (status === 'OK') {
          this.handleGeocodeResultAndFormData(results[0], data);
        }
      });
    } else {
      this.changeSearchParams({
        search: data.searchText,
      });
    }
  }
  handleGeocodeResultAndFormData = (result, formData) => {
    const lat = result.geometry.location.lat();
    const lng = result.geometry.location.lng();

    this.changeSearchParams({
      search: formData.searchText,
      lat,
      lng,
    });

    this.setState({mapCenterAddress: formData.location});
  }
  changeSearchParams = patch => {
    const {setSearchParams} = this.props;

    setSearchParams(patch);
  }
  geocode = (request, callback) => {
    const {google} = this.props;
    const Geocoder = new google.maps.Geocoder();
    Geocoder.geocode(request, callback);
  }
  render () {
    const {location} = this.context;
    const {canSubmit, error, mapCenterAddress} = this.state;
    const {search} = location.query || '';

    return <div className={classNames.this}>
      <Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.handleSubmit}
        onInvalidSubmit={this.handleFormError}
        className={classNames.flexColumn}
        ref={form => (this.form = form)}
      >
        <div className={classNames.flexRow}>
          <TextInput
            name={'searchText'}
            label={'Search'}
            validations={{matchRegexp: /[A-Za-z,0-9]*/}}
            value={search}
            ref={input => (this.search = input)}
          />
        </div>
        <div className={`${classNames.flexRow} ${classNames.hidden}`}>
          <TextInput
            name={'location'}
            label={'Location'}
            validations={{matchRegexp: /[A-Za-z,0-9]*/}}
            value={mapCenterAddress}
            ref={input => (this.location = input)}
          />
        </div>
        <div className={classNames.flexRow}>
          <IconButton
            type={'submit'}
            disabled={!canSubmit}
          >
            <SearchIcon />
          </IconButton>
        </div>
        {error && <FormError text={error} /> }
      </Form>
    </div>;
  }
}

export default GoogleApiWrapper(Container);
