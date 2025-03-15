import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
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
import NewDeliveryPackageRequest from './components/DeliveryBoy/NewDeliveryPackageRequest';
import DeliveryDetailsMultipleOrder from './components/DeliveryBoy/DeliveryDetailsMultipleOrder';
import DeliveryDetailsMultipleInvoice from './components/DeliveryBoy/DeliveryDetailsMultipleInvoice';
import DeliveryboyShiftDetails from './components/DeliveryBoy/DeliveryboyShiftDetails';
import DeliveryboyShiftStarted from './components/DeliveryBoy/DeliveryboyShiftStarted';
import DeliveryboyShiftStaredRequest from './components/DeliveryBoy/DeliveryboyShiftStaredRequest';
import DeliveryboyTakeSelfie from './components/DeliveryBoy/DeliverySettings/DeliveryboyTakeSelfie';
import EnterpriseSignup from './components/Enterprise/EnterpriseSignup';
import EnterpriseBottomNav from './components/Enterprise/EnterpriseBottomNav';
import EnterpriseThanksPage from './components/Enterprise/EnterpriseThanksPage';
import EnterpriseHome from './components/Enterprise/EnterpriseHome';
import EnterpriseCompanyLocations from './components/Enterprise/EnterpriseCompanyLocations';
import EnterpriseScheduleNewDelivery from './components/Enterprise/EnterpriseScheduleNewDelivery';
import EnterpriesSelectCompanyLocation from './components/Enterprise/EnterpriesSelectCompanyLocation';
import EnterpiseSelectDeliveryTypes from './components/Enterprise/EnterpiseSelectDeliveryTypes';
import EnterpiseScheduleNewDetailsFill from './components/Enterprise/EnterpiseScheduleNewDetailsFill';
import OrderPickup from './components/PickupDrop-off/OrderPickup';
import DeliveryPackageRequest from './components/DeliveryBoy/DeliveryPackageRequest';
import DeliveryPackageScheduleRequest from './components/DeliveryBoy/DeliveryPackageScheduleRequest';
import EnterpriseScheduleApproved from './components/Enterprise/EnterpriseScheduleApproved';
import EnterprisesMultiScheduleDetails from './components/Enterprise/EnterprisesMultiScheduleDetails';
import EnterpiseSelectShiftDelivery from './components/Enterprise/EnterpiseSelectShiftDelivery';
import EnterpriseShiftDeliverySchedule from './components/Enterprise/EnterpriseShiftDeliverySchedule';
import EnterpriseSchedulePreview from './components/Enterprise/EnterpriseSchedulePreview';
import EnterpriseScheduleRequestSubmitted from './components/Enterprise/EnterpriseScheduleRequestSubmitted';
import EnterpriseDeliveryboyAssigned from './components/Enterprise/EnterpriseDeliveryboyAssigned';
import EnterpriseDeliveryboyReady from './components/Enterprise/EnterpriseDeliveryboyReady';
import EnterprisesActiveDeliveries from './components/Enterprise/EnterprisesActiveDeliveries';
import EnterprisesSettins from './components/Enterprise/EnterpriseSettings/EnterprisesSettins';
import EnterpriseLocation from './components/Enterprise/EnterpriseSettings/EnterpriseLocation';
import EnterpriseAddNewLocation from './components/Enterprise/EnterpriseSettings/EnterpriseAddNewLocation';
import EnterpriseSetLocationAddressMap from './components/commonComponent/EnterpriseSetLocationAddressMap';
import EnterpriseManageAds from './components/Enterprise/EnterpriseManageAds';
import EnterpriseListNewAd from './components/Enterprise/EnterpriseListNewAd';
import EnterpriseShiftDetails from './components/Enterprise/EnterpriseShiftDetails';
import EnterprisesTakeSelfie from './components/Enterprise/EnterprisesTakeSelfie';
import PickupTakeSelfie from './components/PickupDrop-off/PickupTakeSelfie';
import AddPaymentMethod from './components/CommonSettings/AddPaymentMethod';
import TrackDelivery from './components/DeliveryBoy/TrackDelivery';
import TrackDeiver from './components/PickupDrop-off/TrackDeiver';
import EnterpriseMapPickupAddress from './components/Enterprise/EnterpriseMapPickupAddress';
import EnterpriseMapDropAddress from './components/Enterprise/EnterpriseMapDropAddress';
import EnterprisePickupOrderPriview from './components/Enterprise/EnterprisePickupOrderPriview';
import EnterpriseOrderPayment from './components/Enterprise/EnterpriseOrderPayment';
import EnterpriseLookingForDriver from './components/Enterprise/EnterpriseLookingForDriver';
import EnterpriseOrderCancelled from './components/Enterprise/EnterpriseOrderCancelled';
import EnterpriseOrderPickup from './components/Enterprise/EnterpriseOrderPickup';
import EnterpriseOrderDelivering from './components/Enterprise/EnterpriseOrderDelivering';
import EnterpriseTrackDeiver from './components/Enterprise/EnterpriseTrackDeiver';
import EnterpriseDeliveryCompleted from './components/Enterprise/EnterpriseDeliveryCompleted';
import EnterpriseFeedbackThanksPage from './components/Enterprise/EnterpriseFeedbackThanksPage';
import SignUpVerify from './components/register/SignUpVerify';
import {LoaderProvider} from './utils/loaderContext';
import Loader from './common/Loader';
import PaymentSuccess from './components/PickupDrop-off/PaymentSuccess';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUserDetails} from './components/commonComponent/StoreContext';
import messaging from '@react-native-firebase/messaging';
import DriverNotAvailable from './components/PickupDrop-off/DriverNotAvailable';
import Supports from './components/DeliveryBoy/DeliverySettings/Supports';
import DeliveryboyHistory from './components/DeliveryBoy/DeliverboyHistory';
import PickupBillingDetails from './components/PickupDrop-off/Settings/PickupBillingDetails';
import ConsumerManageProfile from './components/PickupDrop-off/Settings/ConsumerManageProfile';
import EnterpriseManageProfile from './components/Enterprise/EnterpriseSettings/EnterpriseManageProfile';
import DeliveryboyManageProfile from './components/DeliveryBoy/DeliverySettings/DeliveryboyManageProfile';
import EnterpriseDriverNotAvailable from './components/Enterprise/EnterpriseSettings/EnterpriseDriverNotAvailable';
import AddDropDetails from './components/PickupDrop-off/AddDropDetails';
import WithdrawPayment from './components/PickupDrop-off/Settings/WithdrawPayment';
import WithdrawAmountTransfered from './components/PickupDrop-off/Settings/WithdrawAmountTransfered';
import ScheduleOrderSuccess from './components/PickupDrop-off/ScheduleOrderSuccess';
import DeliveryboyBillingDetails from './components/DeliveryBoy/DeliverySettings/DeliveryboyBillingDetails';
import EnterpriseAddMultpleDropDetails from './components/Enterprise/EnterpriseAddMultpleDropDetails';
import PrivacyPolicy from './common/PrivacyPolicy';
import TermsAndConditions from './common/TermsOfService';
import EnterpriseBillingDetail from './components/Enterprise/EnterpriseSettings/EnterpriseBillingDetail';
import {localizationText} from './utils/common';
import EnterpriseShiftRequestNewDelivery from './components/Enterprise/EnterpriseShiftRequestNewDelivery';
import EnterpriseShiftAddDetsils from './components/Enterprise/EnterpriseShiftAddDetsils';
import EnterpriseShiftOrderPreview from './components/Enterprise/EnterpriseShiftOrderPreview';
import EnterpriseShiftDeliveryboyAssigned from './components/Enterprise/EnterpriseShiftDeliveryboyAssigned';
import DeliveryboyMainShiftDetails from './components/DeliveryBoy/DeliveryboyMainShiftDetails';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [userDetails, setUserDetail] = useState(null);
  const {saveUserDetails} = useUserDetails();
  const [isLoading, setIsLoading] = useState(true);
  const takeSelfie =
    localizationText('NavHeaderTitles', 'takeSelfie') || 'Take a selfie';
  const privacyPolicy =
    localizationText('Common', 'privacyPolicy') || 'Privacy Policy';
  const termsAndConditions =
    localizationText('Common', 'privacyPolicy') || 'Terms And Conditions';
  const addPaymentMethod =
    localizationText('NavHeaderTitles', 'addPaymentMethod') ||
    'Add Payment Method';
  const withdraw =
    localizationText('NavHeaderTitles', 'withdraw') || 'Withdraw';
  const addPickupDetails =
    localizationText('NavHeaderTitles', 'addPickupDetails') ||
    'Add Pickup Details';
  const addDropDetails =
    localizationText('NavHeaderTitles', 'addDropDetails') || 'Add Drop Details';
  const orderPreview =
    localizationText('NavHeaderTitles', 'orderPreview') || 'Order Preview';
  const orderConfirmed =
    localizationText('NavHeaderTitles', 'orderConfirmed') || 'Order Confirmed';
  const payment = localizationText('NavHeaderTitles', 'payment') || 'Payment';
  const paymentSuccess =
    localizationText('NavHeaderTitles', 'paymentSuccess') || 'Payment Success';
  const scheduleOrderSuccess =
    localizationText('NavHeaderTitles', 'scheduleOrderSuccess') ||
    'Schedule Order Success';
  const notificationSettings =
    localizationText('NavHeaderTitles', 'notificationSettings') ||
    'Notification Settings';
  const notifications =
    localizationText('Common', 'notifications') || 'Notifications';
  const wallet = localizationText('Common', 'wallet') || 'Wallet';
  const deliveryDetails =
    localizationText('NavHeaderTitles', 'deliveryDetails') ||
    'Delivery Details';
  const changePassword =
    localizationText('Common', 'changePassword') || 'Change Password';
  const manageProfile =
    localizationText('NavHeaderTitles', 'manageProfile') || 'Manage Profile';
  const billingDetails =
    localizationText('Common', 'billingDetails') || 'Billing Details';
  const addVehicle =
    localizationText('NavHeaderTitles', 'addVehicle') || 'Add Vehicle';
  const addPickup =
    localizationText('NavHeaderTitles', 'addPickup') || 'Add Pickup';
  const setAvailability =
    localizationText('Common', 'setAvailability') || 'Set Availability';
  const support = localizationText('NavHeaderTitles', 'support') || 'Support';
  const scheduleDetails =
    localizationText('NavHeaderTitles', 'scheduleDetails') ||
    'Schedule Details';
  const transactions =
    localizationText('Common', 'transactions') || 'Transactions';
  const deliveryPreferance =
    localizationText('NavHeaderTitles', 'deliveryPreferance') ||
    'Delivery Preferance';
  const companyLocations =
    localizationText('Common', 'companyLocations') || 'Company Locations';
  const selectCompanyLocation =
    localizationText('NavHeaderTitles', 'selectCompanyLocation') ||
    'Select Company Location';
  const createNewDelivery =
    localizationText('NavHeaderTitles', 'createNewDelivery') ||
    'Create New Delivery';
  const createNewSchedule =
    localizationText('NavHeaderTitles', 'createNewSchedule') ||
    'Create New Schedule';
  const preview = localizationText('NavHeaderTitles', 'preview') || 'Preview';
  const shiftDetails =
    localizationText('NavHeaderTitles', 'shiftDetails') || 'Shift Details';
  const activeDeliveries =
    localizationText('NavHeaderTitles', 'activeDeliveries') ||
    'Active Deliveries';
  const locations =
    localizationText('NavHeaderTitles', 'locations') || 'Locations';
  const add = localizationText('NavHeaderTitles', 'add') || 'Add';
  const addNewLocations =
    localizationText('NavHeaderTitles', 'addNewLocations') ||
    'Add New Locations';
  const manageAds =
    localizationText('NavHeaderTitles', 'manageAds') || 'Manage Ads';
  const listNewAd =
    localizationText('NavHeaderTitles', 'listNewAd') || 'List New Ad';

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const getUserDetails = await AsyncStorage.getItem('userDetails');
        if (getUserDetails !== null) {
          console.log('userDetail==>', getUserDetails);
          saveUserDetails(JSON.parse(getUserDetails));
          let userDetails = JSON.parse(getUserDetails);
          setUserDetail(userDetails);
        }
        setIsLoading(false);
      } catch (error) {}
    };

    getUserDetails();
  }, []);

  useEffect(() => {
    if (SplashScreen) {
      SplashScreen.hide();
    }
  }, []);

  return (
    <>
      {!isLoading ? (
        <LoaderProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="LoginSignup"
                component={
                  userDetails == null
                    ? LoginSignup
                    : userDetails.userDetails[0].role == 'CONSUMER'
                    ? PickupBottomNav
                    : userDetails.userDetails[0].role == 'DELIVERY_BOY'
                    ? DeliveryboyBottomNav
                    : EnterpriseBottomNav
                }
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignUpVerify"
                component={SignUpVerify}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterpriseBottomNav"
                component={EnterpriseBottomNav}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PickupBottomNav"
                component={PickupBottomNav}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="DeliveryboyBottomNav"
                component={DeliveryboyBottomNav}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PickupTakeSelfie"
                component={PickupTakeSelfie}
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
                  headerTitle: takeSelfie,
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
                name="PrivacyPolicy"
                component={PrivacyPolicy}
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
                  headerTitle: privacyPolicy,
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
                name="TermsAndConditions"
                component={TermsAndConditions}
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
                  headerTitle: termsAndConditions,
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
                name="AddPaymentMethod"
                component={AddPaymentMethod}
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
                  headerTitle: addPaymentMethod,
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
                name="WithdrawPayment"
                component={WithdrawPayment}
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
                  headerTitle: withdraw,
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
                name="WithdrawAmountTransfered"
                component={WithdrawAmountTransfered}
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
                        size={25}
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
                        size={25}
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
                        size={25}
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
                        size={25}
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
                        size={25}
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
                name="AddPickupdetails"
                component={AddPickupdetails}
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
                  headerTitle: addPickupDetails,
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
                name="AddDropDetails"
                component={AddDropDetails}
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
                  headerTitle: addDropDetails,
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
                        size={25}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  ),
                  headerTitle: orderPreview,
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
                name="OrderPickup"
                component={OrderPickup}
                options={() => ({
                  headerLeft: null,
                  headerTitle: orderConfirmed,
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
                        size={25}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  ),
                  headerTitle: payment,
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
                name="PaymentSuccess"
                component={PaymentSuccess}
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
                  headerTitle: paymentSuccess,
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
                name="ScheduleOrderSuccess"
                component={ScheduleOrderSuccess}
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
                  headerTitle: scheduleOrderSuccess,
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
                name="DriverNotAvailable"
                component={DriverNotAvailable}
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
                        size={25}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  ),
                  headerTitle: orderConfirmed,
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
                        size={25}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  ),
                  headerTitle: notificationSettings,
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
                        size={25}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  ),
                  headerTitle: notifications,
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
                        size={25}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  ),
                  headerTitle: wallet,
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
                        size={25}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  ),
                  headerTitle: deliveryDetails,
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
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Supports')}
                      style={{paddingRight: 10}}>
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
                options={{headerShown: false}}
                // options={({navigation}) => ({
                //   headerLeft: () => (
                //     <TouchableOpacity
                //       onPress={() => navigation.goBack()}
                //       style={{paddingLeft: 10}}>
                //       <MaterialIcons
                //         name="keyboard-backspace"
                //         size={25}
                //         color={colors.text}
                //       />
                //     </TouchableOpacity>
                //   ),
                //   headerTitle: 'Address book',
                //   headerTitleStyle: {
                //     fontFamily: 'Montserrat-SemiBold',
                //     fontSize: 16,
                //   },
                //   headerTintColor: colors.text,
                //   headerTitleAlign: 'center',
                //   headerStyle: {
                //     borderBottomWidth: 0,
                //     elevation: 0,
                //   },
                //   headerRight: () => (
                //     <View style={{marginTop: 15}}>
                //       <TouchableOpacity
                //         onPress={toggleModal}
                //         style={{paddingRight: 10}}>
                //         <AntDesign name="plus" size={25} color={colors.text} />
                //       </TouchableOpacity>
                //       <AddNewAddressModal
                //         isModalVisible={isModalVisible}
                //         setModalVisible={setModalVisible}
                //       />
                //     </View>
                //   ),
                // })}
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
                  headerTitle: changePassword,
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
                  headerTitle: addPickup,
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
              <Stack.Screen
                name="TrackDeiver"
                component={TrackDeiver}
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
                name="DeliveryboyHistory"
                component={DeliveryboyHistory}
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
                  headerTitle: deliveryDetails,
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
                  headerTitle: addVehicle,
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
                        size={25}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  ),
                  headerTitle: deliveryDetails,
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
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Supports')}
                      style={{paddingRight: 10}}>
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
                name="Supports"
                component={Supports}
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
                  headerTitle: support,
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
                name="DeliveryDetailsMultipleOrder"
                component={DeliveryDetailsMultipleOrder}
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
                  headerTitle: deliveryDetails,
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
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Supports')}
                      style={{paddingRight: 10}}>
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
                        size={25}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  ),
                  headerTitle: deliveryDetails,
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
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Supports')}
                        style={{paddingRight: 10}}>
                        <Ionicons
                          name="settings-outline"
                          size={25}
                          color={colors.text}
                        />
                      </TouchableOpacity>
                    </View>
                  ),
                })}
              />
              <Stack.Screen
                name="DeliveryDetailsMultipleInvoice"
                component={DeliveryDetailsMultipleInvoice}
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
                  headerTitle: deliveryDetails,
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
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Supports')}
                        style={{paddingRight: 10}}>
                        <Ionicons
                          name="settings-outline"
                          size={25}
                          color={colors.text}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={{paddingRight: 10}}>
                        <Feather
                          name="download"
                          size={25}
                          color={colors.text}
                        />
                      </TouchableOpacity>
                    </View>
                  ),
                })}
              />
              <Stack.Screen
                name="DeliveryboyShiftDetails"
                component={DeliveryboyShiftDetails}
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
                  headerTitle: shiftDetails,
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
                    <TouchableOpacity
                      style={{paddingRight: 10}}
                      onPress={() => navigation.navigate('Supports')}>
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
                name="DeliveryboyShiftStarted"
                component={DeliveryboyShiftStarted}
                options={{
                  headerLeft: () => null,
                  headerTitle: 'Shift started',
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
                  headerRight: () => null,
                }}
              />

              <Stack.Screen
                name="DeliveryboyShiftStaredRequest"
                component={DeliveryboyShiftStaredRequest}
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
                  headerTitle: 'Shift started',
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
                  headerTitle: scheduleDetails,
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
                name="TrackDelivery"
                component={TrackDelivery}
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
                name="DeliveryboyTakeSelfie"
                component={DeliveryboyTakeSelfie}
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
                  headerTitle: takeSelfie,
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
                  headerTitle: deliveryPreferance,
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
                  headerTitle: wallet,
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
                  headerTitle: transactions,
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
                name="DeliveryboyManageProfile"
                component={DeliveryboyManageProfile}
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
                  headerTitle: manageProfile,
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
                  headerTitle: setAvailability,
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
              <Stack.Screen
                name="NewDeliveryPackageRequest"
                component={NewDeliveryPackageRequest}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="DeliveryPackageRequest"
                component={DeliveryPackageRequest}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="DeliveryPackageScheduleRequest"
                component={DeliveryPackageScheduleRequest}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="DeliveryboyBillingDetails"
                component={DeliveryboyBillingDetails}
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
                  headerTitle: billingDetails,
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
                name="DeliveryboyMainShiftDetails"
                component={DeliveryboyMainShiftDetails}
                options={({navigation}) => ({
                  headerLeft: () => null,
                  headerTitle: shiftDetails,
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
              {/* Enterprises Start Here  */}
              <Stack.Screen
                name="EnterprisesTakeSelfie"
                component={EnterprisesTakeSelfie}
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
                  headerTitle: takeSelfie,
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
                name="EnterpriseDriverNotAvailable"
                component={EnterpriseDriverNotAvailable}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterpriseSignup"
                component={EnterpriseSignup}
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
                name="EnterprisesActiveDeliveries"
                component={EnterprisesActiveDeliveries}
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
                  headerTitle: activeDeliveries,
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
                name="EnterpriseAddNewLocation"
                component={EnterpriseAddNewLocation}
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
                  headerTitle: addNewLocations,
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
                name="ConsumerManageProfile"
                component={ConsumerManageProfile}
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
                  headerTitle: manageProfile,
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
                name="PickupBillingDetails"
                component={PickupBillingDetails}
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
                  headerTitle: billingDetails,
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
                name="EnterpriseLocation"
                component={EnterpriseLocation}
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
                  headerTitle: locations,
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
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('EnterpriseAddNewLocation')
                        }
                        style={{paddingRight: 10}}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: 'Montserrat-SemiBold',
                              color: colors.secondary,
                              marginRight: 5,
                            }}>
                            {add}
                          </Text>
                          <AntDesign
                            name="plussquare"
                            size={25}
                            color={colors.secondary}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  ),
                })}
              />
              <Stack.Screen
                name="EnterpriseManageProfile"
                component={EnterpriseManageProfile}
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
                  headerTitle: manageProfile,
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
                name="EnterpriseThanksPage"
                component={EnterpriseThanksPage}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterpriseSetLocationAddressMap"
                component={EnterpriseSetLocationAddressMap}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterpriseHome"
                component={EnterpriseHome}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterpriseScheduleApproved"
                component={EnterpriseScheduleApproved}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterpriseScheduleRequestSubmitted"
                component={EnterpriseScheduleRequestSubmitted}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterpriseDeliveryboyAssigned"
                component={EnterpriseDeliveryboyAssigned}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterpriseCompanyLocations"
                component={EnterpriseCompanyLocations}
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
                  headerTitle: companyLocations,
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
                name="EnterpriseManageAds"
                component={EnterpriseManageAds}
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
                  headerTitle: manageAds,
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
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('EnterpriseListNewAd')
                        }
                        style={{paddingRight: 10}}>
                        <AntDesign name="plus" size={25} color={colors.text} />
                      </TouchableOpacity>
                    </View>
                  ),
                })}
              />
              <Stack.Screen
                name="EnterpriseShiftDetails"
                component={EnterpriseShiftDetails}
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
                  headerTitle: shiftDetails,
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
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Supports')}
                        style={{paddingRight: 10}}>
                        <Ionicons
                          name="settings-outline"
                          size={25}
                          color={colors.text}
                        />
                      </TouchableOpacity>
                    </View>
                  ),
                })}
              />
              <Stack.Screen
                name="EnterpriseDeliveryboyReady"
                component={EnterpriseDeliveryboyReady}
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
                  headerTitle: shiftDetails,
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
                name="EnterpriseListNewAd"
                component={EnterpriseListNewAd}
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
                  headerTitle: listNewAd,
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
                name="EnterpriseScheduleNewDelivery"
                component={EnterpriseScheduleNewDelivery}
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
                name="EnterprisesMultiScheduleDetails"
                component={EnterprisesMultiScheduleDetails}
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
                  headerTitle: createNewDelivery,
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
                name="EnterpriesSelectCompanyLocation"
                component={EnterpriesSelectCompanyLocation}
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
                  headerTitle: selectCompanyLocation,
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
                name="EnterpiseSelectDeliveryTypes"
                component={EnterpiseSelectDeliveryTypes}
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
                  headerTitle: createNewDelivery,
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
                name="EnterpiseScheduleNewDetailsFill"
                component={EnterpiseScheduleNewDetailsFill}
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
                  headerTitle: createNewDelivery,
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
                name="EnterpiseSelectShiftDelivery"
                component={EnterpiseSelectShiftDelivery}
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
                  headerTitle: createNewDelivery,
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
                name="EnterpriseShiftDeliverySchedule"
                component={EnterpriseShiftDeliverySchedule}
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
                  headerTitle: createNewSchedule,
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
                name="EnterpriseSchedulePreview"
                component={EnterpriseSchedulePreview}
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
                  headerTitle: preview,
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
                name="EnterpriseMapPickupAddress"
                component={EnterpriseMapPickupAddress}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterpriseMapDropAddress"
                component={EnterpriseMapDropAddress}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterpriseLookingForDriver"
                component={EnterpriseLookingForDriver}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterpriseOrderCancelled"
                component={EnterpriseOrderCancelled}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterpriseTrackDeiver"
                component={EnterpriseTrackDeiver}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterpriseDeliveryCompleted"
                component={EnterpriseDeliveryCompleted}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterpriseFeedbackThanksPage"
                component={EnterpriseFeedbackThanksPage}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="EnterpriseOrderPickup"
                component={EnterpriseOrderPickup}
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
                  headerTitle: orderConfirmed,
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
                name="EnterpriseOrderDelivering"
                component={EnterpriseOrderDelivering}
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
                  headerTitle: orderConfirmed,
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
                name="EnterprisePickupOrderPriview"
                component={EnterprisePickupOrderPriview}
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
                  headerTitle: preview,
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
                name="EnterpriseOrderPayment"
                component={EnterpriseOrderPayment}
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
                  headerTitle: payment,
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
                name="EnterpriseAddMultpleDropDetails"
                component={EnterpriseAddMultpleDropDetails}
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
                  headerTitle: addDropDetails,
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
                name="EnterpriseBillingDetail"
                component={EnterpriseBillingDetail}
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
                  headerTitle: billingDetails,
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
                name="EnterpriseShiftRequestNewDelivery"
                component={EnterpriseShiftRequestNewDelivery}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterpriseShiftAddDetsils"
                component={EnterpriseShiftAddDetsils}
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
                  headerTitle: addDropDetails,
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
                name="EnterpriseShiftOrderPreview"
                component={EnterpriseShiftOrderPreview}
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
                  headerTitle: 'Order Preview',
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
                name="EnterpriseShiftDeliveryboyAssigned"
                component={EnterpriseShiftDeliveryboyAssigned}
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
                  headerTitle: 'Shift Details',
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
          <Loader />
        </LoaderProvider>
      ) : null}
    </>
  );
};

export default AppNavigator;
