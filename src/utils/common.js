import axios from 'axios';
import { DATE_FORMAT, apiHost } from './constant';
import { PermissionsAndroid } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';
import Sound from 'react-native-sound'
import ImageResizer from '@bam.tech/react-native-image-resizer';
import RNFS from 'react-native-fs';

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
  const yearRange = Array.from({ length: 101 }, (_, index) => startYear + index);
  let establishmentYearData = [];
  for (let i = 0; i < yearRange.length; i++) {
    let tmp = { label: yearRange[i], value: yearRange[i] };
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
    if (!permission) {
      const errorData = { status: 'error', message: 'Camera permission not granted' };
      return reject(errorData);
    }

    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 1500,
      maxWidth: 1500,
    };

    launchCamera(options, async response => {
      if (response.didCancel) {
        const errorData = { status: 'error', message: 'Camera capture canceled.' };
        return reject(errorData);
      }
      if (response.error || !response.assets || response.assets.length === 0) {
        const errorData = { status: 'error', message: 'Failed to capture image.' };
        return reject(errorData);
      }
      try {
        let image = response.assets[0];
        console.log(image.fileSize, 'Original photo size');
        console.log(image, 'Original photo size');
        const base64Data = await RNFS.readFile(image.uri, 'base64');
        if (image.fileSize <= 1000 * 1024) {
          const data = {
            status: "success",
            data: {
              base64: base64Data,
              fileName: image.fileName,
              fileSize: image.fileSize,
              height: image.height,
              originalPath: image.originalPath,
              type: "image/jpeg",
              uri: image.uri,
              width: image.width,
              status: 'success'
            }
          }
          return resolve(data);
        }

      } catch (error) {
        console.log("------------------Block 1-------------------------------------");
        console.log(error);
        const errorData = {
          status: "error",
          message: "Image compression failed."
        }
        return reject(errorData)
      }

      try {
        const compressedImage = await ImageResizer.createResizedImage(image.uri, 1000, 1000, 'JPEG', 80, 0)
        console.log(compressedImage.size, "Compressed Image size");
        console.log(compressedImage, "Compressed Image size");
        const base64Data = await RNFS.readFile(compressedImage.uri, 'base64');
        if (compressedImage.size <= 1000 * 1024) {
          const data = {
            status: "success",
            data: {
              base64: base64Data,
              fileName: compressedImage.name,
              fileSize: compressedImage.size,
              height: compressedImage.height,
              originalPath: compressedImage.path,
              type: "image/jpeg",
              uri: compressedImage.uri,
              width: compressedImage.width,
              status: 'success'
            }
          }
          console.log('Smaller')
          return resolve(data)
        } else {
          const errorData = {
            status: 'error',
            message: "Compressed file is still larger than 1MB"
          }

          return reject(errorData)
        }
      } catch (error) {
        console.log("---------------------Block 2----------------------------------");
        console.log(error);
        const errorData = {
          status: "error",
          message: "Image compression failed."
        }
        return reject(errorData)
      }
    })

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
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        const errorData = { status: 'error', message: 'Image selection canceled.' }
        return reject(errorData);
      }

      if (response.error || !response.assets || response.assets.length === 0) {
        const errorData = { status: 'error', message: 'Failed to select an image.' }
        return reject(errorData);
      }

      let image = response.assets[0];
      console.log(image.fileSize, 'Original photo size');
      try{
        if (image.fileSize <= 1000 * 1024) {
          const data = {
            status: 'success',
            data: image,
          }
          return resolve(data);
        }
      }catch (error) {
        console.log("--------------------Block 3-----------------------------------");
        console.log(error);
        const errorData = {
          status: "error",
          message: "Image compression failed."
        }
        return reject(errorData)
      }
      

      try {

        const compressedImage = await ImageResizer.createResizedImage(image.uri, 1000, 1000, 'JPEG', 80, 0)
        console.log(compressedImage.size, "Compressed Image size");
        console.log(compressedImage, "Compressed Image size");
        const base64Data = await RNFS.readFile(compressedImage.uri, 'base64');
        if (compressedImage.size <= 1000 * 1024) {
          const data = {
            status: "success",
            data: {
              base64: base64Data,
              fileName: compressedImage.name,
              fileSize: compressedImage.size,
              height: compressedImage.height,
              originalPath: compressedImage.path,
              type: "image/jpeg",
              uri: compressedImage.uri,
              width: compressedImage.width,
              status: 'success'
            }
          }
          console.log('Smaller')
          return resolve(data)
        } else {
          const errorData = {
            status: 'error',
            message: "Compressed file is still larger than 1MB"
          }
          console.log('git problem')
          return reject(errorData)
        }
      } catch (error) {
        console.log("--------------------Block 4-----------------------------------");
        console.log(error);
        const errorData = {
          status: "error",
          message: "Image compression failed."
        }
        return reject(errorData)
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



export const localToUTC = (date = new Date(), timezone, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment.tz(date, timezone || Intl.DateTimeFormat().resolvedOptions().timeZone).utc().format(format)
}

export const utcLocal = (date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment.utc(date).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format(format);
}

export const titleFormat = (date = new Date()) => {
  return moment.utc(date).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format(DATE_FORMAT.titleFormat);
}


export const localizationText = (parentKey, childKey) => {
  const { t } = useTranslation()
  if (parentKey && childKey)
    return t(`${parentKey}.${childKey}`)
  else
    return t(`${parentKey}`)
}



let soundInstance;

export const playNotificationSound = () => {
  soundInstance = new Sound('samplenotification.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }

    console.log('duration in seconds: ' + soundInstance.getDuration() + 'number of channels: ' + soundInstance.getNumberOfChannels());
    soundInstance.setNumberOfLoops(-1)
    soundInstance.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });


  });
}

export const stopNotificationSound = () => {
  if (soundInstance) {
    soundInstance.stop(() => {
      console.log('Sound stopped');
      soundInstance.release(); // Release the resource
    });
  }
};
