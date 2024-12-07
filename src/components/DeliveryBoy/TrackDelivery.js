import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors} from '../../colors';
import StepIndicator from 'react-native-step-indicator';
import TrackLiveLocation from '../commonComponent/TrackLiveLocation';

const TrackDelivery = ({navigation}) => {
  const [remainingTime, setRemainingTime] = useState(3600); // 3600 seconds = 60 minutes
  const [currentPosition, setCurrentPosition] = useState(0); // Initialize currentPosition state
  const stepCount = 3;

  const labels = ['Going to pickup', 'Picked up order', 'Delivered order'];

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (remainingTime > 0) {
        setRemainingTime(prevTime => prevTime - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [remainingTime]);

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  const formatTime = time => (time < 10 ? `0${time}` : time);

  const handleGoingToPickup = () => {
    setCurrentPosition(1); // Update currentPosition to indicate the first step is completed
  };

  const handlePickedUpOrder = () => {
    setCurrentPosition(2); // Update currentPosition to indicate the second step is completed
  };

  const handleDeliveredOrder = () => {
    setCurrentPosition(3); // Update currentPosition to indicate all steps are completed
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FBFAF5'}}>
      <View style={{height: 300, position: 'relative'}}>
        {/* Assuming TrackLiveLocation is a custom component */}
        <TrackLiveLocation />
      </View>

      <ScrollView>
        <View style={styles.dateCard}>
          <View style={styles.borderCard}>
            <View style={styles.borderShowOff} />
            <Text style={styles.timerText}>
              {`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
                seconds,
              )}`}
            </Text>
            <Text style={styles.timeText}>Total time elapsed</Text>
          </View>
          <View style={{marginVertical: 10,}}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={labels}
              stepCount={stepCount} // Pass stepCount as a prop
            />
          </View>
          <View style={styles.driverCard}>
            <View style={{position: 'relative'}}>
              <Image
                style={{width: 60, height: 60, borderRadius: 30}}
                source={require('../../image/PickupDeliveryboy.jpeg')}
              />
            </View>
            <View style={{width: '50%'}}>
              <Text style={styles.driverName}>Cristofer Carder</Text>
              <Text style={styles.truckName}>
                1901 Thornridge Cir. Shiloh, California
              </Text>
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

          {currentPosition === 0 && (
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={handleGoingToPickup}>
              <Text style={styles.continueText}>Going to pickup</Text>
            </TouchableOpacity>
          )}

          {currentPosition === 1 && (
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={handlePickedUpOrder}>
              <Text style={styles.continueText}>Picked up order!</Text>
            </TouchableOpacity>
          )}

          {currentPosition === 2 && (
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={handleDeliveredOrder}>
              <Text style={styles.continueText}>Delivered order</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dateCard: {
    backgroundColor: colors.white,
    padding: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 0.0625},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5,
  },
  borderCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderShowOff: {
    width: 50,
    borderWidth: 2,
    borderColor: '#9E9E9E',
    borderRadius: 10,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: colors.text,
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  continueText: {
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    textAlign: 'center',
  },
  continueBtn: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
    marginVertical: 15,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#0000001A',
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 0.0625},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5,
    marginBottom: 5,
    marginTop: 5,
  },
  driverName: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
  },
  truckName: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
});

export default TrackDelivery;
