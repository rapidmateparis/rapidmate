import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../colors';
import PickupAddress from './PickupAddress';
import Settings from './Settings/Settings';
import Notifications from './Settings/Notifications';
import PickupHome from './PickupHome';
import History from './History';
import RNExitApp from 'react-native-exit-app';
import {requestNotificationPermission} from '../../utils/common';
import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';
import {getViewOrderDetail, updateUserProfile} from '../../data_manager';
import {useUserDetails} from '../commonComponent/StoreContext';

const Bottom = createBottomTabNavigator();
const PickupBottomNav = ({navigation}) => {
  const {saveUserDetails, userDetails} = useUserDetails();

  useEffect(() => {
    const onBackPress = () => {
      Alert.alert(
        'Exit App',
        'Do you want to exit?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              // Do nothing
            },
            style: 'cancel',
          },
          {text: 'YES', onPress: () => RNExitApp.exitApp()},
        ],
        {cancelable: false},
      );

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(async () => {
    messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage', JSON.stringify(remoteMessage));
      getViewOrderDetail(
        remoteMessage.data?.orderNumber,
        successResponse => {
          if (successResponse[0]._success) {
            // setDeliveryBoyAcceptRejectMessage(successResponse[0]._response);
          }
        },
        errorResponse => {
          console.log('orderDetail==>errorResponse', errorResponse[0]);
          Alert.alert('Error Alert', errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background Msg!!!!', JSON.stringify(remoteMessage));
      navigation.navigate('Notifications', {
        params: JSON.stringify(remoteMessage),
      });
    });
  }, []);

  useEffect(async () => {
    var permission = true;
    if (Platform.Version >= 33) {
      permission = await requestNotificationPermission();
    }

    if (permission) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        updateProfile(fcmToken);
      }
    }
    onSignIn();
  }, []);

  async function onSignIn() {
    crashlytics().log('User signed in.');
    await Promise.all([
      crashlytics().setUserId(userDetails.userDetails[0].ext_id.toString()),
      crashlytics().setAttributes({
        role: userDetails.userDetails[0].role,
        email: userDetails.userDetails[0].email,
        extId: userDetails.userDetails[0].ext_id,
      }),
    ]);
  }

  const updateProfile = token => {
    let profileParams = {
      ext_id: userDetails.userDetails[0].ext_id,
      token: token,
    };
    updateUserProfile(
      userDetails.userDetails[0].role,
      profileParams,
      successResponse => {
        console.log('updateUserProfile', '' + successResponse);
      },
      errorResponse => {
        console.log('updateUserProfile', '' + errorResponse);
      },
    );
  };

  return (
    <>
      <Bottom.Navigator
        tabBarOptions={{
          activeTintColor: '#FF0058',
          inactiveTintColor: '#A1A1A1',
          labelStyle: {
            fontSize: 12,
            fontFamily: 'Montserrat-Regular',
          },
        }}>
        <Bottom.Screen
          key="PickupHome"
          name="Home"
          component={PickupHome}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <AntDesign
                name="home"
                size={22}
                color={focused ? '#FF0058' : '#B5B3B2'}
              />
            ),
          }}
        />
        <Bottom.Screen
          key="Notifications"
          name="Chat"
          component={Notifications}
          options={{
            headerTitle: 'Notifications',
            headerTitleStyle: {
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
            },
            headerTintColor: colors.text,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FBFAF5',
              borderBottomWidth: 0,
              elevation: 0,
            },
            tabBarIcon: ({focused}) => (
              <Ionicons
                name="chatbox-ellipses-outline"
                size={22}
                color={focused ? '#FF0058' : '#B5B3B2'}
              />
            ),
          }}
        />
        <Bottom.Screen
          key="PickupAddress"
          name="Requsts"
          component={PickupAddress}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Feather
                name="package"
                size={22}
                color={focused ? '#FF0058' : '#B5B3B2'}
              />
            ),
          }}
        />
        <Bottom.Screen
          key="History"
          name="Orders"
          component={History}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Ionicons
                name="timer-outline"
                size={22}
                color={focused ? '#FF0058' : '#B5B3B2'}
              />
            ),
          }}
        />
        <Bottom.Screen
          key="Settings"
          name="Account"
          component={Settings}
          options={{
            headerTitle: 'Settings',
            headerTitleStyle: {
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
            },
            headerTintColor: colors.text,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FBFAF5',
              borderBottomWidth: 0,
              elevation: 0,
            },
            tabBarIcon: ({focused}) => (
              <AntDesign
                name="user"
                size={20}
                color={focused ? '#FF0058' : '#B5B3B2'}
              />
            ),
          }}
        />
      </Bottom.Navigator>
    </>
  );
};

export default PickupBottomNav;
