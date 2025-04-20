import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAppVersion } from '../data_manager';

const VERSION_KEY = 'APP_VERSION';

export const getStorageValue = async(key) => {
    const data = await AsyncStorage.getItem(key);
    let tempData = null;
    if(data) {
        tempData = JSON.parse(data);
    }
    return tempData;
}

export const mergeStorageValue = async(key, value) => {
    await AsyncStorage.mergeItem(key, value);
}

export const setStorageValue = async(key, value) => {
    await AsyncStorage.setItem(key, value);
}

export const removeStorageValue = async(key) => {
    await AsyncStorage.removeItem(key);
}

export const getCachedAppVersion = async () => {
  try {
    const cachedVersion = await getStorageValue(VERSION_KEY);
    if (cachedVersion) {
      return cachedVersion;
    } else {
      return new Promise((resolve, reject) => {
        getAppVersion(
          async (response) => {
            const version = response?.data?.version || response[0]?._response?.version;
            if (version) {
              await setStorageValue(VERSION_KEY, JSON.stringify(version));
              resolve(version);
            } else {
              resolve('Version not available');
            }
          },
          (error) => {
            console.error('Error fetching app version:', error);
            resolve('Failed to load version');
          }
        );
      });
    }
  } catch (e) {
    console.error('Error with version caching:', e);
    return 'Error loading version';
  }
};
