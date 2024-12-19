import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  BackHandler,
} from 'react-native';
import {colors} from '../../colors';

const PaymentSuccess = ({navigation, route}) => {
  const params = route.params;

  useEffect(() => {
    // Disable hardware back button
    const onBackPress = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    // Automatically navigate after 3 seconds
    const timer = setTimeout(() => {
      if (params.serviceTypeId === 1) {
        navigation.navigate('ScheduleOrderSuccess', {
          schedule_date_time: params.schedule_date_time,
          serviceTypeId: params.serviceTypeId,
        });
      } else {
        navigation.navigate('LoaderForDriver');
      }
    }, 3000);

    return () => {
      backHandler.remove();
      clearTimeout(timer);
    };
  }, [navigation, params]);

  return (
    <ScrollView
      style={{width: '100%', height: '100%', backgroundColor: '#FBFAF5'}}
      contentContainerStyle={styles.scrollViewContainer}>
      <View
        style={{
          width: 350,
          height: 500,
          position: 'relative',
        }}>
        <View style={styles.container}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../../image/payment_success.png')}
          />
          <Text style={styles.text}>Payment Successful!</Text>
          <Text style={styles.subText}>
            Your payment was successful, let’s look for a delivery boy now...
          </Text>
        </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  text: {
    color: colors.text,
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 30,
    marginBottom: 5,
    textAlign: 'center',
  },
  subText: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    paddingHorizontal: 50,
  },
});

export default PaymentSuccess;
