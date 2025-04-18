import {axiosCall} from '../api_manager';
import {API, HTTPMethod} from '../utils/constant';

export const authenticateUser = (params, successCallback, errorCallback) => {
  console.log('print_data===>loginUser', params, API.loginAuthenticateUrl);
  axiosCall(
    API.loginAuthenticateUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const signUpUser = (params, successCallback, errorCallback) => {
  console.log('print_data===>signUpUser', params, API.signUpUrl);
  axiosCall(
    API.signUpUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
      console.log('print_data===>signUpUser', response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const signUpVerifyApi = (params, successCallback, errorCallback) => {
  axiosCall(
    API.signupVerifyUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const forgotPasswordApi = (params, successCallback, errorCallback) => {
  axiosCall(
    API.forgotPasswordUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const resetPasswordApi = (params, successCallback, errorCallback) => {
  axiosCall(
    API.resetPasswordUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getServiceTypeApi = (params, successCallback, errorCallback) => {
  axiosCall(
    API.serviceTypeUrl,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getLocationId = (params, successCallback, errorCallback) => {
  axiosCall(
    API.locationIdUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const createPickupOrder = (params, successCallback, errorCallback) => {
  console.log('createPickupOrder', params, API.orderPickupUrl);
  axiosCall(
    API.orderPickupUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getViewOrdersList = (params, successCallback, errorCallback) => {
  axiosCall(
    API.viewOrderListUrl,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getCountryList = (params, successCallback, errorCallback) => {
  axiosCall(
    API.countryList,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getStateList = (params, successCallback, errorCallback) => {
  axiosCall(
    API.stateList,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getCityList = (params, successCallback, errorCallback) => {
  axiosCall(
    API.cityList,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const addVehicleApi = (params, successCallback, errorCallback) => {
  console.log('print_view===>', API.vehicles, JSON.stringify(params));
  axiosCall(
    API.vehicles,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getLocations = (params, successCallback, errorCallback) => {
  axiosCall(
    API.locationIdUrl,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDeliveryBoyViewOrdersList = (
  postParams,
  params,
  successCallback,
  errorCallback,
) => {
  console.log(
    API.viewDeliveryBoyOrderUrl +
      postParams.extentedId +
      '?status=' +
      postParams.status +
      '&orderType=' +
      postParams.orderType,
    postParams,
  );
  axiosCall(
    API.viewDeliveryBoyOrderUrl +
      postParams.extentedId +
      '?status=' +
      postParams.status +
      '&orderType=' +
      postParams.orderType +
      '&page=' +
      postParams.page +
      '&size=' +
      postParams.size,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDeliveryBoyViewOrdersDashboardList = (
  postParams,
  params,
  successCallback,
  errorCallback,
) => {
  console.log(
    API.viewDeliveryBoyOrderUrl +
      postParams.extentedId +
      '?status=' +
      postParams.status +
      '&orderType=' +
      postParams.orderType,
    postParams,
  );
  axiosCall(
    API.viewDeliveryBoyOrderUrl +
      postParams.extentedId +
      '?status=' +
      postParams.status +
      '&orderType=' +
      postParams.orderType,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getConsumerViewOrdersList = (
  postParams,
  params,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.viewConsumerOrderUrl +
      postParams.extentedId +
      '?status=' +
      postParams.status,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const addPayment = (params, successCallback, errorCallback) => {
  console.log('addPayment', params, API.payment);
  axiosCall(
    API.payment,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const uploadDocumentsApi = (params, successCallback, errorCallback) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'multipart/form-data');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: params,
    redirect: 'follow',
  };

  fetch(API.documentsUpload, requestOptions)
    .then(response => response.text())
    .then(result => successCallback(result))
    .catch(error => 
      errorCallback("Server busy. Please try again!!!")
    );
};

export const uploadFileWithRetryProcess = async (params, retries = 3, timeout = 10000) => {
 
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout); // Timeout after X ms

  let attempt = 0;
  let success = false;

  // Retry loop for connection issues
  while (attempt < retries && !success) {
    try {
      attempt++;
      const response = await fetch(API.documentsUpload, {
        method: 'POST',
        body: params,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        signal: controller.signal, 
        redirect: 'follow',
      });

      if (!response.ok) {
        return null;
      }

      const result = await response.json();
      console.log('File uploaded successfully:', result);
      return result;
    } catch (error) {
      if (error.name === 'AbortError') {
        Alert.alert('Timeout', 'The upload request timed out. Please try again.');
        return null;
      } else {
        console.error('Error uploading file:', error);
        if (attempt < retries) {
          Alert.alert(`Retrying... Attempt ${attempt}`);
        } else {
          Alert.alert('Upload Failed', 'Failed to upload file after multiple attempts.');
          return null;
        }
      }
    }
  }

  clearTimeout(timeoutId); // Clear timeout after finishing the process
};

export const getAllVehicleTypes = (params, successCallback, errorCallback) => {
  axiosCall(
    API.vehicletypesUrl,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const planningSetupUpdate = (params, successCallback, errorCallback) => {
  axiosCall(
    API.planningSetupUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getCurrentPlanningSetup = (
  params,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.planningSetupUrl +
      `?year=${params.year}&month=${params.month}&week=${params.week}&ext_id=${params.ext_id}`,
    HTTPMethod.GET,
    null,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const updateUserProfile = (
  userRole,
  params,
  successCallback,
  errorCallback,
) => {
  let setUrl =
    userRole == 'CONSUMER'
      ? 'consumer'
      : userRole == 'DELIVERY_BOY'
      ? 'deliveryboy'
      : 'enterprise';
  console.log(userRole, params, API.updateUserProfile + setUrl);
  axiosCall(
    API.updateUserProfile + setUrl,
    HTTPMethod.PUT,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getLookupData = (params, successCallback, errorCallback) => {
  axiosCall(
    API.lookupDataUrl,
    HTTPMethod.GET,
    null,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getAllocatedDeliveryBoy = (
  params,
  successCallback,
  errorCallback,
) => {
  console.log(
    'getAllocatedDeliveryBoy',
    params,
    API.getAllocatedDeliveryBoy + params.orderNumber,
  );
  axiosCall(
    API.getAllocatedDeliveryBoy + params.orderNumber,
    HTTPMethod.GET,
    null,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getAllocatedEnterprise = (
  params,
  successCallback,
  errorCallback,
) => {
  console.log(
    'getAllocatedEnterprise',
    params,
    API.getAllocatedEnterprise + params.orderNumber,
  );
  axiosCall(
    API.getAllocatedEnterprise + params.orderNumber,
    HTTPMethod.GET,
    null,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getViewOrderDetail = (param, successCallback, errorCallback) => {
  console.log('print_view===>', API.viewOrderDetail + param);
  axiosCall(
    API.viewOrderDetail + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getLocationById = (params, successCallback, errorCallback) => {
  axiosCall(
    API.locationIdUrl + '/' + params,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getAVehicleByTypeId = (param, successCallback, errorCallback) => {
  axiosCall(
    API.vehicletypesUrl + '/' + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getEnterpriseBranch = (params, successCallback, errorCallback) => {
  axiosCall(
    API.enterprisebranch + params,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getNotificationList = (param, successCallback, errorCallback) => {
  axiosCall(
    API.getNotificationUrl + param + '?page=1&size=15',
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const createEnterpriseOrder = (
  params,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.enterpriseOrder,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const createDeliveryBoyAddressBook = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.createDeliveryBoyAddressUrl,
    HTTPMethod.POST,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const createConsumerAddressBook = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.createConsumerAddressUrl,
    HTTPMethod.POST,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDeliveryBoyAddressBookList = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.getDeliveryBoyAddressListUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getConsumerAddressBookList = (
  param,
  successCallback,
  errorCallback,
) => {
  console.log('print_data==>', API.getConsumerAddressListUrl, param);
  axiosCall(
    API.getConsumerAddressListUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getCompanyList = (param, successCallback, errorCallback) => {
  axiosCall(
    API.getCompanyListUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDistancePriceList = (param, successCallback, errorCallback) => {
  axiosCall(
    API.getDistancePriceListUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getFaqsList = (param, successCallback, errorCallback) => {
  axiosCall(
    API.getFaqListUrl,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const updateAddressBookforConsumer = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.addressBookUpdateConsumerUrl,
    HTTPMethod.PUT,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const updateAddressBookforDeliveryBoy = (
  param,
  successCallback,
  errorCallback,
) => {
  console.log(
    'url==>updateAddressBookforDeliveryBoy',
    API.addressBookUpdateDeliveryBoyUrl,
    param,
  );
  axiosCall(
    API.addressBookUpdateDeliveryBoyUrl,
    HTTPMethod.PUT,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const deleteAddressBookforDeliveryBoy = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.addressBookUpDeleteDeliveryBoyUrl + param.id,
    HTTPMethod.DELETE,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const deleteAddressBookforConsumer = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.addressBookUpDeleteConsumerUrl + param.id,
    HTTPMethod.DELETE,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const createEnterpriseBranch = (
  params,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.enterprisebranchCreate,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const cancelOrderConsumer = (params, successCallback, errorCallback) => {
  axiosCall(
    API.cancelOrderUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const cancelOrderEnterprise = (
  params,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.cancelOrderEnterpriseUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const downloadInvoiceOrder = (
  params,
  type,
  successCallback,
  errorCallback,
) => {
  console.log(
    'print_data==> invoice',
    API.downloadInvoice + params + '/' + type + '?show=true',
  );
  axiosCall(
    API.downloadInvoice + params + '/' + type + '?show=true',
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDeliveryBoyListUsingDate = (
  params,
  successCallback,
  errorCallback,
) => {
  console.log('print_data==>', API.deliveryBoyPlanningSetupDateList, params);
  axiosCall(
    API.deliveryBoyPlanningSetupDateList,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const checkPromoCode = (params, successCallback, errorCallback) => {
  axiosCall(
    API.checkPromoCodeUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};
export const orderRequestAction = (params, successCallback, errorCallback) => {
  console.log('orderRequestAction==>', API.orderRequestActionUrl, params);
  axiosCall(
    API.orderRequestActionUrl,
    HTTPMethod.PUT,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const paymentCancelRequest = (
  params,
  successCallback,
  errorCallback,
) => {
  console.log('paymentCancelRequest==>', API.paymentCancelRequestUrl, params);
  axiosCall(
    API.paymentCancelRequestUrl,
    HTTPMethod.PUT,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getEnterpriseOrders = (param, successCallback, errorCallback) => {
  var url = API.enterpriseOrdersUrl + param;
  axiosCall(
    url,
    HTTPMethod.GET,
    null,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getViewEnterpriseOrderDetail = (
  param,
  successCallback,
  errorCallback,
) => {
  console.log('url', API.viewEnterpriseOrderDetail + param);
  axiosCall(
    API.viewEnterpriseOrderDetail + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDeliveryBoyWallet = (param, successCallback, errorCallback) => {
  console.log('url', API.getDeliveryBoyWalletUrl + param);
  axiosCall(
    API.getDeliveryBoyWalletUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDeliveryBoyTransactions = (
  param,
  successCallback,
  errorCallback,
) => {
  let tempUrl = API.getDeliveryBoyTransactionUrl + param.extId;
  if (param?.searchText) {
    tempUrl += '?o=' + param.searchText;
  }
  if (param?.durationType) {
    tempUrl += '?durationType=' + param.durationType;
  }
  console.log('url', tempUrl);

  axiosCall(
    tempUrl,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const orderStatusUpdate = (param, successCallback, errorCallback) => {
  console.log('url', API.orderStatusUpdateUrl, param);
  axiosCall(
    API.orderStatusUpdateUrl,
    HTTPMethod.PUT,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getConsumerWallet = (param, successCallback, errorCallback) => {
  console.log('url', API.consumerWalletUrl + param);
  axiosCall(
    API.consumerWalletUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const addConsumerPaymentMethod = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.consumerPaymentMethodUrl,
    HTTPMethod.POST,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const addConsumerBillingDetails = (
  param,
  successCallback,
  errorCallback,
) => {
  console.log('url', API.consumerBillingDetailsUrl, param);
  axiosCall(
    API.consumerBillingDetailsUrl,
    HTTPMethod.POST,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const fetchEnterprisePlans = (param, successCallback, errorCallback) => {
  axiosCall(
    API.enterprisePlanSearch,
    HTTPMethod.POST,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getConsumerBillingDetails = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.getconsumerBillingDetailsUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const changeUserPassword = (param, successCallback, errorCallback) => {
  console.log('url', API.changePasswordUrl, param);
  axiosCall(
    API.changePasswordUrl,
    HTTPMethod.POST,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getConsumerViewOrdersListBySearch = (
  postParams,
  successCallback,
  errorCallback,
) => {
  console.log(
    'url',
    API.viewConsumerOrderUrl +
      `${postParams.extentedId}?status=${postParams.status}&orderType=N&o=${postParams.orderNumber}`,
  );
  axiosCall(
    API.viewConsumerOrderUrl +
      `${postParams.extentedId}?status=${postParams.status}&orderType=N&o=${postParams.orderNumber}`,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDeliveryBoyViewOrdersListBySearch = (
  postParams,
  successCallback,
  errorCallback,
) => {
  console.log(
    'url',
    API.viewConsumerOrderUrl +
      `${postParams.extentedId}?status=${postParams.status}&orderType=${postParams.filterCriteria}&o=${postParams.orderNumber}`,
  );
  axiosCall(
    API.viewConsumerOrderUrl +
      `${postParams.extentedId}?status=${postParams.status}&orderType=${postParams.filterCriteria}&o=${postParams.orderNumber}`,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getEnterpriseDashboardInfo = (
  param,
  successCallback,
  errorCallback,
) => {
  console.log(
    'Dash board info enterprise ===>',
    API.enterpriseDashboardUrl + param,
  );
  axiosCall(
    API.enterpriseDashboardUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const updateEnterpriseBranch = (
  params,
  successCallback,
  errorCallback,
) => {
  console.log('url', API.enterprisebranchCreate + '/' + params.id);
  axiosCall(
    API.enterprisebranchCreate + '/' + params.id,
    HTTPMethod.PUT,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getEnterpriseAddressBookList = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.getEnterpriseAddressListUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const createEnterpriseAddressBook = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.createEnterpriseAddressUrl,
    HTTPMethod.POST,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const updateAddressBookforEnterprise = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.addressBookUpdateEnterpriseUrl,
    HTTPMethod.PUT,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const deleteAddressBookforEnterprise = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.addressBookDeleteEnterpriseUrl + param.id,
    HTTPMethod.DELETE,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getEnterprisePaymentMethod = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.enterprisePaymentMethod + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const updateUserProfileEnterprise = (
  params,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.updateUserProfile + 'enterprise',
    HTTPMethod.PUT,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const orderOPTVerify = (params, successCallback, errorCallback) => {
  console.log('url==>orderOPTVerify', API.verifyOrderOTP, params);
  axiosCall(
    API.verifyOrderOTP,
    HTTPMethod.PUT,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const orderOPTVerifyForDelivery = (
  params,
  successCallback,
  errorCallback,
) => {
  console.log(
    'url==>orderOPTVerifyForDelivery',
    API.verifyOrderDeliveryOTP,
    params,
  );
  axiosCall(
    API.verifyOrderDeliveryOTP,
    HTTPMethod.PUT,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const addEnterprisePaymentMethod = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.enterprisePaymentMethodUrl,
    HTTPMethod.POST,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const searchOrderApi = (params, successCallback, errorCallback) => {
  axiosCall(
    API.searchOrder,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getCalendarPlanDate = (params, successCallback, errorCallback) => {
  axiosCall(
    API.calendarPlanDate + params.delivery_boy_ext_id,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getNotificationCount = (
  params,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.notificationCount + params,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const updateDeliveryBoyBillingDetails = (
  params,
  successCallback,
  errorCallback,
) => {
  console.log(params, API.deliveryBoyBillingAddressUpdate);
  axiosCall(
    API.deliveryBoyBillingAddressUpdate,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDeliveryBoyBillingDetails = (
  params,
  successCallback,
  errorCallback,
) => {
  console.log('URL ', API.deliveryBoyBillingAddressGet + params);
  axiosCall(
    API.deliveryBoyBillingAddressGet + params,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getTaxDetails = (params, successCallback, errorCallback) => {
  console.log('URL ', API.vechicleTaxList);
  axiosCall(
    API.vechicleTaxList,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const updateShiftOrderStatus = (
  params,
  successCallback,
  errorCallback,
) => {
  console.log(params, API.changeCreateShiftStatus);
  axiosCall(
    API.changeCreateShiftStatus,
    HTTPMethod.PUT,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDeliveryBoyOrderSlots = (
  params,
  successCallback,
  errorCallback,
) => {
  console.log('URL ===', API.deliveryBoyOrderSlots + params);
  axiosCall(
    API.deliveryBoyOrderSlots + params,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getBillingAddressDetails = (
  param,
  successCallback,
  errorCallback,
) => {
  console.log('billing address details:', API.billingAddressDetails, param);
  axiosCall(
    API.billingAddressDetails + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const updateBillingAddressDetails = (
  params,
  body,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.billingAddressDetailsUpdate,
    HTTPMethod.POST,
    body,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getAppVersion = (successCallback, errorCallback) => {
  axiosCall(
    API.appVersion,
    HTTPMethod.GET,
    null,
    (response) => {
      console.log('App version response:', response);
      successCallback(response);
    },
    (errorResponse) => {
      errorCallback(errorResponse);
    }
  );
};


