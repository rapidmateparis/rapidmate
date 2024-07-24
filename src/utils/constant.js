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

export const BASE_URL = "http://16.171.224.246:3004/api/";

export const apiHost = {
  // baseURL: 'http://10.0.2.2:3005/api/',
  // baseURL: "http://www.api.astafa.in/api/",
  // baseURL: "https://api.astafa.in/api/",
  baseURL: 'http://16.171.224.246:3004/api/',
  apiKey: '',
};

export const API = {
  loginAuthenticateUrl: BASE_URL + "authuser/login",
  signUpUrl: BASE_URL + "authuser/signup",
  signupVerifyUrl: BASE_URL + "authuser/signupverify",
  forgotPasswordUrl: BASE_URL + "authuser/forgotpassword",
  resetPasswordUrl: BASE_URL + "authuser/resetpassword",
  serviceTypeUrl: BASE_URL + "servicetypes",
  locationIdUrl: BASE_URL + "locations",
  orderPickupUrl: BASE_URL +"order"
  
}
