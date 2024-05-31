import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from './colors';
import LoginSignup from './components/register/LoginSignup';
import LogInScreen from './components/register/LogInScreen';
import ResetPassword from './components/register/ResetPassword';
import ForgotPassword from './components/register/ForgotPassword';
import PasswordRecovery from './components/register/PasswordRecovery';
import Main from './drawer/Main';
import DrawerNavigator from './drawer/DrawerNavigator';
import ProfileChoose from './components/register/ProfileChoose';
import PickupBottomNav from './components/PickupDrop-off/PickupBottomNav';
import AddPickupdetails from './components/PickupDrop-off/AddPickupDetails';
import PickupOrderPreview from './components/PickupDrop-off/PickupOrderPreview';
import PickupSignup from './components/PickupDrop-off/PickupSignup';
import PickupPayment from './components/PickupDrop-off/PickupPayment';
import PickupAddress from './components/PickupDrop-off/PickupAddress';
import LoaderForDriver from './components/PickupDrop-off/LoaderForDriver';
import OrderConfirm from './components/PickupDrop-off/OrderConfirmed';
import MapDropAddress from './components/PickupDrop-off/MapDropAddress';
import MapPickupAddress from './components/PickupDrop-off/MapPickupAddress';
import NotificationSetting from './components/PickupDrop-off/Settings/NotificationSetting';
import Notifications from './components/PickupDrop-off/Settings/Notifications';
import Wallet from './components/PickupDrop-off/Settings/Wallet';
import DeliveryDetails from './components/PickupDrop-off/DeliveryDetails';
import History from './components/PickupDrop-off/History';
import PickupHome from './components/PickupDrop-off/PickupHome';
import AddressBook from './components/PickupDrop-off/Settings/AddressBook';
import DeliveryBoySignup from './components/DeliveryBoy/DeliveryBoySignup';
import AddVehicle from './components/DeliveryBoy/AddVehicle';
import DeliveryboyBottomNav from './components/DeliveryBoy/DeliveryboyBottomNav';
import DeliveryboyDeliveryDetails from './components/DeliveryBoy/DeliveryboyDeliveryDetails';
import DeliveryboyMainDeliveryDetails from './components/DeliveryBoy/DeliveryboyMainDeliveryDetails';
import DeliveryScheduleDetails from './components/DeliveryBoy/DeliveryScheduleDetails';
import DeliveryPreferance from './components/DeliveryBoy/DeliverySettings/DeliveryPreferance';
import DeliveryboyWallet from './components/DeliveryBoy/DeliverySettings/DeliveryboyWallet';
import DeliveryboyTransactions from './components/DeliveryBoy/DeliverySettings/DeliveryboyTransactions';
import ChooseDeliveryType from './components/DeliveryBoy/ChooseDeliveryType';
import DeliveryboyThanksPage from './components/DeliveryBoy/DeliveryboyThanksPage';
import AddPickupVehicle from './components/DeliveryBoy/AddPickupVehicle';
import AddNewAddressModal from './components/commonComponent/AddNewAddressModal';
import PickupChangePassword from './components/PickupDrop-off/Settings/PickupChangePassword';
import AboutUs from './components/CommonSettings/AboutUs';
import FAQs from './components/CommonSettings/FAQs';
import PickupOrderCancelled from './components/PickupDrop-off/PickupOrderCancelled';
import PickupDeliveryCompleted from './components/PickupDrop-off/PickupDeliveryCompleted';
import PickupFeedbackThanks from './components/PickupDrop-off/PickupFeedbackThanks';
import DeliveryboySetAvailability from './components/DeliveryBoy/DeliveryboySetAvailability';
import DeliveryboyScheduledDeliveryAlert from './components/DeliveryBoy/DeliveryboyScheduledDeliveryAlert';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    console.log('demosdfh___');
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="DeliveryboyBottomNav"
            component={DeliveryboyBottomNav}
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
            name="Notifications"
            component={Notifications}
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
              headerTitle: 'Notifications',
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
            name="PickupHome"
            component={PickupHome}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="AddressBook"
            component={AddressBook}
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
              headerTitle: 'Address book',
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
                <View style={{marginTop: 15}}>
                  <TouchableOpacity
                    onPress={toggleModal}
                    style={{paddingRight: 10}}>
                    <AntDesign name="plus" size={25} color={colors.text} />
                  </TouchableOpacity>
                  <AddNewAddressModal
                    isModalVisible={isModalVisible}
                    setModalVisible={setModalVisible}
                  />
                </View>
              ),
            })}
          />

          <Stack.Screen
            name="PickupChangePassword"
            component={PickupChangePassword}
            options={({navigation}) => ({
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
              headerTitle: 'Change password',
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
            name="AddPickupVehicle"
            component={AddPickupVehicle}
            options={({navigation}) => ({
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
              headerTitle: 'Add Pickup',
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
            name="PickupOrderCancelled"
            component={PickupOrderCancelled}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="PickupDeliveryCompleted"
            component={PickupDeliveryCompleted}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PickupFeedbackThanks"
            component={PickupFeedbackThanks}
            options={{headerShown: false}}
          />

          {/* DeliveryBoy Start here  */}

          <Stack.Screen
            name="DeliveryBoySignup"
            component={DeliveryBoySignup}
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
            name="AddVehicle"
            component={AddVehicle}
            options={({navigation}) => ({
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
              headerTitle: 'Add Vehicle',
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
            name="DeliveryboyDeliveryDetails"
            component={DeliveryboyDeliveryDetails}
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
            name="DeliveryboyMainDeliveryDetails"
            component={DeliveryboyMainDeliveryDetails}
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
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={{paddingRight: 10}}>
                    <Ionicons
                      name="settings-outline"
                      size={25}
                      color={colors.text}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{paddingRight: 10}}>
                    <Feather name="download" size={25} color={colors.text} />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="DeliveryScheduleDetails"
            component={DeliveryScheduleDetails}
            options={({navigation}) => ({
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
              headerTitle: 'Schedule Details',
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
            name="DeliveryPreferance"
            component={DeliveryPreferance}
            options={({navigation}) => ({
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
              headerTitle: 'Delivery preferance',
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
            name="DeliveryboyWallet"
            component={DeliveryboyWallet}
            options={({navigation}) => ({
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
            name="DeliveryboyTransactions"
            component={DeliveryboyTransactions}
            options={({navigation}) => ({
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
              headerTitle: 'Transactions',
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
            name="ChooseDeliveryType"
            component={ChooseDeliveryType}
            options={({navigation}) => ({
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
            name="DeliveryboyThanksPage"
            component={DeliveryboyThanksPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DeliveryboySetAvailability"
            component={DeliveryboySetAvailability}
            options={({navigation}) => ({
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
              headerTitle: 'Set availability',
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
            name="DeliveryboyScheduledDeliveryAlert"
            component={DeliveryboyScheduledDeliveryAlert}
            options={{headerShown: false}}
          />

          {/* Common Pages  */}

          <Stack.Screen
            name="AboutUs"
            component={AboutUs}
            options={({navigation}) => ({
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
              headerTitle: 'About us',
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
            name="FAQs"
            component={FAQs}
            options={({navigation}) => ({
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
              headerTitle: 'FAQs',
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;
