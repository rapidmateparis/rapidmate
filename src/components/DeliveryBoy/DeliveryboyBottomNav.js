import {BackHandler, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../colors';
import DeliveryboyHome from './DeliveryboyHome';
import Planning from './Planning';
import DeliveryboyHistory from './DeliverboyHistory';
import DeliveryboySettings from './DeliverySettings/DeliveryboySettings';
import Notifications from '../PickupDrop-off/Settings/Notifications';
import RNExitApp from 'react-native-exit-app';
import messaging from '@react-native-firebase/messaging';
import {getLocations, getNotificationCount, getViewOrderDetail} from '../../data_manager';
import DeliveryBoyAcceptRejectModal from '../commonComponent/DeliveryBoyAcceptRejectModal';
import {useLoader} from '../../utils/loaderContext';
import {useLocationData, useUserDetails} from '../commonComponent/StoreContext';
import { playNotificationSound, stopNotificationSound } from '../../utils/common';

const Bottom = createBottomTabNavigator();

const DeliveryboyBottomNav = ({navigation}) => {
  const {userDetails,saveUserDetails} = useUserDetails();
  const [
    isDeliveryBoyAcceptRejectModalModalVisible,
    setDeliveryBoyAcceptRejectModalModalVisible,
  ] = useState(false);
  const [deliveryBoyAcceptRejectMessage, setDeliveryBoyAcceptRejectMessage] =
    useState();
  const {setLoading} = useLoader();
  const {saveLocationData} = useLocationData();

  useEffect(() => {
    getLocations(
      null,
      successResponse => {
        if (successResponse[0]._success) {
          let tempOrderList = successResponse[0]._response;
          saveLocationData(tempOrderList);
        }
      },
      errorResponse => {
        if (errorResponse[0]._errors.message) {
          console.log('print_error==>', errorResponse[0]);
        }
      },
    );
  }, []);


  const getNotificationAllCount = () => {
    getNotificationCount(
      userDetails.userDetails[0].ext_id,
      successResponse => {
        console.log('getNotificationAllCount==>successResponse', '' + JSON.stringify(successResponse[0]._response.notificationCount));
        userDetails.userDetails[0].notificationCount
        const newUserDetails = userDetails.userDetails[0]
        if (successResponse[0]?._response?.notificationCount) {
          newUserDetails['notificationCount']=successResponse[0]._response.notificationCount  
        }else{
          newUserDetails['notificationCount']=0
        }
        saveUserDetails({...userDetails,userDetails:[newUserDetails]});
        setLoading(false);
      },
      errorResponse => {
        setLoading(false);
        console.log('getNotificationAllCount==>errorResponse', '' + errorResponse[0]);
      },
    );
  };



  useEffect(async () => {
    messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage *Delivery Boy*', JSON.stringify(remoteMessage));
      getNotificationAllCount()

      if(remoteMessage?.data?.orderStatus === 'ORDER_ALLOCATED' && remoteMessage.data?.orderNumber && remoteMessage?.data?.orderStatus){
        playNotificationSound()
        setDeliveryBoyAcceptRejectModalModalVisible(true);
        getViewOrderDetail(
          remoteMessage.data?.orderNumber,
          successResponse => {
            setLoading(false);
            if (successResponse[0]._success) {
              setDeliveryBoyAcceptRejectMessage(successResponse[0]._response);
              setTimeout(()=>{
                stopNotificationSound()
                setDeliveryBoyAcceptRejectModalModalVisible(false);
              },30000)
            }
          },
          errorResponse => {
            setLoading(false);
            Alert.alert('Error Alert', errorResponse[0]._errors.message, [
              {
                text: 'OK',
                onPress: () => {
                  stopNotificationSound()
                  setDeliveryBoyAcceptRejectModalModalVisible(false);
                },
              },
            ]);
          },
        );
      }
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background Msg!!!!', JSON.stringify(remoteMessage));
      navigation.navigate('Notifications', {
        params: JSON.stringify(remoteMessage),
      });
    });
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      Alert.alert(
        'Exit App',
        'Do you want to exit?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'YES', onPress: () => RNExitApp.exitApp()},
        ],
        {cancelable: false},
      );
      return true; // Prevent the default back button behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    // Clean up back handler on unmount
    return () => {
      backHandler.remove();
    };
  }, []);

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

      <DeliveryBoyAcceptRejectModal
        isDeliveryBoyAcceptRejectModalModalVisible={
          isDeliveryBoyAcceptRejectModalModalVisible
        }
        setDeliveryBoyAcceptRejectModalModalVisible={(flag)=>{
          stopNotificationSound()
          setDeliveryBoyAcceptRejectModalModalVisible(flag)
        }}
        deliveryBoyAcceptRejectMessage={deliveryBoyAcceptRejectMessage}
      />
    </>
  );
};

export default DeliveryboyBottomNav;
