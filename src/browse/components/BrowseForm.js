import React from 'react';
import Formsy from 'formsy-react';
import {GoogleApiWrapper} from 'google-maps-react'; // eslint-disable-line
import IoIosSearch from 'react-icons/lib/io/ios-search';
// import IoIosCloseEmpty from 'react-icons/lib/io/ios-close-empty';
// import {stringifyBounds} from '../../shared/utils/parse-coords';
import FormError from '../../shared/components/FormError';
import TextInput from '../../shared/components/TextInput';
import Radio from '../../shared/components/Radio';
import RadioGroup from '../../shared/components/RadioGroup';
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
    resourceTypes: [
      { display: 'Land', value: 'LAND' },
      { display: 'Labor', value: 'LABOR' },
      { display: 'Equipment', value: 'EQUIPMENT' },
      { display: 'Raw Materials', value: 'RAW_MATERIALS' },
    ],
  };
  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object,
  };
  state = {
    canSubmit: false,
    error: null,
    mapCenterAddress: '',
    showResourceType: false,
  };
  componentWillMount () {
    const {router, location} = this.context;
    const showResourceType = router.isActive('/browse/resources');

    if (showResourceType && !location.query.category) {
      this.changeSearchParams({category: 'LAND'});
    }
    this.setState({showResourceType});
  }
  componentWillReceiveProps (nextProps, nextContext) {
    const {router, location} = nextContext;
    const showResourceType = router.isActive('/browse/resources');

    if (showResourceType && !location.query.category) {
      this.changeSearchParams({category: 'LAND'});
    }

    this.setState({showResourceType});
  }
  handleRadioChange = _ => {
    this.handleSubmit(this.form.getCurrentValues());
  }
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
    const {canSubmit, mapCenterAddress, showResourceType} = this.state;
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
    } else if (showResourceType) {
      this.changeSearchParams({
        search: data.searchText,
        category: data.resourceType,
      });
    } else {
      this.changeSearchParams({
        search: data.searchText,
      });
    }
  }
  handleGeocodeResultAndFormData = (result, formData) => {
    const {showResourceType} = this.state;
    const lat = result.geometry.location.lat();
    const lng = result.geometry.location.lng();

    if (showResourceType) {
      this.changeSearchParams({
        search: formData.searchText,
        category: formData.resourceType,
        lat,
        lng,
      });
    } else {
      this.changeSearchParams({
        search: formData.searchText,
        lat,
        lng,
      });
    }

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
    const {resourceTypes} = this.props;
    const {location} = this.context;
    const {canSubmit, error, mapCenterAddress, showResourceType} = this.state;
    const {search} = location.query || '';
    const resourceType = location.query.category || '';

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
        {showResourceType && <div className={`${classNames.flexRow} ${classNames.radio}`}>
          <RadioGroup
            name={'resourceType'}
            defaultSelected={resourceType}
            onChange={this.handleRadioChange}
            required
          >
            {resourceTypes.map(type => <Radio
              value={type.value}
              key={type.value}
              label={type.display}
            />)}
          </RadioGroup>
        </div>}
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

/*
          <IconButton
            onTouchTap={this.handleClearSearch}
            disabled={!canSubmit}
          >
            <IoIosCloseEmpty className={classNames.icon} />
          </IconButton>
*/
