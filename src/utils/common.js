import axios from 'axios';
import {apiHost} from './constant';
import {PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const formatDate = date => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-');
};

export const formatDateTime = date => {
  let tempTime = date && date.split('T');
  // console.log(" date ", tempTime[1].split(".")[0]);
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  // let tempDate = new Date(date)
  // console.log(" d ====== ", date.split(" "));
  // console.log(" d ====== ", d);

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-') + ' ' + tempTime[1].split('.')[0];
};

export const getData = async (url, data) => {
  console.log(' url called ===== ', apiHost.baseURL + url);

  return await axios
    .request({
      method: 'get',
      baseURL: apiHost.baseURL,
      url: apiHost.baseURL + url,
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log(' response ');
      // return response;
      let tempData = response.data;
      tempData.statusCode = response.status;
      return tempData;
    })
    .catch(error => {
      console.log(' Error occurred: ', error);
      return error;
    });
  // console.log(" response ", response);
  // return response.data;
};

export const postData = async (url, data) => {
  // console.log(" data123===== ", data);
  console.log('url-----------', apiHost.baseURL + url);
  return await axios
    .request({
      method: 'post',
      url: apiHost.baseURL + url,
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      // console.log(" response -------- ", response);
      let tempData = response.data;
      tempData.statusCode = response.status;
      return tempData;
    })
    .catch(error => {
      let tempData = {};
      if (error.response) {
        if (error.response.status == 422) {
          tempData.statusCode = error.response.status;
          tempData.errors = error.response.data.errors;
        } else {
          if (error.response?.data) {
            tempData.data = error.response?.data;
          }
        }
        tempData.statusCode = error.response.status;
      } else if (error.request) {
        tempData.statusCode = 408;
        tempData.message = 'Server Timeout';
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        tempData.statusCode = 400;
        tempData.message = 'Error setting up the request';
        // Something happened in setting up the request
        console.error('Error setting up the request:', error.message);
      }
      return tempData;
    });
  // console.log(" response ", response);
};

export const validateMobileNumber = value => {
  if (!value) {
    return 'Please enter mobile number';
  }
  const isValidMobile = /^\d{10}$/.test(value);
  return isValidMobile || 'Please enter a valid 10-digit mobile number';
};

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
    return granted;
  } catch (err) {
    console.warn(err);
  }
};

export const requestNotificationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
      {
        title: 'Notification Permission',
        message:
          'App needs to send you notification',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission granted');
    } else {
      console.log('Notification permission denied');
    }
    return granted;
  } catch (err) {
    console.warn(err);
  }
};

export const getEstablishmentYear = () => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100;
  const yearRange = Array.from({length: 101}, (_, index) => startYear + index);
  let establishmentYearData = [];
  for (let i = 0; i < yearRange.length; i++) {
    let tmp = {label: yearRange[i], value: yearRange[i]};
    establishmentYearData.push({
      label: `${yearRange[i]}`,
      value: `${yearRange[i]}`,
    });
  }
  return establishmentYearData;
};

export const handleCameraLaunchFunction = async () => {
  return new Promise(async (resolve, reject) => {
    let permission = await requestCameraPermission();
    if (permission) {
      const options = {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 1500,
        maxWidth: 1500,
      };
      launchCamera(options, response => {
        if (!response.didCancel && !response.error) {
          const data = {
            status: 'success',
            data: response.assets[0],
          };
          resolve(data);
        } else {
          const errorData = {
            status: 'error',
          };
          reject(errorData);
        }
      });
    } else {
      const errorData = {
        status: 'error',
        message: 'Camera permission not granted',
      };
      reject(errorData);
    }
  });
};

export const handleImageLibraryLaunchFunction = () => {
  return new Promise(async (resolve, reject) => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 1500,
      maxWidth: 1500,
    };
    launchImageLibrary(options, response => {
      if (!response.didCancel && !response.error) {
        const data = {
          status: 'success',
          data: response.assets[0],
        };
        resolve(data);
      } else {
        const errorData = {
          status: 'error',
        };
        reject(errorData);
      }
    });
  });
};

// export const handleMultipleImageLibraryLaunchFunction = () => {
//   return new Promise(async (resolve, reject) => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: true,
//       maxHeight: 1500,
//       maxWidth: 1500,
//       selectionLimit: 0, // Set this to 0 to allow multiple image selection
//     };

//     launchImageLibrary(options, response => {
//       if (!response.didCancel && !response.error) {
//         const data = {
//           status: 'success',
//           data: response.assets, // Now response.assets is an array of selected images
//         };
//         resolve(data);
//       } else {
//         const errorData = {
//           status: 'error',
//         };
//         reject(errorData);
//       }
//     });
//   });
// };

// export const handleCameraLaunchFunctionMulti = async () => {
//   return new Promise(async (resolve, reject) => {
//     const capturedImages = [];

//     const captureImage = async () => {
//       let permission = await requestCameraPermission();
//       if (permission) {
//         const options = {
//           mediaType: 'photo',
//           includeBase64: true,
//           maxHeight: 1500,
//           maxWidth: 1500,
//         };

//         launchCamera(options, response => {
//           if (!response.didCancel && !response.error) {
//             const data = {
//               status: 'success',
//               data: response.assets[0],
//             };
//             capturedImages.push(data);

//             // Ask the user if they want to capture another image
//             if (window.confirm('Capture another image?')) {
//               captureImage(); // Recursively capture another image
//             } else {
//               // User finished capturing images
//               resolve(capturedImages);
//             }
//           } else {
//             const errorData = {
//               status: 'error',
//             };
//             reject(errorData);
//           }
//         });
//       } else {
//         const errorData = {
//           status: 'error',
//           message: 'Camera permission not granted',
//         };
//         reject(errorData);
//       }
//     };

//     // Start capturing the first image
//     captureImage();
//   });
// };

// https://www.youtube.com/watch?v=8opgD2Ooi9w
