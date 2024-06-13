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
} from 'react-native';
import {colors} from '../../colors';
import SwipeButton from 'rn-swipe-button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StopShift from '../../image/stop-25.png';

const DeliveryboyShiftStaredRequest = ({navigation}) => {
  const [disableCBButton, setDisableCBButton] = useState(false);
  const defaultStatusMessage = 'Swipe to accept the request';
  const [swipeStatusMessage, setSwipeStatusMessage] =
    useState(defaultStatusMessage);
  const [forceResetLastButton, setForceResetLastButton] = useState(null);

  useEffect(() => {
    const interval = setInterval(
      () => setSwipeStatusMessage(defaultStatusMessage),
      5000,
    );
    return () => clearInterval(interval);
  }, [defaultStatusMessage]);

  const updateSwipeStatusMessage = message => setSwipeStatusMessage(message);
  const [timer, setTimer] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    centiseconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newCentiseconds = timer.centiseconds + 1;
      if (newCentiseconds === 100) {
        const newSeconds = timer.seconds + 1;
        if (newSeconds === 60) {
          const newMinutes = timer.minutes + 1;
          if (newMinutes === 60) {
            const newHours = timer.hours + 1;
            setTimer({
              ...timer,
              hours: newHours,
              minutes: 0,
              seconds: 0,
              centiseconds: 0,
            });
          } else {
            setTimer({
              ...timer,
              minutes: newMinutes,
              seconds: 0,
              centiseconds: 0,
            });
          }
        } else {
          setTimer({...timer, seconds: newSeconds, centiseconds: 0});
        }
      } else {
        setTimer({...timer, centiseconds: newCentiseconds});
      }
    }, 10);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.timerTextCard}>
          <Text
            style={[
              styles.timerText,
              {fontFamily: 'monospace', width: '100%'},
            ]}>
            {`${timer.hours.toString().padStart(2, '0')}:${timer.minutes
              .toString()
              .padStart(2, '0')}:${timer.seconds
              .toString()
              .padStart(2, '0')}:${timer.centiseconds
              .toString()
              .padStart(2, '0')}`}
          </Text>
          <Text style={styles.elapsedTime}>Shift elapsed time</Text>
        </View>

        <Text style={styles.deliveryRequestStatus}>
          Company delivery requests (1)
        </Text>

        <View style={styles.requestsCard}>
          <View style={styles.locationDetails}>
            <EvilIcons name="location" size={25} color="#000" />
            <Text style={styles.locationName}>
              3891 Ranchview , California 62639
            </Text>
          </View>

          <View style={styles.locationDetails}>
            <MaterialIcons
              style={{marginHorizontal: 3}}
              name="my-location"
              size={20}
              color="#000"
            />
            <Text style={styles.locationName}>
              1901 Thornridge Cir. Shiloh, California
            </Text>
          </View>

          <View style={styles.distanceTimeCard}>
            <View>
              <Text style={styles.distanceAbout}>2.6 km</Text>
              <Text style={styles.totalDistance}>Total distance</Text>
            </View>
            <View>
              <Text style={styles.distanceAbout}>1.2 hrs</Text>
              <Text style={styles.totalDistance}>Time required</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.footerCradRequest}>
          <Text style={styles.footerRequestTexts}>Start delivery</Text>
          <AntDesign
            style={{marginHorizontal: 2}}
            name="arrowright"
            size={20}
            color="#FF0058"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.swipeBt}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.container}>
            <Text style={styles.swipeInfo}>
              If you are at company’s location and ready to start the shift,
              please swipe below!
            </Text>
            <Text style={styles.swipeStatus}>{swipeStatusMessage}</Text>
            <SwipeButton
              onSwipeFail={() => updateSwipeStatusMessage('Incomplete swipe!')}
              onSwipeStart={() => updateSwipeStatusMessage('Swipe started!')}
              onSwipeSuccess={() =>
                updateSwipeStatusMessage('Request rejected')
              }
              thumbIconImageSource={StopShift}
              railBackgroundColor="#BA1A1A0A"
              railStyles={{
                backgroundColor: '#BA1A1A0A',
                borderColor: '#BA1A1A',
              }}
              thumbIconBackgroundColor="#E21B1B"
              thumbIconStyles={{padding: 0, width: 0, borderWidth: 0}}
              thumbIconWidth={50}
              title={
                <View style={styles.swipeTitleComp}>
                  <Text>Swipe to end shift</Text>
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
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  requestsCard: {
    borderRadius: 8,
    padding: 15,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginTop: 15,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.subText,
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 30,
    marginBottom: 5,
    textAlign: 'center',
  },
  subText: {
    color: colors.subText,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  container: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 40,
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 0.0625},
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
    marginTop: 20,
  },
  deliveryRequestStatus: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    marginTop: 20,
  },
  timerText: {
    fontSize: 40,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    marginTop: 20,
    color: colors.text,
  },
  timerTextCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elapsedTime: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.subText,
    marginBottom: 20,
  },
  locationDetails: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  locationName: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    width: '95%',
  },
  distanceAbout: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  totalDistance: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  distanceTimeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  footerCradRequest: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#fff2f6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  footerRequestTexts: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
  },
});

export default DeliveryboyShiftStaredRequest;
