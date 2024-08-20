import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../colors';
import EnterpriseSignup from './EnterpriseSignup';
import EnterprisePlanning from './EnterprisePlaning';
import EnterpriseHome from './EnterpriseHome';
import EnterprisesSettins from './EnterpriseSettings/EnterprisesSettins';
import EnterpriseHistory from './EnterpriseHistory';
import Notifications from '../PickupDrop-off/Settings/Notifications';
import RNExitApp from 'react-native-exit-app';
import {requestNotificationPermission} from '../../utils/common';
import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';

const Bottom = createBottomTabNavigator();
const EnterpriseBottomNav = ({navigation}) => {
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
    var permission = true;
    if (Platform.Version >= 33) {
      permission = await requestNotificationPermission();
    }

    if (permission) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        updateProfile(fcmToken);
      }

      messaging().onMessage(async remoteMessage => {
        Alert.alert(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );
      });
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

  return (
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
        key="EnterpriseHome"
        name="Home"
        component={EnterpriseHome}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <AntDesign
              name="home"
              size={23}
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
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              size={23}
              color={focused ? '#FF0058' : '#B5B3B2'}
            />
          ),
        }}
      />

      <Bottom.Screen
        key="EnterprisePlanning"
        name="Planning"
        component={EnterprisePlanning}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="calendar-outline"
              size={20}
              color={focused ? '#FF0058' : '#B5B3B2'}
            />
          ),
        }}
      />

      <Bottom.Screen
        key="EnterpriseHistory"
        name="Orders"
        component={EnterpriseHistory}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="timer-outline"
              size={24}
              color={focused ? '#FF0058' : '#B5B3B2'}
            />
          ),
        }}
      />

      <Bottom.Screen
        key="EnterprisesSettins"
        name="Account"
        component={EnterprisesSettins}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{paddingLeft: 10}}>
              <MaterialIcons
                name="keyboard-backspace"
                size={30}
                color={colors.text}
              />
            </TouchableOpacity>
          ),
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
  );
};

export default EnterpriseBottomNav;
