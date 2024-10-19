import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import TrackLiveLocation from '../commonComponent/TrackLiveLocation'; // Assuming this is a custom component
import {colors} from '../../colors'; // Assuming you have a colors file
import { API } from '../../utils/constant';

const TrackDelivery = ({route, navigation}) => {
  const [remainingTime, setRemainingTime] = useState(3600); // 3600 seconds = 60 minutes
  const [currentPosition, setCurrentPosition] = useState(0); // Initialize currentPosition state
  const [driverDetails, setDriverDetails] = useState(
    route.params.driverDetails,
  );
  const [locationList, setLocationList] = useState(route.params.locationList);
  const [orderDetails, setOrderDetails] = useState(
    route.params.placedOrderDetails,
  );

  // Number of steps in the step indicator
  const stepCount = 4;

  // Labels for each step in the step indicator
  const labels = [
    'A driver is assigned to you!',
    'The company is preparing your order',
    'Your order has been picked up for delivery',
    'Order arriving soon!',
  ];

  console.log('routes', route);

  // Custom styles for the step indicator
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
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 12,
    currentStepLabelColor: '#fe7013',
  };

  // useEffect to update remaining time every second
  useEffect(() => {
    const timer = setTimeout(() => {
      if (remainingTime > 0) {
        setRemainingTime(prevTime => prevTime - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [remainingTime]);

  // Function to format time as hh:mm:ss
  const formatTime = time => (time < 10 ? `0${time}` : time);

  // Calculate hours, minutes, seconds from remainingTime
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  return (
    <View style={{flex: 1, backgroundColor: '#FBFAF5'}}>
      <View style={{height: '60%', position: 'relative'}}>
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
          {/* Step Indicator */}
          <View style={{marginVertical: 20}}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={labels}
              stepCount={stepCount}
              onPress={position => setCurrentPosition(position)}
            />
          </View>

          {/* Driver Info Card */}
          <View style={styles.driverCard}>
            <View style={{position: 'relative'}}>
              {driverDetails?.deliveryBoy?.profile_pic ? (
                <Image
                  style={{width: 60, height: 60, borderRadius: 30}}
                  source={{
                    uri:
                      API.viewImageUrl + driverDetails.deliveryBoy.profile_pic,
                  }}
                />
              ) : (
                <Image
                  style={{width: 60, height: 60, borderRadius: 30}}
                  source={require('../../image/driver.jpeg')}
                />
              )}
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
                {driverDetails?.deliveryBoy?.first_name +
                  ' ' +
                  driverDetails?.deliveryBoy?.last_name}
              </Text>
              <Text style={styles.truckName}>
                {driverDetails?.vehicle?.plat_no}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 10}}>
                <Image source={require('../../image/chat-icon.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('PickupDeliveryCompleted')}>
                <Image source={require('../../image/call-icon.png')} />
              </TouchableOpacity>
            </View>
          </View>
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
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: colors.text,
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
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
    marginBottom: 15,
    marginTop: 15,
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
