import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {colors} from '../../colors';
import ScheduledDeliverySwipe from '../commonComponent/ScheduledDeliverySwipe';
import DeliveryboyScheduleCancellationModal from './DeliveryboyScheduleCancellationModal';

const DeliveryboyScheduledDeliveryAlert = ({navigation}) => {
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
          <Text style={styles.maintext}>Scheduled delivery alert</Text>
          <Text style={styles.subText}>
            You have a scheduled delivery in
            <Text style={styles.timerCount}> 1 hour</Text>, are you ready?
          </Text>
        </View>
        <ImageBackground
          source={require('../../image/DeliveryRequest-bg.png')}
          style={styles.background}>
          <View style={styles.addressCard}>
            <View style={styles.devileryMap}>
              <View style={styles.Delivering}>
                <View style={{padding: 15}}>
                  <Text style={styles.DeliveringText}>Pickup from</Text>
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
          </View>
          <View style={{marginBottom: 40}}>
            <ScheduledDeliverySwipe/>
          </View>
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
    paddingTop: '35%',
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
    fontFamily: 'Montserrat-Bold',
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
    marginTop: '36%',
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

export default DeliveryboyScheduledDeliveryAlert;
