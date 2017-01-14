import React from 'react';
import Formsy from 'formsy-react';
import {GoogleApiWrapper} from 'google-maps-react'; // eslint-disable-line
import IoIosSearch from 'react-icons/lib/io/ios-search';
import FormError from '../../shared/components/FormError';
import TextInput from '../../shared/components/TextInput';
import IconButton from '../../shared/components/IconButton';
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
    initialAddress: '45,-117',
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
      <Formsy.Form
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
            initialValue={search}
            ref={input => (this.search = input)}
          />
        </div>
        <div className={classNames.flexRow}>
          <TextInput
            name={'location'}
            label={'Location'}
            validations={{matchRegexp: /[A-Za-z,0-9]*/}}
            initialValue={mapCenterAddress}
            ref={input => (this.location = input)}
          />
        </div>
        <div className={classNames.flexRow}>
          <IconButton
            type={'submit'}
            disabled={!canSubmit}
          >
            <IoIosSearch className={classNames.icon} />
          </IconButton>
        </div>
        {error && <FormError text={error} /> }
      </Formsy.Form>
    </div>;
  }
}

export default GoogleApiWrapper({ // eslint-disable-line
  apiKey: process.env.GOOGLE_MAPS_KEY,
})(Container);
