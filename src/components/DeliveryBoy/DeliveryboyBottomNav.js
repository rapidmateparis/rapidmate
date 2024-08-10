import {
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../colors';
import DeliveryboyHome from './DeliveryboyHome';
import Planning from './Planning';
import DeliveryboyHistory from './DeliverboyHistory';
import DeliveryboySettings from './DeliverySettings/DeliveryboySettings';
import Notifications from '../PickupDrop-off/Settings/Notifications';
import RNExitApp from 'react-native-exit-app';

const Bottom = createBottomTabNavigator();

const DeliveryboyBottomNav = ({navigation}) => {
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
        key="DeliveryboyHome"
        name="Home"
        component={DeliveryboyHome}
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
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              size={25}
              color={focused ? '#FF0058' : '#B5B3B2'}
            />
          ),
        }}
      />
      <Bottom.Screen
        key="Planning"
        name="Planning"
        component={Planning}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="calendar-outline"
              size={22}
              color={focused ? '#FF0058' : '#B5B3B2'}
            />
          ),
        }}
      />
      <Bottom.Screen
        key="DeliveryboyHistory"
        name="Orders"
        component={DeliveryboyHistory}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="timer-outline"
              size={25}
              color={focused ? '#FF0058' : '#B5B3B2'}
            />
          ),
        }}
      />
      <Bottom.Screen
        key="DeliveryboySettings"
        name="Account"
        component={DeliveryboySettings}
        options={{
          headerTitle: 'Account',
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
              size={25}
              color={focused ? '#FF0058' : '#B5B3B2'}
            />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

export default DeliveryboyBottomNav;
