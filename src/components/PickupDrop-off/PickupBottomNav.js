import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
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

const Bottom = createBottomTabNavigator();
const PickupBottomNav = ({navigation}) => {
  
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
        name="Requst"
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

export default PickupBottomNav;
