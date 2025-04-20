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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CancellationModal from '../commonComponent/CancellationModal';
import {colors} from '../../colors';
import SwipeButtonComponent from '../commonComponent/SwipeButton';

const EnterpriseDeliveryboyReady = ({navigation}) => {
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
        <View style={styles.container}>
          <View style={styles.profileReadyCard}>
            <Image
              style={styles.deliveryboyProfile}
              source={require('../../image/driver.jpeg')}
            />
            <View style={styles.readyCard}>
              <Text style={styles.readyforDelivery}>Ready</Text>
            </View>
          </View>
          <Text style={styles.maintext}>Delivery boy ready</Text>
          <Text style={styles.deliveryboySubtitle}>
            John Doe is at your location and ready to deliver
          </Text>
        </View>

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
          <Text style={styles.elapsedTime}>6 hours left before shift ends</Text>
        </View>

        <View style={styles.driversProfileInfo}>
          <Text style={styles.profileText}>Todays stats:</Text>
          <View style={styles.deliveriesCardInfo}>
            <View>
              <Text style={styles.aboutDeliverys}>03</Text>
              <Text style={styles.deliverriesSubtitle}>Deliveries</Text>
            </View>

            <View>
              <Text style={styles.aboutDeliverys}>1.5</Text>
              <Text style={styles.deliverriesSubtitle}>Total hours</Text>
            </View>

            <View>
              <Text style={styles.aboutDeliverys}>4.2</Text>
              <Text style={styles.deliverriesSubtitle}>Distance</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('EnterprisesActiveDeliveries')} style={styles.activeDeliveries}>
          <View style={styles.activeCount}>
            <Image style={{width: 50, height: 30,}} source={require('../../image/ExpressPackage.png')} />
            <Text style={styles.textActiveDeliveries}>
              Active deliveries <Text>(02)</Text>
            </Text>
          </View>
          <AntDesign name="arrowright" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => navigation.navigate('EnterpriseShiftRequestNewDelivery')}
          style={styles.requstDeliveryBtn}>
          <View style={styles.activeCount}>
            <Image style={{width: 50, height: 30,}} source={require('../../image/ExpressPackage.png')} />
            <Text style={styles.textActiveDeliveries}>
              Request new delivery
            </Text>
          </View>
          <AntDesign name="arrowright" size={20} color="#000" />
        </TouchableOpacity>
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
    paddingTop: 20,
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
  driversProfileInfo: {
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
    marginTop: 30,
    padding: 15,
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
    marginTop: '32%',
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
  deliveryboyProfile: {
    width: 120,
    height: 120,
    borderRadius: 80,
  },
  deliveryboySubtitle: {
    fontFamily: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  profileText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
  },
  aboutDeliverys: {
    fontSize: 24,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
  },
  deliverriesSubtitle: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
  },
  deliveriesCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
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
  overViewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
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
  borderShowoff: {
    borderWidth: 0.5,
    borderColor: '#000',
    borderStyle: 'dashed',
    width: 20,
    marginHorizontal: 5,
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
  distance: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
  },
  logbutton: {
    width: '100%',
    marginTop: '15%',
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  readyforDelivery: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.white,
    textAlign: 'center',
  },
  readyCard: {
    backgroundColor: '#27AE60',
    padding: 5,
    borderRadius: 12,
    width: 70,
    position: 'absolute',
    bottom: -15,
    left: 28,
  },
  profileReadyCard: {
    position: 'relative',
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
  activeDeliveries: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginBottom: 10,
    marginTop: 35,
  },
  textActiveDeliveries: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 10,
  },
  activeCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requstDeliveryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 40,
    backgroundColor: colors.primary,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 10,
    marginTop: 35,
  },
});

export default EnterpriseDeliveryboyReady;
