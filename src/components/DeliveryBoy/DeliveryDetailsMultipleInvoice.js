import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../colors';
import MapDeliveryDetails from '../commonComponent/MapDeliveryDetails';
import {useLoader} from '../../utils/loaderContext';
import {downloadInvoiceOrder, getLocationById} from '../../data_manager';
import {API} from '../../utils/constant';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {localizationText} from '../../utils/common';

const DeliveryDetailsMultipleInvoice = ({route, navigation}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const {setLoading} = useLoader();
  const [pickUpLocation, setPickUpLocation] = useState({});
  const [dropOffLocation, setDropOffLocation] = useState({});
  const pickupOTP = localizationText('Common', 'pickupOTP') || 'Pickup OTP';
  const deliveredOTP =
    localizationText('Common', 'deliveredOTP') || 'Delivered OTP';
  const totalOrderFare =
    localizationText('Common', 'totalOrderFare') || 'Total Order fare';
  const orderFare = localizationText('Common', 'orderFare') || 'Order fare';
  const travelled = localizationText('Common', 'travelled') || 'Travelled';
  const orderID = localizationText('Common', 'orderID') || 'Order ID';
  const orderDate = localizationText('Common', 'orderDate') || 'Order Date';
  const vehicleText = localizationText('Common', 'vehicle') || 'Vehicle';
  const packageInformation =
    localizationText('Main', 'packageInformation') || 'Package information';
  const amountCharged =
    localizationText('Common', 'amountCharged') || 'Amount charged';
  const paidWith = localizationText('Common', 'paidWith') || 'Paid with';
  const downloadInvoice =
    localizationText('Common', 'downloadInvoice') || 'Download invoice';
    const orderStatus =
    localizationText('Common', 'OrderStatus') || 'Status';

  useEffect(() => {
    if (route?.params?.orderItem) {
      setOrderDetails(route?.params?.orderItem);
    } else {
      setOrderDetails({});
    }
  }, []);

  useEffect(() => {
    getLocationInfoById(orderDetails.pickup_location_id, 0);
    getLocationInfoById(orderDetails.dropoff_location_id, 1);
  }, []);

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
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const downloadInvoiceFile = async () => {
    setLoading(true);
    try {
      const successResponse = await new Promise((resolve, reject) => {
        downloadInvoiceOrder(
          orderDetails.order_number,
          'deliveryboy',
          resolve,
          reject,
        );
      });

      const pdf =
        API.downloadInvoice +
        orderDetails.order_number +
        '/' +
        'deliveryboy' +
        '?show=true';
      downloadFile(pdf);
      // const invoiceData = successResponse;
      // const filePath =
      //   Platform.OS === 'android'
      //     ? `${RNFS.ExternalDirectoryPath}/invoice_${orderDetails.order_number}.pdf`
      //     : `${RNFS.DocumentDirectoryPath}/invoice_${orderDetails.order_number}.pdf`;

      // // Convert binary data to base64
      // const base64Data = Buffer.from(invoiceData, 'binary').toString('base64');

      // // Write the file to the document directory
      // await RNFS.writeFile(filePath, base64Data, 'base64');

      // // Verify the file exists
      // const fileExists = await RNFS.exists(filePath);
      // if (fileExists) {
      //   Alert.alert('Success', 'Invoice saved successfully.', [
      //     {
      //       text: 'Open Invoice',
      //       onPress: () => {
      //         openPDFWithNativeViewer(filePath);
      //       },
      //     },
      //   ]);
      //   console.log('Invoice saved to: ', filePath);
      // } else {
      //   Alert.alert('Error', 'Failed to save invoice file.');
      // }
    } catch (error) {
      Alert.alert('Error', 'Failed to save invoice file.');
      console.error('File saving error:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = pdf => {
    setLoading(true);
    let date = new Date();
    let exe = '.pdf';
    let filename =
      `invoice_${orderDetails.order_number}` +
      Math.floor(date.getTime() + date.getSeconds() / 2) +
      exe;
    const localFile = `${RNFS.DocumentDirectoryPath}${filename}`;

    const options = {
      fromUrl: pdf,
      toFile: localFile,
    };

    RNFS.downloadFile(options)
      .promise.then(() => {
        setTimeout(() => {
          FileViewer.open(localFile);
        }, 300);
      })
      .then(() => {
        setLoading(false);
        Linking.openURL(pdf);
      })
      .catch(error => {
        setLoading(false);
      });
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
            <Text style={styles.dropInfo}>
              {localizationText('Main', 'pickupInformation')}
            </Text>
            <Text style={styles.companyInfo}>{orderDetails.company_name}</Text>
            <Text style={styles.dropInfo}>{orderDetails.address}</Text>
            <Text style={styles.pickupNotes}>{orderDetails.pickup_notes}</Text>
          </View>
        </View>

        {orderDetails?.locations &&
          orderDetails?.locations.map((location, index) => {
            return (
              <View style={styles.packageCard} key={index}>
                <Image
                  style={styles.packageManager}
                  source={require('../../image/package-img.png')}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={styles.dropInfo}>{`Drop off ${
                    index + 1
                  } information`}</Text>
                  <Text style={styles.companyInfo}>
                    {location.drop_company_name}
                  </Text>
                  <Text style={styles.dropInfo}>
                    {location.destination_description}
                  </Text>
                  <Text style={styles.pickupNotes}>{location.drop_notes}</Text>
                  <View style={styles.otpHeadCard}>
                    <Text style={styles.otpTitleText}>{pickupOTP}:</Text>
                    <Text style={styles.otpText}>{location.otp}</Text>
                  </View>
                  <View style={styles.otpHeadCard}>
                    <Text style={styles.otpTitleText}>{deliveredOTP}:</Text>
                    <Text style={styles.otpText}>
                      {location.delivered_otp || 'Gendrate if completed pickup'}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}

        {/* <View style={styles.packageCard}>
          <Image
            style={styles.packageManager}
            source={require('../../image/package-img.png')}
          />
          <View style={{marginLeft: 10}}>
            <Text style={styles.dropInfo}>Drop off 2 information</Text>
            <Text style={styles.companyInfo}>Company Name</Text>
            <Text style={styles.dropInfo}>
              22 Rue de la Liberté, Paris, Île-de-France.
            </Text>
            <Text style={styles.pickupNotes}>Pickup Notes</Text>
            <View style={styles.otpHeadCard}>
              <Text style={styles.otpTitleText}>Pickup OTP:</Text>
              <Text style={styles.otpText}>0444</Text>
            </View>
            <View style={styles.otpHeadCard}>
              <Text style={styles.otpTitleText}>Deliverd OTP:</Text>
              <Text style={styles.otpText}>0333</Text>
            </View>
          </View>
        </View> */}

        <View style={styles.invoiceMainCard}>
          <View>
            <Image
              style={{height: 26, width: 26}}
              source={require('../../image/Big-Package.png')}
            />
          </View>
          <View style={{marginLeft: 10}}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderFare}>{packageInformation}</Text>
            </View>

            <View style={styles.cardHeaderValues}>
              <Text style={styles.orderFareValue}>{orderID}:</Text>
              <Text style={styles.value}>{orderDetails.order_number}</Text>
            </View>

            <View style={styles.cardHeaderValues}>
              <Text style={styles.orderFareValue}>{vehicleText}:</Text>
              <Text style={styles.value}>{orderDetails.vehicle_type}</Text>
            </View>

            <View style={styles.cardHeaderValues}>
              <Text style={styles.orderFareValue}>{orderStatus}:</Text>
              <Text style={styles.value}>{orderDetails.order_status}</Text>
            </View>
          </View>
        </View>

        <View style={styles.invoiceMainCard}>
          <View>
            <Image source={require('../../image/order-fare.png')} />
          </View>
          <View style={{marginLeft: 10}}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderFare}>{totalOrderFare}</Text>
              <Text style={styles.totalmoney}>
              €{Number(orderDetails.amount || 0).toFixed(2)}
              </Text>
            </View>

            <Text style={styles.travel}>
              {travelled}{' '}
              {orderDetails.distance
                ? orderDetails.distance.toFixed(2)
                : '0.00'}{' '}
              km
            </Text>

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>{orderFare}</Text>
              <Text style={styles.value}>
                €{' '}
                {orderDetails.order_amount
                  ? orderDetails.order_amount.toFixed(2)
                  : '0.00'}
              </Text>
            </View>

            {/* <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>Platform fee</Text>
              <Text style={styles.value}>€01.00</Text>
            </View> */}

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>{amountCharged}</Text>
              <Text style={styles.value}>
                €{' '}
                {orderDetails.amount ? orderDetails.amount.toFixed(2) : '0.00'}
              </Text>
            </View>

            <View style={styles.masterCard}>
              <Image source={require('../../image/logos_mastercard.png')} />
              <Text style={styles.paidWith}>
                {paidWith}{' '}
                {orderDetails.paid_with ? orderDetails.paid_with : ''}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.packageInvoiceCard}
          onPress={downloadInvoiceFile}>
          <View style={styles.invoiceCard}>
            <FontAwesome5 name="file-invoice" size={20} color="#FF0058" />

            <Text style={styles.downloadInvoiceText}>{downloadInvoice}</Text>
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
    marginVertical: 4,
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
    justifyContent: 'space-between',
  },
  cardHeaderValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '74%',
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
  packageManager: {
    width: 30,
    height: 30,
  },
  pickupNotes: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: '#131314',
  },
  otpHeadCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    width: '75%',
  },
  otpTitleText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#131314',
  },
  otpText: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: '#131314',
  },
});

export default DeliveryDetailsMultipleInvoice;
