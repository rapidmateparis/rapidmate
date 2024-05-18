import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../colors';
import HomeScreen from '../../bottom/HomeScreen';
import Pickup2 from '../../bottom/Pickup2';
import LogInScreen from '../register/LogInScreen';
import LoginSignup from '../register/LoginSignup';
import ForgotPassword from '../register/ForgotPassword';
import PickupSignup from './PickupSignup';
import PickupOrderPreview from './PickupOrderPreview';
import PickupAddress from './PickupAddress';
import LoaderForDriver from './LoaderForDriver';
import OrderConfirm from './OrderConfirmed';
import GoogleMapScreen from '../commonComponent/MapAddress';
import MapPickupAddress from './MapPickupAddress';
import Settings from './Settings/Settings';
import Notifications from './Settings/Notifications';
import PickupHome from './PickupHome';
import VehicleDimensionsModal from '../commonComponent/VehicleDimensions';
import OrderPickup from './OrderPickup';
import DeliveryBoySignup from '../DeliveryBoy/DeliveryBoySignup';


const Bottom = createBottomTabNavigator();
const PickupBottomNav = ({navigation}) => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen
        key="PickupHome"
        name="Home"
        component={PickupHome}
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
        key="Notifications"
        name="Chat"
        component={Notifications}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddPickupdetails')}
              style={{paddingLeft: 10}}>
              <MaterialIcons
                name="keyboard-backspace"
                size={30}
                color={colors.text}
              />
            </TouchableOpacity>
          ),
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
          tabBarIcon: tabInfo => {
            return (
              <Ionicons
                name="chatbox-ellipses-outline"
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
        key="PickupAddress"
        name="Requst"
        component={PickupAddress}
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
      />
      <Bottom.Screen
        key="LoaderForDriver"
        name="Orders"
        component={LoaderForDriver}
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
        key="Settings"
        name="Account"
        component={Settings}
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

export default PickupBottomNav;
