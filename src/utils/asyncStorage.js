import AsyncStorage from '@react-native-async-storage/async-storage';

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