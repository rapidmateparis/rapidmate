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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../colors';
import MapDeliveryDetails from '../commonComponent/MapDeliveryDetails';

const DeliveryDetailsMultipleInvoice = ({navigation}) => {
  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={{width: '100%', height: 250}}>
          <MapDeliveryDetails />
        </View>

        <View style={styles.packageCard}>
          <Image source={require('../../image/Pickup-Package-Icon.png')} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.dropInfo}>Pickup 1 information</Text>
            <Text style={styles.companyInfo}>Company Name</Text>
            <Text style={styles.dropInfo}>
              22 Rue de la Liberté, Paris, Île-de-France.
            </Text>
          </View>
        </View>

        <View style={styles.packageCard}>
          <Image source={require('../../image/package-img.png')} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.dropInfo}>Drop off 1 information</Text>
            <Text style={styles.companyInfo}>Company Name</Text>
            <Text style={styles.dropInfo}>
              22 Rue de la Liberté, Paris, Île-de-France.
            </Text>
          </View>
        </View>

        <View style={styles.packageCard}>
          <Image source={require('../../image/Pickup-Package-Icon.png')} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.dropInfo}>Pickup 2 information</Text>
            <Text style={styles.companyInfo}>Company Name</Text>
            <Text style={styles.dropInfo}>
              22 Rue de la Liberté, Paris, Île-de-France.
            </Text>
          </View>
        </View>

        <View style={styles.packageCard}>
          <Image source={require('../../image/package-img.png')} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.dropInfo}>Drop off 2 information</Text>
            <Text style={styles.companyInfo}>Company Name</Text>
            <Text style={styles.dropInfo}>
              22 Rue de la Liberté, Paris, Île-de-France.
            </Text>
          </View>
        </View>

        <View style={styles.invoiceMainCard}>
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
            Order ID: <Text style={styles.detailsId}>20394</Text>
          </Text>
          <Text style={styles.orderdetails}>
            Comments:{' '}
            <Text style={styles.detailsId}>
              Lorem ipsum dolor sit amet conse ctetur. Ridiculus nunc platea
              sed.
            </Text>
          </Text>
          <Text style={styles.orderdetails}>
            Vehicle: <Text style={styles.detailsId}>Pickup truck</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.packageInvoiceCard}>
          <View style={styles.invoiceCard}>
            <FontAwesome5
              name="file-invoice"
              size={20}
              color="#FF0058"
            />

            <Text style={styles.downloadInvoiceText}>Download invoice</Text>
          </View>
          <View>
          <Feather
              style={{marginTop: 5}}
              name="download"
              size={20}
              color="#FF0058"
            />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  invoiceMainCard: {
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
  invoiceCard: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  downloadInvoiceText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    marginLeft: 15,
  },
  packageInvoiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingHorizontal: 10,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 20,
    marginTop: 0,
  },
});

export default DeliveryDetailsMultipleInvoice;
