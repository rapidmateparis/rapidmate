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

export const PORT = {
  qa: '3009',
  uat: '3000',
  prod: '3008',
};

export const BASE_URL = `http://16.171.224.246:${PORT.qa}/api/`;

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
  getAllocatedDeliveryBoy: BASE_URL + 'order/allocated/details?o=',
  getAllocatedEnterprise: BASE_URL + 'enterprise/order/allocated/details?o=',
  viewOrderDetail: BASE_URL + 'order/view/',
  enterprisebranch: BASE_URL + 'enterprisebranch/get/',
  enterpriseOrder: BASE_URL + 'enterprise/order/',
  getNotificationUrl: BASE_URL + 'notification/list/',
  createDeliveryBoyAddressUrl: BASE_URL + 'daddressbook/create',
  getDeliveryBoyAddressListUrl: BASE_URL + 'daddressbook/list/',
  addressBookUpdateDeliveryBoyUrl: BASE_URL + 'daddressbook/update',
  addressBookUpDeleteDeliveryBoyUrl: BASE_URL + 'daddressbook/delete/',
  createConsumerAddressUrl: BASE_URL + 'caddressbook/create',
  getConsumerAddressListUrl: BASE_URL + 'caddressbook/list/',
  addressBookUpdateConsumerUrl: BASE_URL + 'caddressbook/update',
  addressBookUpDeleteConsumerUrl: BASE_URL + 'caddressbook/delete/',
  getCompanyListUrl: BASE_URL + 'deliveryboy/connections/',
  getDistancePriceListUrl: BASE_URL + 'vehicletypes/price/list?d=',
  getFaqListUrl: BASE_URL + 'faq',
  enterprisebranchCreate: BASE_URL + 'enterprisebranch',
  cancelOrderUrl: BASE_URL + 'order/cancel',
  deliveryBoyPlanningSetupDateList: BASE_URL + 'order/deliveryboy/plan/list',
  checkPromoCodeUrl: BASE_URL + 'promocode/check',
  orderRequestActionUrl: BASE_URL + 'order/request',
  paymentCancelRequestUrl: BASE_URL + 'payment/update',
  enterpriseOrdersUrl: BASE_URL + 'enterprise/order/getbyext/',
  viewEnterpriseOrderDetail: BASE_URL + 'enterprise/order/view/',
  getDeliveryBoyWalletUrl: BASE_URL + 'deliveryboy/wallet/balance/',
  getDeliveryBoyTransactionUrl: BASE_URL + 'deliveryboy/wallet/transaction/',
  orderStatusUpdateUrl: BASE_URL + 'order/update/status',
  consumerWalletUrl: BASE_URL + 'consumer/wallet/balance/',
  consumerPaymentMethodUrl: BASE_URL + 'consumer/paymentmethod',
  consumerBillingDetailsUrl: BASE_URL + 'consumer/billing/address/update',
  getconsumerBillingDetailsUrl: BASE_URL + 'consumer/billing/address/get/',
  enterprisePlanSearch: BASE_URL + 'enterprise/order/plan/search',
  changePasswordUrl: BASE_URL + 'authuser/changepassword',
  enterpriseDashboardUrl: BASE_URL + 'enterprise/dashboard/',
  imageViewUrl: BASE_URL + 'documents/view/',
  getEnterpriseAddressListUrl: BASE_URL + 'enterprise/address/list/',
  createEnterpriseAddressUrl: BASE_URL + 'enterprise/address/create',
  addressBookUpdateEnterpriseUrl: BASE_URL + 'enterprise/address/update',
  addressBookDeleteEnterpriseUrl: BASE_URL + 'enterprise/address/delete/',
  enterprisePaymentMethod: BASE_URL + 'enterprise/paymentmethod/getpaymentcard/'
};
