import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
  Linking,
  BackHandler,
  Dimensions,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import Clipboard from '@react-native-clipboard/clipboard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import {
  usePlacedOrderDetails,
  useUserDetails,
} from '../commonComponent/StoreContext';
import {API} from '../../utils/constant';
import { localizationText } from '../../utils/common';

const {height: screenHeight} = Dimensions.get('window');

const OrderPickup = ({route, navigation}) => {
  const {saveUserDetails, userDetails} = useUserDetails();

  const [deliveryTime, setDeliveryTime] = useState(60 * 30); // 30 minutes in seconds
  const {placedOrderDetails} = usePlacedOrderDetails();
  const [isCopied, setIsCopied] = useState(false);
  const [otpCopied, setOtpCopied] = useState(false);
  const [otpDeliveredCopied, setOtpDeliveredCopied] = useState(false);
  const [driverDetails, setDriverDetails] = useState(
    route.params.driverDetails,
  );
  const [locationList, setLocationList] = useState(route.params.locationList);
  const [orderId, setOrderID] = useState(placedOrderDetails[0]?.order_number);
  const [otp, setOtp] = useState(placedOrderDetails[0]?.otp);
  const [deliveredOtp, setDeliveredOtp] = useState(
    placedOrderDetails[0]?.delivered_otp,
  );

  useEffect(() => {
    console.log('progressTypeId ====>', userDetails.progressTypeId);
    console.log('delivered_otp ====>', userDetails.delivered_otp);

    userDetails.progressTypeId &&
      setCurrentPosition(userDetails.progressTypeId);
    userDetails.delivered_otp && setDeliveredOtp(userDetails.delivered_otp);
  }, [userDetails.progressTypeId, userDetails.delivered_otp]);

  const [currentPosition, setCurrentPosition] = useState(0);

  const stepCount = 5;

  // Labels for each step in the step indicator
  const labels = [
    localizationText('OrderStatus', 'driverAssigned'),
    localizationText('OrderStatus', 'pickupInProgress'),
    localizationText('OrderStatus', 'orderPickedUp'),
    localizationText('OrderStatus', 'orderArrivingSoon'),
    localizationText('OrderStatus', 'completed'),
  ];

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 12,
    currentStepIndicatorLabelFontSize: 12,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 11,
    currentStepLabelColor: '#fe7013',
  };

  useEffect(() => {
    const onBackPress = () => true;

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => backHandler.remove();
  }, []);

  const handleCopyOrderId = () => {
    Clipboard.setString(orderId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCopyOtp = () => {
    Clipboard.setString(otp);
    setOtpCopied(true);
    setTimeout(() => {
      setOtpCopied(false);
    }, 2000);
  };

  const handleCopyDeliveredOtp = () => {
    Clipboard.setString(deliveredOtp);
    setOtpDeliveredCopied(true);
    setTimeout(() => {
      setOtpDeliveredCopied(false);
    }, 2000);
  };

  const getLocationAddress = locationId => {
    let result = locationList.filter(location => location.id == locationId);
    if (result[0]) {
      let location = result[0];
      return `${location.address}, ${location.city}, ${location.state}, ${location.country}`;
    }
    return null;
  };

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  const handleCall = phoneNumber => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(err => {
      console.error('Failed to make the call:', err);
      Alert.alert('Error', 'Unable to make a call');
    });
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
        <ImageBackground
          style={{flex: 1, height: screenHeight}}
          source={require('../../image/DeliveryRequest-bg.png')}>
          <View style={{paddingHorizontal: 20, flex: 1}}>
            <View style={styles.textContainer}>
              <Text style={styles.oderIdText}>
                {localizationText('Common', 'orderID')}:{' '}
              </Text>
              <TouchableOpacity onPress={handleCopyOrderId}>
                <Text style={styles.text}>{orderId}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCopyOrderId}>
                <AntDesign
                  name={isCopied ? 'checkcircle' : 'copy1'}
                  size={18}
                  color={isCopied ? '#00C851' : '#FF0058'}
                  style={styles.copyIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.textOtpContainer}>
              <View style={[styles.textContainer, {marginRight: 10}]}>
                <Text style={styles.oderIdText}>
                  {localizationText('Common', 'pickupOTP')}:{' '}
                </Text>
                <TouchableOpacity onPress={handleCopyOtp}>
                  <Text style={styles.text}>{otp}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCopyOtp}>
                  <AntDesign
                    name={otpCopied ? 'checkcircle' : 'copy1'}
                    size={18}
                    color={otpCopied ? '#00C851' : '#FF0058'}
                    style={styles.copyIcon}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.oderIdText}>
                  {localizationText('Common', 'deliveredOTP')}:{' '}
                </Text>
                <TouchableOpacity onPress={handleCopyDeliveredOtp}>
                  <Text style={styles.text}>{deliveredOtp}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCopyDeliveredOtp}>
                  <AntDesign
                    name={otpDeliveredCopied ? 'checkcircle' : 'copy1'}
                    size={18}
                    color={otpDeliveredCopied ? '#00C851' : '#FF0058'}
                    style={styles.copyIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.boxCard}>
              <Image
                style={styles.cloud1}
                source={require('../../image/Cloud-Graphic.png')}
              />
              <Image
                style={styles.cloud2}
                source={require('../../image/Cloud-Graphic.png')}
              />
            </View>

            <View style={styles.devileryMap}>
              <View style={styles.Delivering}>
                <Text style={styles.DeliveringText}>
                  {localizationText('Common', 'pickupFrom')}
                </Text>
                <Text style={styles.subAddress}>
                  {getLocationAddress(
                    placedOrderDetails[0]?.pickup_location_id,
                  )}
                </Text>
              </View>
              <View>
                <Image source={require('../../image/dummyMap.png')} />
              </View>
            </View>

            <View style={styles.devileryMap}>
              <View style={styles.Delivering}>
                <Text style={styles.DeliveringText}>
                  {localizationText('Common', 'deliveringTo')}
                </Text>
                <Text style={styles.subAddress}>
                  {getLocationAddress(
                    placedOrderDetails[0]?.dropoff_location_id,
                  )}
                </Text>
              </View>
              <View>
                <Image source={require('../../image/dummyMap.png')} />
              </View>
            </View>

            <View style={{marginVertical: 30}}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={labels}
                stepCount={stepCount}
                // onPress={position => setCurrentPosition(position)}
              />
            </View>

            <View style={styles.driverCard}>
              <View style={{position: 'relative'}}>
                {driverDetails?.deliveryBoy?.profile_pic ? (
                  <Image
                    style={{width: 50, height: 50, borderRadius: 30}}
                    source={{
                      uri:
                        API.viewImageUrl +
                        driverDetails.deliveryBoy.profile_pic,
                    }}
                  />
                ) : (
                  <Image
                    style={{width: 50, height: 50, borderRadius: 30}}
                    source={require('../../image/driver.jpeg')}
                  />
                )}
                {/* <Image
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 30,
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                  }}
                  source={require('../../image/Drivers-Truck.jpg')}
                /> */}
              </View>
              <View style={{width: '48%'}}>
                <Text style={styles.driverName}>
                  {driverDetails?.deliveryBoy?.first_name +
                    ' ' +
                    driverDetails?.deliveryBoy?.last_name}
                </Text>
                <Text style={styles.truckName}>
                  {driverDetails?.vehicle?.plat_no}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => handleCall(driverDetails?.deliveryBoy?.phone)}
                  style={{marginRight: 5}}>
                  <Image
                    style={{width: 35, height: 35}}
                    source={require('../../image/chat-icon.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleCall(driverDetails?.deliveryBoy?.phone)}>
                  <Image
                    style={{width: 35, height: 35}}
                    source={require('../../image/call-icon.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* <TouchableOpacity
              onPress={() => {
                // navigation.navigate('OrderConfirm', {
                //   driverDetails: route.params.driverDetails,
                //   locationList: route.params.locationList,
                //   placedOrderDetails: placedOrderDetails[0],
                // })
                navigation.navigate('DeliveryDetails', {
                  orderItem: placedOrderDetails[0],
                });
              }}
              style={styles.trackOrderBtn}>
              <Text style={styles.trackText}>View Order Details</Text>
            </TouchableOpacity> */}

            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                style={styles.requestTouch}
                onPress={() => {
                  // TODO: Because this screen only show when delivery boy allocated for this order so manually change the id
                  const changeStatus = {
                    ...placedOrderDetails[0],
                    is_delivery_boy_allocated: 1,
                  };

                  navigation.navigate('DeliveryDetails', {
                    orderItem: changeStatus,
                  });
                }}>
                <Text style={styles.cancelRequest}>
                  {localizationText('Common', 'viewOrderDetails')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.requestTouch}
                onPress={() => {
                  navigation.navigate('PickupBottomNav');
                }}>
                <Text style={styles.cancelRequest}>
                  {localizationText('Common', 'goHome')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 3,
  },
  text: {
    marginRight: 5,
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  copyIcon: {
    marginLeft: 5,
  },
  copiedMessage: {
    textAlign: 'center',
    color: colors.text,
    marginTop: 5,
  },
  oderIdText: {
    fontSize: 12,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  devileryMap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 5,
    marginTop: 5,
  },
  Delivering: {
    flex: 1,
    padding: 15,
  },
  DeliveringText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  subAddress: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 5,
    marginTop: 5,
  },
  truckName: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  driverName: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
  },
  trackOrderBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 80,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  trackText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  boxCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 25,
    position: 'relative',
  },
  cloud1: {
    position: 'absolute',
    left: '5%',
    top: '20%',
  },
  cloud2: {
    position: 'absolute',
    right: '5%',
    top: '50%',
  },
  textOtpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestTouch: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    // marginLeft: 10,
    marginTop: 10,
  },
  cancelRequest: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
});

export default OrderPickup;
