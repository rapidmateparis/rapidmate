import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {localizationText, requestNotificationPermission} from '../../utils/common';
import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';
import {
  getNotificationCount,
  getViewEnterpriseOrderDetail,
  updateUserProfile,
} from '../../data_manager';
import {useUserDetails} from '../commonComponent/StoreContext';
import {useLoader} from '../../utils/loaderContext';
import DeliveryBoyAcceptRejectModal from '../commonComponent/DeliveryBoyAcceptRejectModal';

const Bottom = createBottomTabNavigator();
const EnterpriseBottomNav = ({navigation}) => {
  const {userDetails, saveUserDetails} = useUserDetails();
  const homeText = localizationText('BottomTabNav', 'home');
  const chatText = localizationText('BottomTabNav', 'chat');
  const planningText = localizationText('BottomTabNav', 'planning');
  const ordersText = localizationText('BottomTabNav', 'orders');
  const accountText = localizationText('BottomTabNav', 'account');
  const {setLoading} = useLoader();
  const [
    isDeliveryBoyAcceptRejectModalModalVisible,
    setDeliveryBoyAcceptRejectModalModalVisible,
  ] = useState(false);
  const [deliveryBoyAcceptRejectMessage, setDeliveryBoyAcceptRejectMessage] =
    useState();

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
    }
    onSignIn();
  }, []);

  const updateProfile = token => {
    let profileParams = {
      ext_id: userDetails.userDetails[0].ext_id,
      token: token,
    };
    updateUserProfile(
      userDetails.userDetails[0].role,
      profileParams,
      successResponse => {
        console.log('updateUserProfile success', '' + successResponse);
      },
      errorResponse => {
        console.log('updateUserProfile error', '' + errorResponse);
      },
    );
  };

  const getNotificationAllCount = () => {
    getNotificationCount(
      userDetails.userDetails[0].ext_id,
      successResponse => {
        console.log(
          'getNotificationAllCount==>successResponse',
          '' + JSON.stringify(successResponse[0]._response.notificationCount),
        );
        userDetails.userDetails[0].notificationCount;
        const newUserDetails = userDetails.userDetails[0];
        if (successResponse[0]?._response?.notificationCount) {
          newUserDetails['notificationCount'] =
            successResponse[0]._response.notificationCount;
        } else {
          newUserDetails['notificationCount'] = 0;
        }
        saveUserDetails({...userDetails, userDetails: [newUserDetails]});
      },
      errorResponse => {
        console.log(
          'getNotificationAllCount==>errorResponse',
          '' + errorResponse[0],
        );
      },
    );
  };

  useEffect(async () => {
    messaging().onMessage(async remoteMessage => {
      if (remoteMessage.data?.delivered_otp) {
        saveUserDetails({
          ...userDetails,
          delivered_otp: remoteMessage.data?.delivered_otp,
        });
      }

      if (remoteMessage.data?.progressTypeId) {
        saveUserDetails({
          ...userDetails,
          progressTypeId: remoteMessage.data?.progressTypeId,
        });
      }

      if (remoteMessage.data?.otp) {
        saveUserDetails({
          ...userDetails,
          otp: remoteMessage.data?.otp,
        });
      }

      setLoading(true)
      getNotificationAllCount();
      setDeliveryBoyAcceptRejectModalModalVisible(true);
      console.log('remoteMessage', JSON.stringify(remoteMessage));
      getViewEnterpriseOrderDetail(
        remoteMessage.data?.orderNumber,
        successResponse => {
          setLoading(false);
          if (successResponse[0]._success) {
            setDeliveryBoyAcceptRejectMessage(successResponse[0]._response);
          }
        },
        errorResponse => {
          setLoading(false);
          console.log('orderDetail==>errorResponse', errorResponse[0]);
          Alert.alert('Error Alert', errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background Msg!!!!', JSON.stringify(remoteMessage));
      navigation.navigate('Notifications', {
        params: JSON.stringify(remoteMessage),
      });
    });
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
    <>
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
          name={homeText}
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

        {/* <Bottom.Screen
          key="Notifications"
          name={chatText}
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
        /> */}

        <Bottom.Screen
          key="EnterprisePlanning"
          name={planningText}
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
          name={ordersText}
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
          name={accountText}
          component={EnterprisesSettins}
          options={{
            headerTitle: `${localizationText('Common','settings')}`,
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
      {/* <DeliveryBoyAcceptRejectModal
        isDeliveryBoyAcceptRejectModalModalVisible={
          isDeliveryBoyAcceptRejectModalModalVisible
        }
        setDeliveryBoyAcceptRejectModalModalVisible={
          setDeliveryBoyAcceptRejectModalModalVisible
        }
        deliveryBoyAcceptRejectMessage={deliveryBoyAcceptRejectMessage}
      /> */}
    </>
  );
};

export default EnterpriseBottomNav;
