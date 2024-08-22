import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL, HTTPMethod} from '../utils/constant';

export async function axiosCall(
  url,
  method,
  params = {},
  callbackResponse,
  callbackErrorResponse,
) {
  const token = await AsyncStorage.getItem('TOKEN');

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
  });

  // axiosInstance.interceptors.request.use(
  //   function (config) {
  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`;
  //     }
  //     return config;
  //   },
  //   function (error) {
  //     let parseError = JSON.stringify(error);
  //     let errorResponse = JSON.parse(parseError);
  //     return callbackErrorResponse(axiosError(errorResponse.code));
  //   },
  // );

  axiosInstance.interceptors.response.use(
    function (response) {
      if (response.status == 200 || response.status == 201) {
        return callbackResponse(response.data);
      } else if (response.status == 401) {
        return callbackErrorResponse(response.data);
      } else {
        return callbackErrorResponse(response.data);
      }
    },
    function (error) {
      let parseError = JSON.stringify(error.response.data);
      let errorResponse = JSON.parse(parseError)
      return callbackErrorResponse(errorResponse);
    },
  );
  switch (method) {
    case HTTPMethod.GET:
      await axiosInstance.get(url, params);
      break;
    case HTTPMethod.POST:
      await axiosInstance.post(url, params);
      break;
    case HTTPMethod.PUT:
      await axiosInstance.put(url, params);
      break;
    case HTTPMethod.DELETE:
      await axiosInstance.delete(url, params);
      break;
    default:
      break;
  }
}
