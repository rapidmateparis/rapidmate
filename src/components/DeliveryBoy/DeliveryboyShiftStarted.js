import React, {useCallback, useEffect, useState} from 'react';
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
import StopShift from '../../image/stop-25.png';

const DeliveryboyShiftStarted = ({navigation}) => {
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
  const [startTimerChange, setStartTimerChange] = useState(true);
  const [timer, setTimer] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    centiseconds: 0,
  });

  const runTimer = useCallback(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        const newCentiseconds = prevTimer.centiseconds + 1;
        if (newCentiseconds === 100) {
          const newSeconds = prevTimer.seconds + 1;
          if (newSeconds === 60) {
            const newMinutes = prevTimer.minutes + 1;
            if (newMinutes === 60) {
              const newHours = prevTimer.hours + 1;
              return {
                ...prevTimer,
                hours: newHours,
                minutes: 0,
                seconds: 0,
                centiseconds: 0,
              };
            } else {
              return {
                ...prevTimer,
                minutes: newMinutes,
                seconds: 0,
                centiseconds: 0,
              };
            }
          } else {
            return {
              ...prevTimer,
              seconds: newSeconds,
              centiseconds: 0,
            };
          }
        } else {
          return {
            ...prevTimer,
            centiseconds: newCentiseconds,
          };
        }
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (startTimerChange) {
      const cleanup = runTimer();
      return cleanup;
    }
  }, [startTimerChange]);

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FFF'}}>
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
          Company delivery requests (0)
        </Text>
      </View>
      <View style={styles.scrollViewContainer}>
        <View style={{width: 350, position: 'relative'}}>
          <View style={styles.containerPic}>
            <Image
              style={styles.loaderMap}
              source={require('../../image/undraw_no_data.png')}
            />
            <Text style={styles.text}>No pending delivery</Text>
            <Text style={styles.subText}>
              If there is any active order, it will be shown here..
            </Text>
          </View>
        </View>
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
              onSwipeFail={() => {
                updateSwipeStatusMessage('Incomplete swipe!');
                setStartTimerChange(true);
              }}
              onSwipeStart={() => {
                updateSwipeStatusMessage('Swipe started!');
                setStartTimerChange(false);
              }}
              onSwipeSuccess={() => {
                updateSwipeStatusMessage('Request rejected');
                navigation.navigate('DeliveryboyShiftStaredRequest');
              }}
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
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerPic: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 80,
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
    marginTop: '30%',
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
});

export default DeliveryboyShiftStarted;
