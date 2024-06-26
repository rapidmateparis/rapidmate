import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
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

const Bottom = createBottomTabNavigator();
const EnterpriseBottomNav = ({navigation}) => {
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
