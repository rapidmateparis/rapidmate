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

const Bottom = createBottomTabNavigator();
const EnterpriseBottomNav = ({navigation}) => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen
        key="EnterpriseHome"
        name="Home"
        component={EnterpriseHome}
        options={{
          headerShown: false,
          tabBarIcon: tabInfo => {
            return (
              <AntDesign
                name="home"
                size={22}
                color="#B5B3B2"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: tabInfo.focused ? 'purple' : 'black',
                }}
              />
            );
          },
        }}
      />
      <Bottom.Screen
        key="EnterprisePlanning"
        name="Planning"
        component={EnterprisePlanning}
        options={{
          headerShown: false,
          tabBarIcon: tabInfo => {
            return (
              <Ionicons
                name="calendar-outline"
                size={25}
                color="#B5B3B2"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: tabInfo.focused ? 'purple' : 'black',
                }}
              />
            );
          },
        }}
      />
      {/* <Bottom.Screen
        key=""
        name=""
        component={''}
        options={{
          headerShown: false,
          tabBarIcon: tabInfo => {
            return (
              <Feather
                name="package"
                size={25}
                color="#B5B3B2"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: tabInfo.focused ? 'purple' : 'black',
                }}
              />
            );
          },
        }}
      /> */}
      <Bottom.Screen
        key="EnterpriseHistory"
        name="Orders"
        component={EnterpriseHistory}
        options={{
          headerShown: false,
          tabBarIcon: tabInfo => {
            return (
              <Ionicons
                name="timer-outline"
                size={25}
                color="#B5B3B2"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: tabInfo.focused ? 'purple' : 'black',
                }}
              />
            );
          },
        }}
      />
      <Bottom.Screen
        key="EnterprisesSettins"
        name="Account"
        component={EnterprisesSettins}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
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
          tabBarIcon: tabInfo => {
            return (
              <AntDesign
                name="user"
                size={25}
                color="#B5B3B2"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: tabInfo.focused ? 'purple' : 'black',
                }}
              />
            );
          },
        }}
      />
    </Bottom.Navigator>
  );
};

export default EnterpriseBottomNav;
