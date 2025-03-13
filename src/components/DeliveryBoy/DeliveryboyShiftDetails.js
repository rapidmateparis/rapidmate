import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  Alert,
  Linking,
} from 'react-native';
import {colors} from '../../colors';
import SwipeButton from 'rn-swipe-button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StartShift from '../../image/play-32.png';
import {useNavigation} from '@react-navigation/native';
import {API} from '../../utils/constant';
import {updateShiftOrderStatus} from '../../data_manager';
import {localizationText, utcLocal} from '../../utils/common';
import moment from 'moment';
import {useLoader} from '../../utils/loaderContext';
import {useUserDetails} from '../commonComponent/StoreContext';
import BicycleImage from '../../image/Cycle-Icon.png';
import MotorbikeImage from '../../image/Motorbike.png';
import CarImage from '../../image/Car-Icon.png';
import PartnerImage from '../../image/Partner-icon.png';
import VanImage from '../../image/Van-Icon.png';
import PickupImage from '../../image/Pickup-Icon.png';
import TruckImage from '../../image/Truck-Icon.png';
import BigTruckImage from '../../image/Big-Package.png';

const DeliveryboyShiftDetails = ({navigation, route}) => {
  const defaultStatusMessage = 'Swipe to accept the request';
  const [swipeStatusMessage, setSwipeStatusMessage] =
    useState(defaultStatusMessage);
  const [forceResetLastButton, setForceResetLastButton] = useState(null);
  const orderDetails = route?.params?.orderItem;
  const updateSwipeStatusMessage = message => setSwipeStatusMessage(message);
  const [delivered, setDelivered] = useState(false);
  const {setLoading} = useLoader();
  const {saveUserDetails, userDetails} = useUserDetails();
  const swipeToStartShift =
    localizationText('Common', 'swipeToStartShift') || 'Swipe to start shift';

  console.log('orderDetails ====>>', orderDetails);
  console.log('route?.params ====>>', route?.params);
  // useEffect(() => {
  //   const interval = setInterval(
  //     () => setSwipeStatusMessage(defaultStatusMessage),
  //     5000,
  //   );
  //   return () => clearInterval(interval);
  // }, [defaultStatusMessage]);

  const startCreateShiftOrder = () => {
    if (checkStartAction()) {
      setLoading(true);
      updateShiftOrderStatus(
        {
          order_number: orderDetails.order_number,
          status: 'Start',
          slot_id: checkStartAction().id,
        },
        successRes => {
          const shiftOrderRunningTime = {
            order_number: orderDetails.order_number,
            status: 'Start',
            slot_id: checkStartAction().id,
            start_time: new Date(),
          };

          saveUserDetails({
            ...userDetails,
            createShiftOrder: shiftOrderRunningTime,
          });

          setLoading(false);
          navigation.navigate('DeliveryboyShiftStarted', {
            orderItem: orderDetails,
          });
          console.log('successRes  =====>', successRes);
        },
        errorRes => {
          setLoading(false);
          console.log('errorRes  =====>', errorRes);
        },
      );
    }
  };

  const checkStartAction = () => {
    const slots = orderDetails?.slots ? orderDetails?.slots : [];
    const todayDate = moment(new Date()).format('DD/MM/YYYY');
    console.log('todayDate  =====>', todayDate);

    const todayList = slots.filter(
      slot =>
        moment(utcLocal(slot.slot_date)).format('DD/MM/YYYY') === todayDate,
    );

    const getSlot = todayList.length > 0 ? todayList[0] : [];
    return getSlot;
  };
  useEffect(() => {
    if (
      checkStartAction() &&
      checkStartAction()?.id &&
      checkStartAction()?.order_status == 'WORKING_INPROGRESS'
    ) {
      navigation.navigate('DeliveryboyShiftStarted', {orderItem: orderDetails});
    }
  }, []);

  const openGoogleMaps = address => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address,
    )}`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const getVechicleImage = vehicleTypeId => {
    switch (vehicleTypeId) {
      case 1:
        return BicycleImage;
      case 2:
        return MotorbikeImage;
      case 3:
        return CarImage;
      case 4:
        return PartnerImage;
      case 5:
        return VanImage;
      case 6:
        return PickupImage;
      case 7:
        return TruckImage;
      default:
        return BigTruckImage;
    }
  };
  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.packageCard}>
          <View style={{width: '10%'}}>
            <Image source={require('../../image/package-medium-icon.png')} />
          </View>
          <View style={{marginLeft: 5, width: '89%'}}>
            <View style={styles.pickupCardHeader}>
              <Text style={styles.dropInfo}>
                {localizationText('Common', 'companyInformation')}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  openGoogleMaps(
                    orderDetails?.address ? orderDetails.address : '-',
                  )
                }>
                <Image
                  style={styles.startIcon}
                  source={require('../../image/Start-Icon.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.companyInfosmain}>
              <View style={{width: '65%'}}>
                <Text style={styles.companyInfo}>
                  {orderDetails?.branch_name ? orderDetails?.branch_name : '-'}
                </Text>
                <Text style={styles.dropInfo}>
                  {orderDetails?.address ? orderDetails.address : '-'}
                </Text>
              </View>
              <View style={styles.contactInfoIcons}>
                <TouchableOpacity style={{marginRight: 10}}>
                  <Image source={require('../../image/chat-icon.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require('../../image/call-icon.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.packageDetailCard}>
            <View style={{padding: 15}}>
              <View style={styles.packageHeader}>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../../image/Big-Calender.png')}
                />
                <Text style={styles.deliveryTime}>
                  {localizationText('Common', 'shift')}
                </Text>
              </View>

              <View style={styles.overViewCard}>
                <View>
                  <Text style={styles.requestOverview}>
                    {/* {orderDetails?.total_days ? orderDetails.total_days : 0} */}
                    1
                  </Text>
                  <Text style={styles.requestOverviewInfo}>
                    {localizationText('Common', 'totalDays')}
                  </Text>
                </View>

                <View>
                  <Text style={styles.requestOverview}>
                    {orderDetails?.total_hours
                      ? orderDetails.total_hours.toFixed(2)
                      : 0}
                  </Text>
                  <Text style={styles.requestOverviewInfo}>
                    {localizationText('Common', 'totalHours')}
                  </Text>
                </View>

                <View>
                  <Text style={styles.requestOverview}>
                    €
                    <Text>
                      {orderDetails?.total_amount
                        ? orderDetails.total_amount.toFixed(2)
                        : 0}
                    </Text>
                  </Text>
                  <Text style={styles.requestOverviewInfo}>
                    {localizationText('Common', 'aproxEarning')}
                  </Text>
                </View>
              </View>

              <View>
                <View style={styles.scheduleDateTimeCard}>
                  <Text style={styles.schaduleInfo}>
                    {localizationText('Common', 'from')}{' '}
                    <Text style={styles.schaduleDateTime}>
                      {moment(
                        utcLocal(
                          orderDetails?.slots
                            ? orderDetails.slots[0].slot_date
                            : new Date(),
                        ),
                      ).format('DD-MM-YYYY')}
                    </Text>
                  </Text>
                  <View style={styles.borderShowoff} />
                  <Text style={styles.schaduleInfo}>
                    {localizationText('Common', 'to')}{' '}
                    <Text style={styles.schaduleDateTime}>
                      {moment(
                        utcLocal(
                          orderDetails?.slots
                            ? orderDetails.slots[0].slot_date
                            : new Date(),
                        ),
                      ).format('DD-MM-YYYY')}
                    </Text>
                  </Text>
                </View>
              </View>
              <View>
                <View style={styles.scheduleDateTimeCard}>
                  <Text style={styles.schaduleInfo}>
                    {localizationText('Common', 'from')}{' '}
                    <Text style={styles.schaduleDateTime}>
                      {orderDetails?.slots
                        ? orderDetails.slots[0].from_time
                        : ''}
                    </Text>
                  </Text>
                  <View style={styles.borderShowoff} />
                  <Text style={styles.schaduleInfo}>
                    {localizationText('Common', 'to')}{' '}
                    <Text style={styles.schaduleDateTime}>
                      {orderDetails?.slots ? orderDetails.slots[0].to_time : ''}
                    </Text>
                  </Text>
                </View>
                <Text style={styles.timeSlotDetails}>
                  {localizationText('Common', 'shiftDifferentSlots')}
                </Text>
              </View>
            </View>
            <View style={styles.moreDetails}>
              <Text style={styles.distance}>
                {localizationText('Common', 'seeDetails')}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DeliveryScheduleDetails', {
                    orderItem: orderDetails,
                  })
                }>
                <AntDesign name="arrowright" size={18} color="#FF0058" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.vehicleCardInfo}>
            <View>
              <Text style={styles.packageTitle}>
                {localizationText('Common', 'vehicleRequested')}
              </Text>
              <Text style={styles.orderdetails}>
                {orderDetails?.vehicle_type}
              </Text>
            </View>
            <View>
              <Image
                style={{width: 55, height: 45, resizeMode: 'contain'}}
                source={getVechicleImage(route.params.orderItem.vehicle_type_id)}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.swipeBt}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.container}>
            <Text style={styles.swipeInfo}>
              {localizationText('Main', 'shiftDetailsSwipeDescription')}
            </Text>
            {!!checkStartAction()?.id && (
              <>
                <SwipeButton
                  onSwipeFail={() =>
                    updateSwipeStatusMessage('Incomplete swipe!')
                  }
                  onSwipeStart={() =>
                    updateSwipeStatusMessage('Swipe started!')
                  }
                  onSwipeSuccess={() => {
                    // Alert.alert('swipe success---')
                    updateSwipeStatusMessage('Shift accepted');
                    startCreateShiftOrder();
                    // navigation.navigate('DeliveryboyShiftStarted');
                  }}
                  thumbIconImageSource={StartShift}
                  railBackgroundColor="#27AE601F"
                  railStyles={{
                    backgroundColor: '#27AE601F',
                    borderColor: '#27AE60',
                  }}
                  thumbIconBackgroundColor="#4BAE4F"
                  thumbIconStyles={{padding: 0, width: 0, borderWidth: 0}}
                  thumbIconWidth={50}
                  title={
                    <View style={styles.swipeTitleComp}>
                      <Text style={{color: colors.text}}>
                        {swipeToStartShift}
                      </Text>
                      <AntDesign
                        name="doubleright"
                        size={18}
                        color="#000"
                        style={styles.copyIcon}
                      />
                    </View>
                  }
                  enable
                  titleStyles={{
                    color: '#19151C',
                    fontSize: 14,
                    fontFamily: 'Montserrat-Regular',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                />
              </>
            )}
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  packageCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 7,
    marginTop: 7,
  },
  dropInfo: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#131314',
    marginBottom: 10,
    marginTop: 4,
  },
  companyInfo: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Add this line
  },
  packageTitle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  orderdetails: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.subText,
    marginVertical: 3,
  },
  pickupCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactInfoIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyInfosmain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  borderShowoff: {
    borderWidth: 0.5,
    borderColor: '#000',
    borderStyle: 'dashed',
    width: 20,
    marginHorizontal: 5,
  },
  borderShow: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    width: '100%',
    marginVertical: 15,
  },
  headingOTP: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  vehicleCardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 10,
    marginTop: 7,
  },
  deliveryStatusCard: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 10,
    marginTop: 7,
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: '#f1f1f1',
    width: 50,
  },
  deliveryinfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusInfo: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    paddingHorizontal: 5,
  },
  statusAboutDelivery: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  logbutton: {
    width: '100%',
    borderRadius: 5,
    marginVertical: 10,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  boyEarning: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  earnedMoney: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
  },
  earningCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  packageDetailCard: {
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 7,
    marginTop: 7,
  },
  packageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTime: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 10,
  },
  overViewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  requestOverview: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  requestOverviewInfo: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  scheduleDateTimeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  schaduleInfo: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  schaduleDateTime: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  timeSlotDetails: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    color: colors.secondary,
  },
  moreDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff2f6',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  distance: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
  },
  container: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 40,
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginTop: 7,
  },
  swipeStatus: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeading: {color: '#fff', fontSize: 15},
  swipeTitleComp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  copyIcon: {
    position: 'absolute',
    right: -50,
  },
  swipeInfo: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    marginVertical: 10,
  },
  swipeBt: {
    marginTop: '30%',
  },
  startIcon: {
    height: 23,
    width: 60,
  },
});

export default DeliveryboyShiftDetails;
