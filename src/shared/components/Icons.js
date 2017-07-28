/* eslint-disable max-len */
import PropTypes from 'prop-types';
import React from 'react';

// import IoLogIn from 'react-icons/lib/io/log-in';
// import IoIosSearch from 'react-icons/lib/io/ios-search';
// import IoIosMore from 'react-icons/lib/io/ios-more';
import IoEdit from 'react-icons/lib/io/edit';
import IoPerson from 'react-icons/lib/io/person';
import IoIosNutrition from 'react-icons/lib/io/ios-nutrition';
// import IoDollar from 'react-icons/lib/io/social-usd-outline';
// import IoIosCalendar from 'react-icons/lib/io/ios-calendar-outline';
// import IoIosPeople from 'react-icons/lib/io/ios-people';
// import IoIosTagsOutline from 'react-icons/lib/io/ios-pricetags-outline';
// import IoKey from 'react-icons/lib/io/lock-combination';
// import IoIosArrowLeft from 'react-icons/lib/io/ios-arrow-thin-left';
// import IoIosArrowRight from 'react-icons/lib/io/ios-arrow-thin-right';
import IoArrowDownB from 'react-icons/lib/io/arrow-down-b';
// import IoIosChatBubble from 'react-icons/lib/io/ios-chatbubble-outline';
// import IoAsterisk from 'react-icons/lib/io/asterisk';
// import IoIosLocation from 'react-icons/lib/io/ios-location';
// import IoIosLocationOutline from 'react-icons/lib/io/ios-locatoutline';
// import IoPlus from 'react-icons/lib/io/plus';
// import IoIosStar from 'react-icons/lib/io/ios-star';
// import IoIosStarOutline from 'react-icons/lib/io/ios-star-outline';
// import IoIosEmail from 'react-icons/lib/io/ios-email-outline';
// import IoArrowRightA from 'react-icons/lib/io/arrow-right-a';
// import IoLink from 'react-icons/lib/io/link';
import IoInformationCircled from 'react-icons/lib/io/ios-help-outline';
import IoIosCloseOutline from 'react-icons/lib/io/ios-close-outline';
// import IoIosCheckmarkOutline from 'react-icons/lib/io/ios-checkmark-outline';
// import IoIosTrashOutline from 'react-icons/lib/io/ios-trash-outline';
// import IoPinPoint from 'react-icons/lib/io/pinpoint';
// import FaExternalLink from 'react-icons/lib/fa/external-link';
import IoRefreshOutline from 'react-icons/lib/io/ios-refresh-outline';
import GoRepo from 'react-icons/lib/go/repo';

import logoIcon from '../elements/logo_icon.svg';
import logoFull from '../elements/logo_full_xlarge.png';
import logoName from '../elements/logo_name.png';

import { Icon } from './Typography';

const LogoIcon = props => <img src={logoIcon} alt={'terrafarm_logo'} {...props} />;
const LogoFullIcon = props => <img src={logoFull} alt={'Terrafarm'} {...props} />;
const LogoNameIcon = props => <img src={logoName} alt={'Terrafarm'} {...props} />;
// const LoginIcon = props => <Icon icon={<IoLogIn />} {...props} />;
// const SearchIcon = props => <Icon icon={<IoIosSearch />} {...props} />;
// const MoreIcon = props => <Icon icon={<IoIosMore />} {...props} />;
const EditIcon = props => <Icon icon={<IoEdit />} {...props} />;
const PersonIcon = props => <Icon icon={<IoPerson />} {...props} />;
const FoodIcon = props => <Icon icon={<IoIosNutrition />} {...props} />;
// const DollarIcon = props => <Icon icon={<IoDollar />} {...props} />;
// const CalendarIcon = props => <Icon icon={<IoIosCalendar />} {...props} />;
// const PeopleIcon = props => <Icon icon={<IoIosPeople />} {...props} />;
// const TagsIcon = props => <Icon icon={<IoIosTagsOutline />} {...props} />;
// const TokenIcon = props => <Icon icon={<IoKey />} {...props} />;
// const ArrowLeftIcon = props => <Icon icon={<IoIosArrowLeft />} {...props} />;
// const ArrowRightIcon = props => <Icon icon={<IoIosArrowRight />} {...props} />;
const ArrowDownIcon = props => <Icon icon={<IoArrowDownB />} {...props} />;
// const ChatBubbleIcon = props => <Icon icon={<IoIosChatBubble />} {...props} />;
// const AsteriskIcon = props => <Icon icon={<IoAsterisk />} {...props} />;
// const LocationIcon = props => <Icon icon={<IoIosLocation />} {...props} />;
// const LocationOutlineIcon = props => <Icon icon={<IoIosLocationOutline />} {...props} />;
// const PlusIcon = props => <Icon icon={<IoPlus />} {...props} />;
// const StarIcon = props => <Icon icon={<IoIosStar />} {...props} />;
// const StarOutlineIcon = props => <Icon icon={<IoIosStarOutline />} {...props} />;
// const EmailIcon = props => <Icon icon={<IoIosEmail />} {...props} />;
// const ArrowRightThickIcon = props => <Icon icon={<IoArrowRightA />} {...props} />;
// const LinkIcon = props => <Icon icon={<IoLink />} {...props} />;
// const ExternalLinkIcon = props => <Icon icon={<FaExternalLink />} {...props} />;
const InformationIcon = props => <Icon icon={<IoInformationCircled />} {...props} />;
const CloseIcon = props => <Icon icon={<IoIosCloseOutline />} {...props} />;
// const CheckmarkIcon = props => <Icon icon={<IoIosCheckmarkOutline />} {...props} />;
// const TrashIcon = props => <Icon icon={<IoIosTrashOutline />} {...props} />;
// const CrosshairIcon = props => <Icon icon={<IoPinPoint />} {...props} />;
const ReloadIcon = props => <Icon icon={<IoRefreshOutline />} {...props} />;
const JournalIcon = props => <Icon icon={<GoRepo />} {...props} />;

const commonPropTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  color: PropTypes.string,
};

const commonDefaultProps = {
  className: null,
  style: {},
  width: 40,
  height: 40,
  color: '',
};

LogoIcon.propTypes = commonPropTypes;
// LoginIcon.propTypes = commonPropTypes;
// SearchIcon.propTypes = commonPropTypes;
// MoreIcon.propTypes = commonPropTypes;
EditIcon.propTypes = commonPropTypes;
PersonIcon.propTypes = commonPropTypes;
FoodIcon.propTypes = commonPropTypes;
// DollarIcon.propTypes = commonPropTypes;
// CalendarIcon.propTypes = commonPropTypes;
// PeopleIcon.propTypes = commonPropTypes;
// TagsIcon.propTypes = commonPropTypes;
// TokenIcon.propTypes = commonPropTypes;
// ArrowLeftIcon.propTypes = commonPropTypes;
// ArrowRightIcon.propTypes = commonPropTypes;
ArrowDownIcon.propTypes = commonPropTypes;
// ChatBubbleIcon.propTypes = commonPropTypes;
// AsteriskIcon.propTypes = commonPropTypes;
// LocationIcon.propTypes = commonPropTypes;
// LocationOutlineIcon.propTypes = commonPropTypes;
// PlusIcon.propTypes = commonPropTypes;
// StarIcon.propTypes = commonPropTypes;
// StarOutlineIcon.propTypes = commonPropTypes;
// EmailIcon.propTypes = commonPropTypes;
// ArrowRightThickIcon.propTypes = commonPropTypes;
// LinkIcon.propTypes = commonPropTypes;
// ExternalLinkIcon.propTypes = commonPropTypes;
InformationIcon.propTypes = commonPropTypes;
CloseIcon.propTypes = commonPropTypes;
// CheckmarkIcon.propTypes = commonPropTypes;
// TrashIcon.propTypes = commonPropTypes;
// CrosshairIcon.propTypes = commonPropTypes;
ReloadIcon.propTypes = commonPropTypes;
JournalIcon.propTypes = commonPropTypes;

LogoIcon.defaultProps = commonDefaultProps;
LogoFullIcon.defaultProps = commonDefaultProps;
LogoNameIcon.defaultProps = commonDefaultProps;
// PeopleIcon.defaultProps = commonDefaultProps;

EditIcon.defaultProps = commonDefaultProps;
InformationIcon.defaultProps = commonDefaultProps;
CloseIcon.defaultProps = commonDefaultProps;

export {
  LogoIcon,
  LogoFullIcon,
  LogoNameIcon,
//   LoginIcon,
//   SearchIcon,
//   MoreIcon,
  EditIcon,
  PersonIcon,
  FoodIcon,
//   DollarIcon,
//   CalendarIcon,
//   PeopleIcon,
//   TagsIcon,
//   TokenIcon,
//   ArrowLeftIcon,
//   ArrowRightIcon,
  ArrowDownIcon,
//   ChatBubbleIcon,
//   AsteriskIcon,
//   LocationIcon,
//   LocationOutlineIcon,
//   PlusIcon,
//   StarIcon,
//   StarOutlineIcon,
//   EmailIcon,
//   ArrowRightThickIcon,
//   LinkIcon,
//   ExternalLinkIcon,
  InformationIcon,
  CloseIcon,
//   CheckmarkIcon,
//   TrashIcon,
//   CrosshairIcon,
  ReloadIcon,
  JournalIcon,
};
