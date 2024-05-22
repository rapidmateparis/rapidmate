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
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CancellationModal from '../commonComponent/CancellationModal';
import {colors} from '../../colors';

const DeliveryPackageRequest = ({navigation}) => {
  const [deliveryTime, setDeliveryTime] = useState(60 * 30); // 30 minutes in seconds

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
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View>
        <View style={styles.container}>
          <Image
            style={styles.loaderMap}
            source={require('../../image/Big-Package.png')}
          />
          <Text style={styles.maintext}>New delivery request!</Text>
          <Text style={styles.subText}>
            Delivery in:{' '}
            <Text style={styles.timerCount}>{formatTime(deliveryTime)}</Text>
          </Text>
        </View>
        <ImageBackground
          source={require('../../image/DeliveryRequest-bg.png')}
          style={styles.background}>
          <View style={styles.addressCard}>
            <View style={styles.devileryMap}>
              <View style={styles.Delivering}>
                <Text style={styles.DeliveringText}>Pickup from</Text>
                <Text style={styles.subAddress}>
                  1901 Thornridge Cir. Shiloh, California
                </Text>
                <Text style={styles.distance}>0.3 km away</Text>
              </View>
              <View>
                <Image style={styles.mapAddress} source={require('../../image/dummyMap.png')} />
              </View>
            </View>

            <View style={styles.devileryMap}>
              <View style={styles.Delivering}>
                <Text style={styles.DeliveringText}>Deliver to</Text>
                <Text style={styles.subAddress}>
                  1901 Thornridge Cir. Shiloh, California
                </Text>
                <Text style={styles.distance}>2.5 km away from pickup</Text>
              </View>
              <View>
                <Image style={styles.mapAddress} source={require('../../image/dummyMap.png')} />
              </View>
            </View>
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
    height: 600,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 80,
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
  requestTouch: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    paddingHorizontal: 90,
    paddingVertical: 10,
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
    marginVertical: 3,
  },
  addressCard: {
    marginTop: 120,
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
});

export default DeliveryPackageRequest;
