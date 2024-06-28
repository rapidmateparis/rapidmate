import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../colors';
import DeliveryboyHome from './DeliveryboyHome';
import Planning from './Planning';
import DeliveryboyHistory from './DeliverboyHistory';
import DeliveryPackageRequest from './DeliveryPackageRequest';
import DeliveryboySettings from './DeliverySettings/DeliveryboySettings';
import Notifications from '../PickupDrop-off/Settings/Notifications';

const Bottom = createBottomTabNavigator();

const DeliveryboyBottomNav = ({navigation}) => {
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
          headerLeft: () => (
            <TouchableOpacity
            onPress={() => navigation.goBack()}
              style={{paddingLeft: 10}}>
              <MaterialIcons
                name="keyboard-backspace"
                size={25}
                color={colors.text}
              />
            </TouchableOpacity>
          ),
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
