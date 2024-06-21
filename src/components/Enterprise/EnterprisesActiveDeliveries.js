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
import Ionicons from 'react-native-vector-icons/Ionicons';
import CancellationModal from '../commonComponent/CancellationModal';
import {colors} from '../../colors';
import SwipeButtonComponent from '../commonComponent/SwipeButton';

const EnterprisesActiveDeliveries = ({navigation}) => {
  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.driversProfileInfo}>
          <View style={styles.pickupAddressCard}>
            <Ionicons name="location-outline" size={20} color="#000" />
            <Text style={styles.pickupAddressText}>
              3891 Ranchview , California 62639
            </Text>
          </View>

          <View style={styles.dropAddressCard}>
            <MaterialIcons name="my-location" size={20} color="#000" />
            <Text style={styles.pickupAddressText}>
              1901 Thornridge Cir. Shiloh, California
            </Text>
          </View>
          <View style={styles.deliveryActions}>
            <View>
              <Text style={styles.distance}>2.6 km</Text>
              <Text style={styles.totalDistance}>Total distance</Text>
            </View>

            <View>
              <Text style={styles.distance}>1.2 hrs</Text>
              <Text style={styles.totalDistance}>Time required</Text>
            </View>
          </View>
          <Text style={[styles.deliveryStatus, {color: colors.Pending,}]}>Pending</Text>
        </View>

        <View style={styles.driversProfileInfo}>
          <View style={styles.pickupAddressCard}>
            <Ionicons name="location-outline" size={20} color="#000" />
            <Text style={styles.pickupAddressText}>
              3891 Ranchview , California 62639
            </Text>
          </View>

          <View style={styles.dropAddressCard}>
            <MaterialIcons name="my-location" size={20} color="#000" />
            <Text style={styles.pickupAddressText}>
              1901 Thornridge Cir. Shiloh, California
            </Text>
          </View>
          <View style={styles.deliveryActions}>
            <View>
              <Text style={styles.distance}>2.6 km</Text>
              <Text style={styles.totalDistance}>Total distance</Text>
            </View>

            <View>
              <Text style={styles.distance}>1.2 hrs</Text>
              <Text style={styles.totalDistance}>Time required</Text>
            </View>
          </View>
          <Text style={[styles.deliveryStatus, {color: colors.CuriousBlue,}]}>In progress</Text>
        </View>

        <View style={styles.driversProfileInfo}>
          <View style={styles.pickupAddressCard}>
            <Ionicons name="location-outline" size={20} color="#000" />
            <Text style={styles.pickupAddressText}>
              3891 Ranchview , California 62639
            </Text>
          </View>

          <View style={styles.dropAddressCard}>
            <MaterialIcons name="my-location" size={20} color="#000" />
            <Text style={styles.pickupAddressText}>
              1901 Thornridge Cir. Shiloh, California
            </Text>
          </View>
          <View style={styles.deliveryActions}>
            <View>
              <Text style={styles.distance}>2.6 km</Text>
              <Text style={styles.totalDistance}>Total distance</Text>
            </View>

            <View>
              <Text style={styles.distance}>1.2 hrs</Text>
              <Text style={styles.totalDistance}>Time required</Text>
            </View>
          </View>
          <Text style={[styles.deliveryStatus, {color: colors.Completed,}]}>Complete</Text>
        </View>
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
    marginTop: 15,
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
  pickupAddressCard: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  pickupAddressText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 5,
  },
  dropAddressCard: {
    flexDirection: 'row',
  },
  deliveryActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  distance: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
  },
  totalDistance: {
    fontSize: 12,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  deliveryStatus: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    backgroundColor: '#F39C1212',
    padding: 5,
    borderRadius: 10,
    width: 85,
    textAlign: 'center',
  },
});

export default EnterprisesActiveDeliveries;
