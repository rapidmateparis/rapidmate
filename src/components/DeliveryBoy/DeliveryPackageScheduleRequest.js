import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import SwipeButtonComponent from '../commonComponent/SwipeButton';

const DeliveryPackageScheduleRequest = ({navigation}) => {
  const [deliveryTime, setDeliveryTime] = useState(90 * 60); // 90 minutes in seconds

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
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View>
        <View style={styles.container}>
          <Image
            style={styles.loaderMap}
            source={require('../../image/Big-Calender.png')}
          />
          <Text style={styles.maintext}>New schedule request!</Text>
          <Text style={styles.subText}>
            Accept or reject in:{' '}
            <Text style={styles.timerCount}>{formatTime(deliveryTime)}</Text>
          </Text>
        </View>
        <ImageBackground
          source={require('../../image/DeliveryRequest-bg.png')}
          style={styles.background}>
          <View style={styles.addressCard}>
            <View style={styles.devileryMap}>
              <View style={styles.Delivering}>
                <View style={{padding: 15,}}>
                  <Text style={styles.DeliveringText}>Company Name</Text>
                  <Text style={styles.subAddress}>
                    1901 Thornridge Cir. Shiloh, California
                  </Text>
                  <Text style={styles.distance}>0.3 km away</Text>
                </View>
              </View>
              <View>
                <Image
                  style={styles.mapAddress}
                  source={require('../../image/dummyMap.png')}
                />
              </View>
            </View>

            <View style={styles.devileryMap}>
              <View style={styles.Delivering}>
                <View style={{padding: 15}}>
                  <Text style={styles.DeliveringText}>Schedule overview:</Text>
                  <View style={styles.overViewCard}>
                    <View>
                      <Text style={styles.requestOverview}>20</Text>
                      <Text style={styles.requestOverviewInfo}>Total days</Text>
                    </View>

                    <View>
                      <Text style={styles.requestOverview}>80</Text>
                      <Text style={styles.requestOverviewInfo}>
                        Total hours
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.requestOverview}>
                        €<Text>2.3k</Text>
                      </Text>
                      <Text style={styles.requestOverviewInfo}>
                        Aprox earning
                      </Text>
                    </View>
                  </View>

                  <View>
                    <View style={styles.scheduleDateTimeCard}>
                      <Text style={styles.schaduleInfo}>
                        From{' '}
                        <Text style={styles.schaduleDateTime}>
                          20-02-24, 10 AM
                        </Text>
                      </Text>
                      <View style={styles.borderShowoff} />
                      <Text style={styles.schaduleInfo}>
                        From{' '}
                        <Text style={styles.schaduleDateTime}>
                          20-02-24, 10 AM
                        </Text>
                      </Text>
                    </View>
                    <Text style={styles.timeSlotDetails}>
                      Some days have different time slots, please see details!
                    </Text>
                  </View>
                </View>
                <View style={styles.moreDetails}>
                  <Text style={styles.distance}>See details</Text>
                  <TouchableOpacity  onPress={() => navigation.navigate('DeliveryScheduleDetails')}>
                    <AntDesign name="arrowright" size={18} color="#FF0058" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <SwipeButtonComponent />
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  maintext: {
    color: colors.text,
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  subText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  timerCount: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  cancelRequest: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  devileryMap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
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
    marginTop: 10,
  },
  Delivering: {
    flex: 1,
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
    marginVertical: 3,
  },
  addressCard: {
    marginTop: 30,
    paddingHorizontal: 15,
  },
  distance: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
  },
  mapAddress: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
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
  overViewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  borderShowoff: {
    borderWidth: 0.5,
    borderColor: '#000',
    borderStyle: 'dashed',
    width: 20,
    marginHorizontal: 5,
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
  scheduleDateTimeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
});

export default DeliveryPackageScheduleRequest;
