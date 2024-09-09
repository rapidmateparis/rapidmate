import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Button,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../colors';
import MapDeliveryDetails from '../commonComponent/MapDeliveryDetails';
import {
  cancelOrderConsumer,
  downloadInvoiceOrder,
  getAVehicleByTypeId,
  getLocationById,
  getViewOrderDetail,
} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';
import CancellationModal from '../commonComponent/CancellationModal';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import {
  requestMultiple,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';

const DeliveryDetails = ({route, navigation}) => {
  const {setLoading} = useLoader();
  const orderNumber = route.params.order_number;
  const [order, serOrder] = useState({});
  const [destinationAddress, setDestinationAddress] = useState({});
  const [vehicleType, setVehicleType] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(async () => {
    orderDetail();
    const requestCameraPermission = async () => {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);

      console.log('granted', granted);
      return granted;
    };

    const permissionStatus = await requestCameraPermission();
    console.log('permissionStatus', permissionStatus);

    if (permissionStatus[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted') {
      // Code to access the camera
    } else if (
      permissionStatus[PermissionsAndroid.PERMISSIONS.CAMERA] ===
      'never_ask_again'
    ) {
      Linking.openSettings();
    }
  }, []);

  const orderDetail = async () => {
    setLoading(true);
    getViewOrderDetail(
      orderNumber,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          serOrder(successResponse[0]._response.order);
          getDestinationAddress(
            successResponse[0]._response.order.dropoff_location_id,
          );
          vehicleDetail(successResponse[0]._response.order.vehicle_type_id);
        }
      },
      errorResponse => {
        setLoading(false);
        console.log('orderDetail==>errorResponse', errorResponse[0]);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  };

  const getDestinationAddress = async locationId => {
    setLoading(true);
    getLocationById(
      locationId,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          setDestinationAddress(successResponse[0]._response[0]);
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

  const vehicleDetail = async vehicleTypeId => {
    setLoading(true);
    getAVehicleByTypeId(
      vehicleTypeId,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          setVehicleType(successResponse[0]._response[0]);
        }
      },
      errorResponse => {
        setLoading(false);
        console.log('vehicleDetail==>errorResponse', errorResponse[0]);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  };

  const submitCancelOrder = () => {
    setLoading(true);
    cancelOrderConsumer(
      orderNumber,
      successResponse => {
        setLoading(false);
        setModalVisible(false);
        console.log(
          'order_cancel===>successResponse',
          '' + JSON.stringify(successResponse),
        );
        navigation.navigate('PickupOrderCancelled');
      },
      errorResponse => {
        setLoading(false);
        console.log('order_cancel===>errorResponse', '' + errorResponse);
      },
    );
  };

  const downloadInvoiceFile = async () => {
    setLoading(true);
    try {
      const successResponse = await new Promise((resolve, reject) => {
        downloadInvoiceOrder(orderNumber, resolve, reject);
      });

      const invoiceData = successResponse;
      const filePath =
        Platform.OS === 'android'
          ? `${RNFS.ExternalDirectoryPath}/invoice_${orderNumber}.pdf`
          : `${RNFS.DocumentDirectoryPath}/invoice_${orderNumber}.pdf`;

      // Convert binary data to base64
      const base64Data = Buffer.from(invoiceData, 'binary').toString('base64');

      // Write the file to the document directory
      await RNFS.writeFile(filePath, base64Data, 'base64');

      // Verify the file exists
      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        Alert.alert('Success', 'Invoice saved successfully.');
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

  return (
    <ScrollView
      style={{width: '100%', backgroundColor: '#FBFAF5', marginBottom: 20}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={{width: '100%', height: 250}}>
          <MapDeliveryDetails />
        </View>
        <View style={styles.driverCard}>
          <Image
            style={styles.driverImga}
            source={require('../../image/driver.jpeg')}
          />
          <View style={{marginLeft: 10}}>
            <Text style={styles.driverName}>{order.first_name}</Text>
            <Text style={styles.truckInfo}>VOLVO FH16 2022</Text>
          </View>
        </View>

        <View style={styles.packageCard}>
          <Image
            style={styles.packageManager}
            source={require('../../image/package-img.png')}
          />
          <View style={{marginLeft: 10}}>
            <Text style={styles.dropInfo}>Drop off information</Text>
            <Text style={styles.companyInfo}>
              {order.company_name ? order.company_name : ''}
            </Text>
            <Text style={styles.dropInfo}>
              {destinationAddress.address}, {destinationAddress.city},{' '}
              {destinationAddress.state}
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
              <Text style={styles.totalmoney}>
                €{order.amount ? order.amount.toFixed(2) : '0.00'}
              </Text>
            </View>

            <Text style={styles.travel}>
              Travelled {order.distance ? order.distance.toFixed(2) : '0.00'} km
              in 32 mins
            </Text>

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>Order fare</Text>
              <Text style={styles.value}>
                €
                {order.delivery_boy_amount
                  ? order.delivery_boy_amount.toFixed(2)
                  : '0.00'}
              </Text>
            </View>

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>Waiting</Text>
              <Text style={styles.value}>€0.00</Text>
            </View>

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>Platform fee</Text>
              <Text style={styles.value}>
                €
                {order.commission_amount
                  ? order.commission_amount.toFixed(2)
                  : '0.00'}
              </Text>
            </View>

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>Amount charged</Text>
              <Text style={styles.value}>
                €{order.amount ? order.amount.toFixed(2) : '0.00'}
              </Text>
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
            Order ID:<Text style={styles.detailsId}> {order.order_number}</Text>
          </Text>
          <Text style={styles.orderdetails}>
            Comments:
            <Text style={styles.detailsId}>
              {' '}
              Lorem ipsum dolor sit amet conse ctetur. Ridiculus nunc platea
              sed.
            </Text>
          </Text>
          <Text style={styles.orderdetails}>
            Vehicle:
            <Text style={styles.detailsId}> {vehicleType.vehicle_type}</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.packageInvoiceCard}
          onPress={downloadInvoiceFile}>
          <View style={styles.invoiceCard}>
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

      <TouchableOpacity
        onPress={() => toggleModal()}
        style={styles.requestTouch}>
        <Text style={styles.cancelRequest}>Cancel request</Text>
      </TouchableOpacity>

      {/* CancellationModal Modal  */}
      <CancellationModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        submitCancelOrder={submitCancelOrder}
      />
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
  driverImga: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  driverName: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  truckInfo: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#131314',
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
  invoiceCard: {
    flexDirection: 'row',
  },
  packageManager: {
    width: 30,
    height: 30,
  },
  cancelRequest: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    justifyContent: 'center',
  },
  requestTouch: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    paddingVertical: 10,
    alignSelf: 'center',
  },
});

export default DeliveryDetails;
