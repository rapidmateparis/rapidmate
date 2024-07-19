import {Dimensions} from 'react-native';
import Config from 'react-native-config';

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

export const BASE_URL = Config.BASE_URL;

export const OPEN_AI = {
  baseUrl: Config.AI_BASE_URL,
  token: Config.AI_TOKEN,
};

export const apiHost = {
  // baseURL: 'http://10.0.2.2:3005/api/',
  // baseURL: "http://www.api.astafa.in/api/",
  // baseURL: "https://api.astafa.in/api/",
  baseURL: 'https://betaapi.astafa.in/api/',
  apiKey: '',
};

export const API = {
  loginAuthenticateUrl: BASE_URL + ""
}
