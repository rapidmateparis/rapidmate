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
  Dimensions,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GoogleMapScreen from '../commonComponent/MapAddress';
import {colors} from '../../colors';

const {height: screenHeight} = Dimensions.get('window');

const EnterpriseOrderPickup = ({navigation}) => {
  const orderId = '9AS68D7G698GH';
  const otp = '123456';
  const [showCopiedOrderIdMessage, setShowCopiedOrderIdMessage] =
    useState(false);
  const [showCopiedOtpMessage, setShowCopiedOtpMessage] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState(60 * 30); // 30 minutes in seconds

  const handleCopyOrderId = () => {
    Clipboard.setString(orderId);
    setShowCopiedOrderIdMessage(true);
    setTimeout(() => {
      setShowCopiedOrderIdMessage(false);
    }, 2000);
  };

  const handleCopyOtp = () => {
    Clipboard.setString(otp);
    setShowCopiedOtpMessage(true);
    setTimeout(() => {
      setShowCopiedOtpMessage(false);
    }, 2000);
  };

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
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
      <ImageBackground
          style={{flex: 1, height: screenHeight}}
          source={require('../../image/DeliveryRequest-bg.png')}>
          <Text style={styles.mainTitle}>
            Delivery boy is on the way to pick your order up
          </Text>
          <View style={styles.textContainer}>
            <Text style={styles.oderIdText}>Order ID: </Text>
            <TouchableOpacity onPress={handleCopyOrderId}>
              <Text style={styles.text}>{orderId}</Text>
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
              <Text style={styles.text}>{otp}</Text>
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
            style={[styles.textContainer, {marginBottom: 20,}]}>
            <Text style={styles.oderIdText}>
              Delivery in:{' '}
              <Text style={styles.text}>{formatTime(deliveryTime)}</Text>
            </Text>
          </View>
            <View style={styles.boxCard}>
                <Image source={require('../../image/Delivery-Box-Imga.png')}/>
                <Image style={styles.cloud1} source={require('../../image/Cloud-Graphic.png')}/>
                <Image style={styles.cloud2} source={require('../../image/Cloud-Graphic.png')}/>
            </View>
          <View style={{paddingTop: 30, paddingHorizontal: 20}}>
            <View style={styles.devileryMap}>
              <View style={styles.Delivering}>
                <Text style={styles.DeliveringText}>Pickup from</Text>
                <Text style={styles.subAddress}>
                  1901 Thornridge Cir. Shiloh, California
                </Text>
              </View>
              <View>
                <Image source={require('../../image/dummyMap.png')} />
              </View>
            </View>

            <View style={styles.driverCard}>
              <View style={{position: 'relative'}}>
                <Image
                  style={{width: 50, height: 50, borderRadius: 30}}
                  source={require('../../image/driver.jpeg')}
                />
                <Image
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 30,
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                  }}
                  source={require('../../image/Drivers-Truck.jpg')}
                />
              </View>
              <View style={{width: '48%'}}>
                <Text style={styles.driverName}>John Doe</Text>
                <Text style={styles.truckName}>VOLVO FH16 2022</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={{marginRight: 10}}>
                  <Image style={{width: 35, height: 35,}} source={require('../../image/chat-icon.png')} />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Image style={{width: 35, height: 35,}} source={require('../../image/call-icon.png')} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('EnterpriseOrderDelivering')} style={styles.trackOrderBtn}>
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
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
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
    paddingTop: 20,
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
});

export default EnterpriseOrderPickup;
