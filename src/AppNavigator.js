import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from './colors';
import LoginSignup from './components/register/LoginSignup';
import LogInScreen from './components/register/LogInScreen';
import ResetPassword from './components/register/ResetPassword';
import ForgotPassword from './components/register/ForgotPassword';
import PasswordRecovery from './components/register/PasswordRecovery';
import Main from './drawer/Main';
import DrawerNavigator from './drawer/DrawerNavigator';
import ProfileChoose from './components/register/ProfileChoose';
import PickupBottomNav from './components/Pickup & drop-off/PickupBottomNav';
import AddPickupdetails from './components/Pickup & drop-off/AddPickupDetails';
import PickupOrderPreview from './components/Pickup & drop-off/PickupOrderPreview';
import PickupSignup from './components/Pickup & drop-off/PickupSignup';
import PickupPayment from './components/Pickup & drop-off/PickupPayment';
import PickupAddress from './components/Pickup & drop-off/PickupAddress';
import LoaderForDriver from './components/Pickup & drop-off/LoaderForDriver';
import OrderConfirm from './components/Pickup & drop-off/OrderConfirmed';
import MapDropAddress from './components/Pickup & drop-off/MapDropAddress';
import MapPickupAddress from './components/Pickup & drop-off/MapPickupAddress';
import NotificationSetting from './components/Pickup & drop-off/Settings/NotificationSetting';
import Wallet from './components/Pickup & drop-off/Settings/Wallet';
import DeliveryDetails from './components/Pickup & drop-off/DeliveryDetails';
import History from './components/Pickup & drop-off/History';
import Home from './components/Pickup & drop-off/Home';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PickupBottomNav"
          component={PickupBottomNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginSignup"
          component={LoginSignup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LogInScreen"
          component={LogInScreen}
          options={({navigation}) => ({
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
            headerTitle: '',
            headerStyle: {
              borderBottomWidth: 0,
              elevation: 0,
            },
          })}
        />
        <Stack.Screen
          name="ProfileChoose"
          component={ProfileChoose}
          options={({navigation}) => ({
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
            headerTitle: '',
            headerStyle: {
              borderBottomWidth: 0,
              elevation: 0,
            },
          })}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={({navigation}) => ({
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
            headerTitle: '',
            headerStyle: {
              borderBottomWidth: 0,
              elevation: 0,
            },
          })}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={({navigation}) => ({
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
            headerTitle: '',
            headerStyle: {
              borderBottomWidth: 0,
              elevation: 0,
            },
          })}
        />
        <Stack.Screen
          name="PasswordRecovery"
          component={PasswordRecovery}
          options={({navigation}) => ({
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
            headerTitle: '',
            headerStyle: {
              borderBottomWidth: 0,
              elevation: 0,
            },
          })}
        />

        <Stack.Screen
          name="MainScreen"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />

        {/* Pickup & drop off  */}

        <Stack.Screen
          name="PickupSignup"
          component={PickupSignup}
          options={({navigation}) => ({
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
            headerTitle: '',
            headerTitleStyle: {
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
            },
            headerTintColor: colors.text,
            headerTitleAlign: 'center',
            headerStyle: {
              borderBottomWidth: 0,
              elevation: 0,
            },
          })}
        />

        <Stack.Screen
          name="AddPickupdetails"
          component={AddPickupdetails}
          options={({navigation}) => ({
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
            headerTitle: 'Add pickup details',
            headerTitleStyle: {
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
            },
            headerTintColor: colors.text,
            headerTitleAlign: 'center',
            headerStyle: {
              borderBottomWidth: 0,
              elevation: 0,
            },
          })}
        />

        <Stack.Screen
          name="PickupOrderPreview"
          component={PickupOrderPreview}
          options={({navigation}) => ({
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
            headerTitle: 'Order preview',
            headerTitleStyle: {
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
            },
            headerTintColor: colors.text,
            headerTitleAlign: 'center',
            headerStyle: {
              borderBottomWidth: 0,
              elevation: 0,
            },
          })}
        />

        <Stack.Screen
          name="PickupPayment"
          component={PickupPayment}
          options={({navigation}) => ({
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
            headerTitle: 'Payment',
            headerTitleStyle: {
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
            },
            headerTintColor: colors.text,
            headerTitleAlign: 'center',
            headerStyle: {
              borderBottomWidth: 0,
              elevation: 0,
            },
          })}
        />
        <Stack.Screen
          name="PickupAddress"
          component={PickupAddress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoaderForDriver"
          component={LoaderForDriver}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrderConfirm"
          component={OrderConfirm}
          options={({navigation}) => ({
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
            headerTitle: 'Order Confirmed',
            headerTitleStyle: {
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
            },
            headerTintColor: colors.text,
            headerTitleAlign: 'center',
            headerStyle: {
              borderBottomWidth: 0,
              elevation: 0,
            },
          })}
        />
        <Stack.Screen
          name="MapDropAddress"
          component={MapDropAddress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MapPickupAddress"
          component={MapPickupAddress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NotificationSetting"
          component={NotificationSetting}
          options={({navigation}) => ({
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
            headerTitle: 'Notification settings',
            headerTitleStyle: {
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
            },
            headerTintColor: colors.text,
            headerTitleAlign: 'center',
            headerStyle: {
              borderBottomWidth: 0,
              elevation: 0,
            },
          })}
        />
        <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={({navigation}) => ({
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
            headerTitle: 'Wallet',
            headerTitleStyle: {
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
            },
            headerTintColor: colors.text,
            headerTitleAlign: 'center',
            headerStyle: {
              borderBottomWidth: 0,
              elevation: 0,
            },
          })}
        />
        <Stack.Screen
          name="DeliveryDetails"
          component={DeliveryDetails}
          options={({navigation}) => ({
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
            headerTitle: 'Delivery Details',
            headerTitleStyle: {
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
            },
            headerTintColor: colors.text,
            headerTitleAlign: 'center',
            headerStyle: {
              borderBottomWidth: 0,
              elevation: 0,
            },
            headerRight: () => (
              <TouchableOpacity style={{paddingRight: 10}}>
                <Ionicons
                  name="settings-outline"
                  size={25}
                  color={colors.text}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
