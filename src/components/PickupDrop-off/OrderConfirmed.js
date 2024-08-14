import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GoogleMapScreen from '../commonComponent/MapAddress';
import {colors} from '../../colors';
import {
  usePlacedOrderDetails,
  useUserDetails,
} from '../commonComponent/StoreContext';
import {getProfileInformation} from '../../data_manager';

const OrderConfirm = ({navigation}) => {
  const [driverDetails, setDriverDetails] = useState(null); // Initialize with null
  const {userDetails} = useUserDetails();
  const {placedOrderDetails} = usePlacedOrderDetails();
  const [showCopiedOrderIdMessage, setShowCopiedOrderIdMessage] =
    useState(false);
  const [showCopiedOtpMessage, setShowCopiedOtpMessage] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState(60 * 30); // 30 minutes in seconds

  const handleCopyOrderId = () => {
    Clipboard.setString(placedOrderDetails[0]?.order_number || '');
    setShowCopiedOrderIdMessage(true);
    setTimeout(() => {
      setShowCopiedOrderIdMessage(false);
    }, 2000);
  };

  const handleCopyOtp = () => {
    Clipboard.setString(placedOrderDetails[0]?.otp || '');
    setShowCopiedOtpMessage(true);
    setTimeout(() => {
      setShowCopiedOtpMessage(false);
    }, 2000);
  };

  useEffect(() => {
    const params = {
      userRole: userDetails?.userDetails[0]?.ext_id,
      orderNumber: placedOrderDetails[0]?.order_number,
    };
    getProfileInformation(
      params,
      successResponse => {
        console.log('getProfileInformation', successResponse[0]._response);
        setDriverDetails(successResponse[0]._response);
      },
      errorResponse => {
        console.log('getProfile===>errorResponse', errorResponse);
        Alert.alert('Error Alert', successResponse[0]._response.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  }, [userDetails, placedOrderDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDeliveryTime(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer); // Stop the timer when it reaches zero
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#fff'}}>
      <View>
        <View>
          <Text style={styles.mainTitle}>Your order is on its way!</Text>
          <View style={styles.textContainer}>
            <Text style={styles.oderIdText}>Order ID: </Text>
            <TouchableOpacity onPress={handleCopyOrderId}>
              <Text style={styles.text}>
                {placedOrderDetails[0]?.order_number}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCopyOrderId}>
              <AntDesign
                name="copy1"
                size={18}
                color="#FF0058"
                style={styles.copyIcon}
              />
            </TouchableOpacity>
            {showCopiedOrderIdMessage && (
              <Text style={styles.copiedMessage}>Copied to clipboard!</Text>
            )}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.oderIdText}>OTP: </Text>
            <TouchableOpacity onPress={handleCopyOtp}>
              <Text style={styles.text}>{placedOrderDetails[0]?.otp}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCopyOtp}>
              <AntDesign
                name="copy1"
                size={18}
                color="#FF0058"
                style={styles.copyIcon}
              />
            </TouchableOpacity>
            {showCopiedOtpMessage && (
              <Text style={styles.copiedMessage}>Copied to clipboard!</Text>
            )}
          </View>
          <View
            style={[styles.textContainer, {marginBottom: 30, marginTop: 10}]}>
            <Text style={styles.oderIdText}>
              Delivery in:{' '}
              <Text style={styles.text}>{formatTime(deliveryTime)}</Text>
            </Text>
          </View>
        </View>
        <ImageBackground
          style={{width: '100%'}}
          source={require('../../image/orderConfirm-Bg.png')}>
          <View style={{paddingTop: '71%', paddingHorizontal: 20}}>
            <View style={styles.devileryMap}>
              <View style={styles.Delivering}>
                <Text style={styles.DeliveringText}>Delivering to</Text>
                <Text style={styles.subAddress}>
                  {placedOrderDetails[0]?.address}
                </Text>
              </View>
              <View>
                <Image source={require('../../image/dummyMap.png')} />
              </View>
            </View>

            <View style={styles.driverCard}>
              <View style={{position: 'relative'}}>
                <Image
                  style={{width: 60, height: 60, borderRadius: 30}}
                  source={require('../../image/driver.jpeg')}
                />
                <Image
                  style={{
                    position: 'absolute',
                    bottom: 1,
                    left: 40,
                    height: 40,
                    width: 40,
                    borderRadius: 30,
                  }}
                  source={require('../../image/Drivers-Truck.jpg')}
                />
              </View>
              <View style={{width: '40%'}}>
                <Text style={styles.driverName}>
                  {driverDetails?.deliveryBoy?.first_name || ''}{' '}
                  {driverDetails?.deliveryBoy?.last_name || ''}
                </Text>
                <Text style={styles.truckName}>
                  {driverDetails?.vehicle?.plat_no || ''}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={{marginRight: 10}}>
                  <Image source={require('../../image/chat-icon.png')} />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Image source={require('../../image/call-icon.png')} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('TrackDeiver')}
              style={styles.trackOrderBtn}>
              <Text style={styles.trackText}>Track order</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
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
    fontSize: 15,
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
    fontSize: 15,
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
    marginBottom: 80,
  },
  trackText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
});

export default OrderConfirm;
