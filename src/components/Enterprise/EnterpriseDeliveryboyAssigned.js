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

const EnterpriseDeliveryboyAssigned = ({navigation}) => {
  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.container}>
          <Image
            style={styles.deliveryboyProfile}
            source={require('../../image/driver.jpeg')}
          />
          <Text style={styles.maintext}>Delivery boy assigned</Text>
          <Text style={styles.deliveryboySubtitle}>
            John Doe accepted your delivery schedule
          </Text>
        </View>
      </View>
      <ImageBackground
        source={require('../../image/DeliveryRequest-bg.png')}
        style={styles.background}>
        <View style={{paddingHorizontal: 15,}}>
          <View style={styles.driversProfileInfo}>
            <Text style={styles.profileText}>John Doe’s profile:</Text>
            <View style={styles.deliveriesCardInfo}>
              <View>
                <Text style={styles.aboutDeliverys}>20</Text>
                <Text style={styles.deliverriesSubtitle}>Deliveries</Text>
              </View>

              <View>
                <Text style={styles.aboutDeliverys}>80</Text>
                <Text style={styles.deliverriesSubtitle}>Total hours</Text>
              </View>

              <View>
                <Text style={styles.aboutDeliverys}>4.9</Text>
                <Text style={styles.deliverriesSubtitle}>Rating</Text>
              </View>
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
                    <Text style={styles.requestOverviewInfo}>Total hours</Text>
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
              {/* <View style={styles.moreDetails}>
                <Text style={styles.distance}>See details</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DeliveryScheduleDetails')
                  }>
                  <AntDesign name="arrowright" size={18} color="#FF0058" />
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('EnterpriseDeliveryboyReady')}
            style={[styles.logbutton, {backgroundColor: colors.primary}]}>
            <Text style={styles.buttonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
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
    marginTop: '25%',
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
    marginBottom: 100,
  },
  buttonText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
});

export default EnterpriseDeliveryboyAssigned;
