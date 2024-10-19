import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Platform,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../colors';
import MapDeliveryDetails from '../commonComponent/MapDeliveryDetails';
import {downloadInvoiceOrder, getLocationById} from '../../data_manager';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import {API} from '../../utils/constant';
import FileViewer from 'react-native-file-viewer';
import {useLoader} from '../../utils/loaderContext';

const DeliveryboyMainDeliveryDetails = ({route, navigation}) => {
  const {setLoading} = useLoader();
  const [orderDetails, setOrderDetails] = useState(route.params.orderItem);
  const [pickUpLocation, setPickUpLocation] = useState({});
  const [dropOffLocation, setDropOffLocation] = useState({});

  useEffect(() => {
    getLocationInfoById(orderDetails.pickup_location_id, 0);
    getLocationInfoById(orderDetails.dropoff_location_id, 1);
  }, []);

  const downloadInvoiceFile = async () => {
    setLoading(true);
    try {
      const successResponse = await new Promise((resolve, reject) => {
        downloadInvoiceOrder(orderDetails.order_number, resolve, reject);
      });

      const invoiceData = successResponse;
      const filePath =
        Platform.OS === 'android'
          ? `${RNFS.ExternalDirectoryPath}/invoice_${orderDetails.order_number}.pdf`
          : `${RNFS.DocumentDirectoryPath}/invoice_${orderDetails.order_number}.pdf`;

      // Convert binary data to base64
      const base64Data = Buffer.from(invoiceData, 'binary').toString('base64');

      // Write the file to the document directory
      await RNFS.writeFile(filePath, base64Data, 'base64');

      // Verify the file exists
      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        Alert.alert('Success', 'Invoice saved successfully.', [
          {
            text: 'Open Invoice',
            onPress: () => {
              openPDFWithNativeViewer(filePath);
            },
          },
        ]);
        console.log('Invoice saved to: ', filePath);
      } else {
        Alert.alert('Error', 'Failed to save invoice file.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save invoice file.');
      console.error('File saving error:', error);
    } finally {
      setLoading(false);
    }
  };

  const openPDFWithNativeViewer = async filePath => {
    const fileExists = await RNFS.exists(filePath);

    if (fileExists) {
      FileViewer.open(filePath)
        .then(() => {})
        .catch(error => {
          Alert.alert('Error', 'Unable to open file: ' + error);
        });
    } else {
      Alert.alert('Error', 'File not found');
    }
  };

  const getLocationInfoById = async (locationId, locationType) => {
    setLoading(true);
    getLocationById(
      locationId,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          locationType == 0
            ? setPickUpLocation(successResponse[0]._response[0])
            : setDropOffLocation(successResponse[0]._response[0]);
        }
      },
      errorResponse => {
        setLoading(false);
        console.log('destination==>errorResponse', errorResponse[0]);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={{width: '100%', height: 250}}>
          <MapDeliveryDetails
            addressData={{
              sourceAddress: pickUpLocation,
              destinationAddress: dropOffLocation,
            }}
          />
        </View>

        <View style={styles.packageCard}>
          <Image
            style={styles.packageManager}
            source={require('../../image/Pickup-Package-Icon.png')}
          />
          <View style={{marginLeft: 10}}>
            <Text style={styles.dropInfo}>Pickup information</Text>
            <Text style={styles.companyInfo}>
              {orderDetails.company_name
                ? orderDetails.company_name
                : 'Company Name'}
            </Text>
            <Text style={styles.dropInfo}>
              {pickUpLocation.address}, {pickUpLocation.city},{' '}
              {pickUpLocation.state}
            </Text>
          </View>
        </View>

        <View style={styles.packageCard}>
          <Image
            style={styles.packageManager}
            source={require('../../image/package-img.png')}
          />
          <View style={{marginLeft: 10}}>
            <Text style={styles.dropInfo}>Drop off information</Text>
            <Text style={styles.companyInfo}>Company Name</Text>
            <Text style={styles.dropInfo}>
              {dropOffLocation.address}, {dropOffLocation.city},{' '}
              {dropOffLocation.state}
            </Text>
          </View>
        </View>

        <View style={styles.invoiceCard}>
          <View>
            <Image source={require('../../image/order-fare.png')} />
          </View>
          <View style={{marginLeft: 10}}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderFare}>Order fare</Text>
              <Text style={styles.totalmoney}>€ {orderDetails.amount}</Text>
            </View>

            <Text style={styles.travel}>
              Travelled{' '}
              {orderDetails.distance
                ? orderDetails.distance.toFixed(2)
                : '0.00'}{' '}
              km in{' '}
              {orderDetails.total_duration ? orderDetails.total_duration : '00'}
            </Text>

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>Order fare</Text>
              <Text style={styles.value}>
                €{' '}
                {orderDetails.order_amount
                  ? orderDetails.order_amount.toFixed(2)
                  : '0.00'}
              </Text>
            </View>

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>Waiting</Text>
              <Text style={styles.value}>
                €{' '}
                {orderDetails.waiting_fare
                  ? orderDetails.waiting_fare.toFixed(2)
                  : '0.00'}
              </Text>
            </View>

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>Promo</Text>
              <Text style={styles.value}>
                {orderDetails.promo_value ? orderDetails.promo_value : '0%'}
              </Text>
            </View>

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>Amount charged</Text>
              <Text style={styles.value}>
                €{' '}
                {orderDetails.amount ? orderDetails.amount.toFixed(2) : '0.00'}
              </Text>
            </View>

            <View style={styles.masterCard}>
              <Image source={require('../../image/logos_mastercard.png')} />
              <Text style={styles.paidWith}>
                Paid with {orderDetails.paid_with ? orderDetails.paid_with : ''}
              </Text>
            </View>
          </View>
        </View>
        {console.log(orderDetails)}
        <View style={styles.packageInformationCard}>
          <Text style={styles.packageTitle}>Package information</Text>
          <Text style={styles.orderdetails}>
            Order ID:{' '}
            <Text style={styles.detailsId}>
              {orderDetails.package_id ? orderDetails.package_id : ''}
            </Text>
          </Text>
          <Text style={styles.orderdetails}>
            Comments:{' '}
            <Text style={styles.detailsId}>
              {orderDetails.pickup_notes ? orderDetails.pickup_notes : ''}
            </Text>
          </Text>
          <Text style={styles.orderdetails}>
            Vehicle:{' '}
            <Text style={styles.detailsId}>
              {orderDetails.vehicle_type_id ? orderDetails.vehicle_type_id : ''}
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.packageInvoiceCard}
          onPress={downloadInvoiceFile}>
          <View style={styles.invoiceCardBtn}>
            <FontAwesome5 name="file-invoice" size={20} color="#FF0058" />

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
  invoiceCardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 10,
    marginTop: 10,
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
    marginBottom: 20,
    marginTop: 0,
  },
  packageManager: {
    width: 30,
    height: 30,
  },
});

export default DeliveryboyMainDeliveryDetails;
