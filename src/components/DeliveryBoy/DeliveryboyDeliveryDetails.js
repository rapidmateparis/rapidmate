import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../colors';
import MapDeliveryDetails from '../commonComponent/MapDeliveryDetails';

const DeliveryboyDeliveryDetails = ({navigation}) => {
  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.packageCard}>
          <Image source={require('../../image/Pickup-Package-Icon.png')} />
          <View style={{marginLeft: 10}}>
            <View style={styles.pickupCardHeader}>
              <Text style={styles.dropInfo}>Pickup information</Text>
              <Image source={require('../../image/Track-Icon.png')} />
            </View>
            <View style={styles.companyInfosmain}>
              <View style={{width: '65%'}}>
                <Text style={styles.companyInfo}>Company Name</Text>
                <Text style={styles.dropInfo}>
                  22 Rue de la Liberté, Paris, Île-de-France.
                </Text>
              </View>
              <View style={styles.contactInfoIcons}>
                <TouchableOpacity style={{marginRight: 10}}>
                  <Image source={require('../../image/chat-icon.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require('../../image/call-icon.png')} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.borderShowOff} />

            <View style={styles.packageBasicInfo}>
              <Text style={styles.headingOTP}>OTP</Text>
              <Text style={styles.subheadingOTP}>123456</Text>
            </View>

            <View style={styles.borderShowOff} />

            <View style={styles.packageBasicInfo}>
              <Text style={styles.headingOTP}>When?</Text>
              <Text style={styles.subheadingOTP}>Today, 04:30 PM</Text>
            </View>

            <View style={styles.borderShowOff} />

            <View style={styles.packageBasicInfo}>
              <Text style={styles.headingOTP}>Package photo</Text>
              <Image style={styles.packagePhoto} source={require('../../image/PackagePhoto.png')}/>
            </View>

          </View>
        </View>

        <View style={styles.invoiceCard}>
          <View>
            <Image source={require('../../image/order-fare.png')} />
          </View>
          <View style={{marginLeft: 10}}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderFare}>Order fare</Text>
              <Text style={styles.totalmoney}>€34.00</Text>
            </View>

            <Text style={styles.travel}>Travelled 12 km in 32 mins</Text>

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>Order fare</Text>
              <Text style={styles.value}>€30.00</Text>
            </View>

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>Waiting</Text>
              <Text style={styles.value}>€03.00</Text>
            </View>

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>Platform fee</Text>
              <Text style={styles.value}>€01.00</Text>
            </View>

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>Amount charged</Text>
              <Text style={styles.value}>€34.00</Text>
            </View>

            <View style={styles.masterCard}>
              <Image source={require('../../image/logos_mastercard.png')} />
              <Text style={styles.paidWith}>Paid with mastercard</Text>
            </View>
          </View>
        </View>

        <View style={styles.packageInformationCard}>
          <Text style={styles.packageTitle}>Package information</Text>
          <Text style={styles.orderdetails}>
            Order ID:<Text style={styles.detailsId}>20394</Text>
          </Text>
          <Text style={styles.orderdetails}>
            Comments:
            <Text style={styles.detailsId}>
              Lorem ipsum dolor sit amet conse ctetur. Ridiculus nunc platea
              sed.
            </Text>
          </Text>
          <Text style={styles.orderdetails}>
            Vehicle:<Text style={styles.detailsId}>Pickup truck</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 7,
    marginTop: 7,
  },
  packageCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 7,
    marginTop: 7,
  },
  dropInfo: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#131314',
    marginBottom: 10,
  },
  companyInfo: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  companyAddress: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.subText,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Add this line
  },
  orderFare: {
    width: '75%',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#131314',
  },
  invoiceCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 7,
    marginTop: 7,
  },
  travel: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.subText,
    marginVertical: 5,
  },
  orderFareValue: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.subText,
    marginVertical: 5,
  },
  totalmoney: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.secondary,
  },
  value: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  masterCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paidWith: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.subText,
    marginLeft: 5,
    marginVertical: 5,
  },
  packageInformationCard: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 15,
    marginTop: 7,
  },
  packageTitle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  orderdetails: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.subText,
    marginVertical: 3,
  },
  detailsId: {
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  pickupCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactInfoIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyInfosmain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  borderShowOff: {
    borderWidth: 1,
    borderColor: '#f1f1f1',
    marginVertical: 10,
  },
  packageBasicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingOTP: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  subheadingOTP: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  packagePhoto: {
    width: 45,
  },
});

export default DeliveryboyDeliveryDetails;
