import {Dimensions} from 'react-native';

export const COLORS = {
  primary: '#4da2ff',
  white: '#fff',
  red: 'red',
  black: '#000000',
};

export const MOCK_ENABLED = false;
export const MOCK_LOCATION_DETECT = false;
export const NEW_TXN_FLOW = 'v2';
export const is_Toast_Enabled = true;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const HTTPMethod = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'delete',
};

export const BASE_URL = 'http://16.171.224.246:3000/api/';

export const apiHost = {
  // baseURL: 'http://10.0.2.2:3005/api/',
  // baseURL: "http://www.api.astafa.in/api/",
  // baseURL: "https://api.astafa.in/api/",
  baseURL: 'http://16.171.224.246:3000/api/',
  apiKey: '',
};

export const API = {
  loginAuthenticateUrl: BASE_URL + 'authuser/login',
  signUpUrl: BASE_URL + 'authuser/signup',
  signupVerifyUrl: BASE_URL + 'authuser/signupverify',
  forgotPasswordUrl: BASE_URL + 'authuser/forgotpassword',
  resetPasswordUrl: BASE_URL + 'authuser/resetpassword',
  serviceTypeUrl: BASE_URL + 'servicetypes',
  locationIdUrl: BASE_URL + 'locations',
  orderPickupUrl: BASE_URL + 'order',
  viewOrderListUrl: BASE_URL + 'order',
  countryList: BASE_URL + 'country',
  stateList: BASE_URL + 'state',
  cityList: BASE_URL + 'city',
  vehicles: BASE_URL + 'vehicles',
  viewDeliveryBoyOrderUrl: BASE_URL + 'order/deliveryboy/',
  viewConsumerOrderUrl: BASE_URL + 'order/consumer/',
  payment: BASE_URL + 'payment',
  documentsUpload: BASE_URL + 'documents/upload',
  vehicletypesUrl: BASE_URL + 'vehicletypes',
  planningSetupUrl: BASE_URL + 'planning',
  updateUserProfile: BASE_URL,
  viewImageUrl: BASE_URL + 'documents/view/',
  lookupDataUrl: BASE_URL + 'lookup',
  getAllocatedDeliveryBoy: BASE_URL + '/order/allocated/details?o=',
  viewOrderDetail: BASE_URL + 'order/view/',
  getNotificationUrl: BASE_URL + 'notification/list/',
  createDeliveryBoyAddressUrl: BASE_URL + 'daddressbook/create',
  getDeliveryBoyAddressListUrl: BASE_URL + 'daddressbook/list/',
  createConsumerAddressUrl: BASE_URL + 'caddressbook/create',
  getConsumerAddressListUrl: BASE_URL + 'caddressbook/list/',
};
