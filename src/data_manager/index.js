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
      postParams.status,
    postParams,
  );
  axiosCall(
    API.viewDeliveryBoyOrderUrl +
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
  myHeaders.append('upload_type', 'ORDER_DOC');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: params,
    redirect: 'follow',
  };

  fetch(API.documentsUpload, requestOptions)
    .then(response => response.text())
    .then(result => successCallback(result))
    .catch(error => errorCallback(error));
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

export const getProfileInformation = (
  params,
  successCallback,
  errorCallback,
) => {
  console.log(
    'getProfileInformation',
    params,
    API.updateUserProfile + params.orderNumber,
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

export const getViewOrderDetail = (param, successCallback, errorCallback) => {
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

export const createEnterpriseOrder = (params, successCallback, errorCallback) => {
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

export const getCompanyList = (
  param,
  successCallback,
  errorCallback,
) => {
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


