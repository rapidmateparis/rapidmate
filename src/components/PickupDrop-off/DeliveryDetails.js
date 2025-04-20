import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Platform,
  PermissionsAndroid,
  Linking,
  Button,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../colors';
import MapDeliveryDetails from '../commonComponent/MapDeliveryDetails';
import {
  cancelOrderConsumer,
  cancelOrderEnterprise,
  downloadInvoiceOrder,
  getAllocatedDeliveryBoy,
  getAVehicleByTypeId,
  getLocationById,
  getLocations,
  getViewEnterpriseOrderDetail,
  getViewOrderDetail,
} from '../../data_manager';
import { useLoader } from '../../utils/loaderContext';
import CancellationModal from '../commonComponent/CancellationModal';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
import { API } from '../../utils/constant';
import FileViewer from 'react-native-file-viewer';
import { useUserDetails } from '../commonComponent/StoreContext';
import { localizationText, utcLocal } from '../../utils/common';

const DeliveryDetails = ({ navigation, route }) => {
  const { setLoading } = useLoader();
  const orderNumber = route.params?.orderItem?.order_number;
  const componentType = route.params?.componentType;
  const [order, setOrder] = useState({});
  const [deliveryboy, setDeliveryboy] = useState({});
  const [vehicle, setVehicle] = useState({});
  const [sourceAddress, setSourceAddress] = useState({});
  const [destinationAddress, setDestinationAddress] = useState({});
  const [vehicleType, setVehicleType] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const { userDetails } = useUserDetails();
  const [locations, setLocations] = useState([]);
  const [multipleOrderLocation, setMultipleOrderLocation] = useState([]);
  const pickupInformation =
    localizationText('Main', 'pickupInformation') || 'Pickup Information';
  const dropOffInformation =
    localizationText('Main', 'dropOffInformation') || 'Drop off Information';
  const packageInformation =
    localizationText('Main', 'packageInformation') || 'Package information';
  const orderID = localizationText('Common', 'orderID') || 'Order ID';
  const orderDate = localizationText('Common', 'orderDate') || 'Order Date';
  const vehicleText = localizationText('Common', 'vehicle') || 'Vehicle';
  const pickupOTP = localizationText('Common', 'pickupOTP') || 'Pickup OTP';
  const deliveredOTP =
    localizationText('Common', 'deliveredOTP') || 'Delivered OTP';
  const totalOrderFare =
    localizationText('Common', 'totalOrderFare') || 'Total Order fare';
  const orderFare = localizationText('Common', 'orderFare') || 'Order fare';
  const travelled = localizationText('Common', 'travelled') || 'Travelled';
  const inText = localizationText('Common', 'inText') || 'in';
  const tax = localizationText('Common', 'tax') || 'Tax';
  const promo = localizationText('Common', 'promo') || 'Promo';
  const amountCharged =
    localizationText('Common', 'amountCharged') || 'Amount charged';
  const paidWith = localizationText('Common', 'paidWith') || 'Paid with';
  const downloadInvoice =
    localizationText('Common', 'downloadInvoice') || 'Download invoice';
  const cancelRequest =
    localizationText('Common', 'cancelRequest') || 'Cancel request';
  const orderStatus =
    localizationText('Common', 'OrderStatus') || 'Status';

  const enterpriseDestinationList = route?.params?.orderItem?.locations || [];

  console.log('first', enterpriseDestinationList);

  const getTaxAmount = () => {
    const tax = route?.params?.orderItem?.tax
      ? route?.params?.orderItem?.tax
      : 0;
    const amount = order.order_amount ? order.order_amount.toFixed(2) : 0;

    console.log('amount is ', amount, 'and vechile tax is ', tax);
    const taxAmount = (parseFloat(amount) * parseFloat(tax)) / 100;
    return taxAmount ? taxAmount.toFixed(2) : 0;
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(async () => {
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

  useEffect(() => {
    console.log('ARUNS 1==>');
    if (componentType == 'ENTERPRISE') {
      console.log('ARUNS 2==>');
      enterpriseOrderDetail();
    } else {
      orderDetail();
    }
  }, []);

  useEffect(() => { }, [locations]);

  const enterpriseOrderDetail = () => {
    setLoading(true);
    getViewEnterpriseOrderDetail(
      orderNumber,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          console.log(
            'Enterprise new details  =====>',
            JSON.stringify(successResponse[0]._response),
          );
          console.log('ARUNS 3==>');
          let data = successResponse[0]._response.order;
          let orderLines = successResponse[0]._response.orderLines;
          if (orderLines && orderLines.length > 0) {
            getAllLocations();
            setMultipleOrderLocation(orderLines);
          }
          setOrder(data);
          console.log('ARUNS 4==>', data);
          setDeliveryboy(successResponse[0]._response.deliveryBoy);
          getSourceAddress(successResponse[0]._response.order.pickup_location);
          getDestinationAddress(
            successResponse[0]._response.order.dropoff_location,
          );
          vehicleDetail(successResponse[0]._response.order.vehicle_type_id);
          setVehicle(successResponse[0]._response.vehicle);
        }
      },
      errorResponse => {
        setLoading(false);
        console.log('orderDetail==>errorResponse', errorResponse[0]);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          { text: 'OK', onPress: () => { } },
        ]);
      },
    );
  };

  const orderDetail = () => {
    setLoading(true);
    getViewOrderDetail(
      orderNumber,
      successResponse => {
        console.log('Order details ---- >', JSON.stringify(successResponse));
        setLoading(false);
        if (successResponse[0]._success) {
          setOrder(successResponse[0]._response.order);
          setDeliveryboy(successResponse[0]._response.deliveryBoy);
          if (successResponse[0]._response.vehicle) {
            setVehicle(successResponse[0]._response.vehicle);
          }
          getDestinationAddress(
            successResponse[0]._response.order.dropoff_location_id,
          );
          getSourceAddress(
            successResponse[0]._response.order.pickup_location_id,
          );
          vehicleDetail(successResponse[0]._response.order.vehicle_type_id);
        }
      },
      errorResponse => {
        setLoading(false);
        console.log('orderDetail==>errorResponse', errorResponse[0]);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          { text: 'OK', onPress: () => { } },
        ]);
      },
    );
  };

  const getAllLocations = async () => {
    setLoading(true);
    getLocations(
      null,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          setLocations(successResponse[0]._response);
        }
      },
      errorResponse => {
        setLoading(false);
        console.log('locations==>errorResponse', errorResponse[0]);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          { text: 'OK', onPress: () => { } },
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
          console.log(
            'successResponse[0]._response[0]',
            successResponse[0]._response[0],
          );

          setDestinationAddress(successResponse[0]._response[0]);
        }
      },
      errorResponse => {
        setLoading(false);
        console.log('destination==>errorResponse', errorResponse[0]);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          { text: 'OK', onPress: () => { } },
        ]);
      },
    );
  };

  const getSourceAddress = async locationId => {
    setLoading(true);
    getLocationById(
      locationId,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          setSourceAddress(successResponse[0]._response[0]);
        }
      },
      errorResponse => {
        setLoading(false);
        console.log('destination==>errorResponse', errorResponse[0]);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          { text: 'OK', onPress: () => { } },
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
          { text: 'OK', onPress: () => { } },
        ]);
      },
    );
  };

  const submitCancelOrder = selectedReason => {
    setLoading(true);
    let params = {
      order_number: orderNumber,
      cancel_reason_id: selectedReason.id,
      cancel_reason: selectedReason.reason,
    };
    if (componentType == 'ENTERPRISE') {
      // navigation.navigate('EnterpriseOrderCancelled');
      cancelOrderEnterprise(
        params,
        successResponse => {
          setLoading(false);
          console.log(
            'enterprise_order_cancel===>successResponse',
            '' + JSON.stringify(successResponse),
          );
          navigation.navigate('EnterpriseOrderCancelled');
        },
        errorResponse => {
          setLoading(false);
          console.log(
            'enterprise_order_cancel===>errorResponse',
            '' + errorResponse,
          );
          Alert.alert('Success', errorResponse[0]._errors.message, [
            {
              text: 'Okay',
            },
          ]);
        },
      );
    } else {
      cancelOrderConsumer(
        params,
        successResponse => {
          setLoading(false);
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
    }
  };

  const openPDFWithNativeViewer = async filePath => {
    const fileExists = await RNFS.exists(filePath);

    if (fileExists) {
      FileViewer.open(filePath)
        .then(() => { })
        .catch(error => {
          Alert.alert('Error', 'Unable to open file: ' + error);
        });
    } else {
      Alert.alert('Error', 'File not found');
    }
  };

  const downloadFile = pdf => {
    setLoading(true);
    let date = new Date();
    let exe = '.pdf';
    let filename =
      `invoice_${orderNumber}` +
      Math.floor(date.getTime() + date.getSeconds() / 2) +
      exe;
    const localFile = `${RNFS.DocumentDirectoryPath}${filename}`;

    const options = {
      fromUrl: pdf,
      toFile: localFile,
    };
    console.log('localFile =====>', localFile);
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

  const openPdfInBrowser = pdf => {
    if (pdf) {
      Linking.canOpenURL(pdf)
        .then(canOpen =>
          canOpen ? Linking.openURL(pdf) : console.error('invalid url url:'),
        )
        .catch(err => console.error('An error occurred opening the url:', err));
    }
  };

  const downloadInvoiceFile = async () => {
    try {
      const type =
        componentType == 'ENTERPRISE'
          ? 'enterprise'
          : componentType == 'DELIVERBOY'
            ? 'deliveryboy'
            : 'consumer';

      const successResponse = await new Promise((resolve, reject) => {
        downloadInvoiceOrder(orderNumber, type, resolve, reject);
      });

      const pdf = API.downloadInvoice + orderNumber + '/' + type + '?show=true';
      downloadFile(pdf);
      // const invoiceData = successResponse;
      // const filePath =
      //   Platform.OS === 'android'
      //     ? `${RNFS.ExternalDirectoryPath}/invoice_${orderNumber}.pdf`
      //     : `${RNFS.DocumentDirectoryPath}/invoice_${orderNumber}.pdf`;
      //     console.log('type ***** type',type,filePath)

      // // Convert binary data to base64
      // const base64Data = Buffer.from(invoiceData, 'binary').toString('base64');

      // // Write the file to the document directory
      // await RNFS.writeFile(filePath, base64Data, 'base64');

      // // Verify the file exists
      // const fileExists = await RNFS.exists(invoiceData);
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
      setLoading(false);
      Alert.alert('Error', 'Failed to save invoice file.');
      console.error('File saving error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDeliveryBoyAllocation = () => {
    const params = {
      userRole: userDetails?.userDetails[0]?.role,
      orderNumber: orderNumber,
    };
    getAllocatedDeliveryBoy(
      params,
      successResponse => {
        Alert.alert('Success', successResponse[0]._response.message, [
          {
            text: 'Okay',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      },
      errorResponse => {
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {
            text: 'Okay',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      },
    );
  };

  return (
    <ScrollView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FBFAF5',
        marginBottom: 20,
      }}>
      <View style={{ paddingHorizontal: 15 }}>
        <View style={{ width: '100%', height: 250 }}>
          <MapDeliveryDetails
            addressData={{
              sourceAddress: sourceAddress,
              destinationAddress: destinationAddress,
            }}
            multipleToAddress={
              multipleOrderLocation?.length > 0 ? multipleOrderLocation : []
            }
          />
        </View>

        <View>
          {order?.is_delivery_boy_allocated === 1 ? (
            <View style={styles.driverCard}>
              <Image
                style={styles.driverImage}
                source={{
                  uri: API.viewImageUrl + deliveryboy?.profile_pic,
                }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.driverName}>
                  {deliveryboy?.first_name} {''}
                  {deliveryboy?.last_name}
                </Text>
                <Text style={styles.truckInfo}>{vehicle?.plat_no}</Text>
              </View>
            </View>
          ) : order?.service_type_id === 
            1 ? null : (order?.is_delivery_boy_allocated === 0 && order?.order_status === 'ORDER_PLACED')? (
              <View style={{ alignContent: 'flex-end' }}>
                <Button
                  title="Allocate Driver"
                  color={colors.primary}
                  onPress={getDeliveryBoyAllocation}
                />
              </View>
            ) : null}
        </View>
        <View style={styles.packageCard}>
          <View style={styles.packageLeftsideCard}>
            <Image
              style={styles.packageManager}
              source={require('../../image/Pickup-Package-Icon.png')}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.dropInfo}>{pickupInformation}</Text>
              {order.company_name && (
                <Text style={styles.companyInfo}>
                  {order.company_name ? order.company_name : ''}
                </Text>
              )}

              <View>
                <Text style={styles.dropInfo}>
                  {sourceAddress.address}, {sourceAddress.city},{' '}
                  {sourceAddress.state}
                </Text>
              </View>
              <Text style={styles.value}>{order.pickup_notes || '-'}</Text>
            </View>
          </View>

          {order.package_photo && (
            <Image
              style={styles.driverImage}
              source={{
                uri: API.viewImageUrl + order.package_photo,
              }}
            />
          )}
        </View>
        <View style={styles.packageCard}>
          <View style={styles.packageLeftsideCard}>
            <Image
              style={styles.packageManager}
              source={require('../../image/package-img.png')}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.dropInfo}>{dropOffInformation}</Text>
              {order.drop_company_name && (
                <Text style={styles.companyInfo}>
                  {order.drop_company_name ? order.drop_company_name : ''}
                </Text>
              )}
              {componentType == 'ENTERPRISE' ? (
                <View>
                  {enterpriseDestinationList &&
                    enterpriseDestinationList.length > 0 ? (
                    enterpriseDestinationList.map(location => {
                      return (
                        <Text style={styles.dropInfo}>
                          {location?.destination_description || ''}
                        </Text>
                      );
                    })
                  ) : (
                    <Text style={styles.dropInfo}>
                      {destinationAddress.address}, {destinationAddress.city},{' '}
                      {destinationAddress.state}
                    </Text>
                  )}
                </View>
              ) : order.orderLines && order.orderLines.length > 0 ? (
                <View>
                  {order.orderLines.map((item, index) => {
                    var branch = locations.filter(
                      i => i.id == item.dropoff_location,
                    );
                    return (
                      <Text style={styles.dropInfo}>
                        {branch[0] && branch[0].address},{' '}
                        {branch[0] && branch[0].city},{' '}
                        {branch[0] && branch[0].state}
                      </Text>
                    );
                  })}
                </View>
              ) : (
                <View>
                  <Text style={styles.dropInfo}>
                    {destinationAddress.address}, {destinationAddress.city},{' '}
                    {destinationAddress.state}
                  </Text>
                </View>
              )}
              <Text style={styles.value}>{order.drop_notes || '-'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.invoiceMainCard}>
          <View>
            <Image
              style={{ height: 26, width: 26 }}
              source={require('../../image/Big-Package.png')}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderFare}>{packageInformation}</Text>
            </View>

            <View style={styles.cardHeaderValues}>
              <Text style={styles.orderFareValue}>{orderID}:</Text>
              <Text style={styles.value}>{order.order_number}</Text>
            </View>
            <View style={styles.cardHeaderValues}>
              <Text style={styles.orderFareValue}>{orderDate}:</Text>
              <Text style={styles.value}>{utcLocal(order.order_date)}</Text>
            </View>

            <View style={styles.cardHeaderValues}>
              <Text style={styles.orderFareValue}>{vehicleText}:</Text>
              <Text style={styles.value}>{vehicleType.vehicle_type}</Text>
            </View>

            <View style={styles.cardHeaderValues}>
              <Text style={styles.orderFareValue}>{pickupOTP}:</Text>
              <Text style={styles.value}>{route.params?.orderItem?.otp}</Text>
            </View>

            <View style={styles.cardHeaderValues}>
              <Text style={styles.orderFareValue}>{deliveredOTP}:</Text>
              <Text style={styles.value}>
                {order?.delivered_otp?.length > 0
                  ? order?.delivered_otp
                  : '****'}
              </Text>
            </View>

            <View style={styles.cardHeaderValues}>
              <Text style={styles.orderFareValue}>{orderStatus}:</Text>
              <Text style={styles.value}>{route.params?.orderItem?.order_status}</Text>
            </View>
          </View>
        </View>

        <View style={styles.invoiceMainCard}>
          <View>
            <Image source={require('../../image/order-fare.png')} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderFare}>{totalOrderFare}</Text>
              <Text style={styles.totalmoney}>
                € {order.amount ? order.amount.toFixed(2) : '0.00'}
              </Text>
            </View>

            <Text style={styles.travel}>
              {travelled} {order.distance ? order.distance.toFixed(2) : '0.00'}{' '}
              km {''}
              {inText} {order.total_duration ? order.total_duration : '00'}
            </Text>

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>{orderFare}</Text>
              <Text style={styles.value}>
                € {order.order_amount ? order.order_amount.toFixed(2) : '0.00'}
              </Text>
            </View>

            {console.log("Oder ================>", order)}

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>{`${tax} @20%`}</Text>
              <Text style={styles.value}>
                € {order.order_amount ? (order.order_amount * 0.2).toFixed(2) : '0.00'}
              </Text>
            </View>

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>{promo}</Text>
              <Text style={styles.value}>
                {order.promo_value ? order.promo_value : '0'}
              </Text>
            </View>

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>{`Discount @${order.discount}%`}</Text>
              <Text style={styles.value}>€ {(order.order_amount * (order.discount / 100)).toFixed(2)}</Text>
            </View>

            <View style={styles.cardHeader}>
              <Text style={styles.orderFareValue}>{amountCharged}</Text>
              <Text style={styles.value}>
                € {order.amount ? order.amount.toFixed(2) : '0.00'}
              </Text>
            </View>

            <View style={styles.masterCard}>
              <Image source={require('../../image/logos_mastercard.png')} />
              <Text style={styles.paidWith}>
                {paidWith} {''} {order.paid_with ? order.paid_with : ''}
              </Text>
            </View>
          </View>
        </View>

        {route?.params?.orderItem?.order_status === 'COMPLETED' && (
          <TouchableOpacity
            style={styles.packageInvoiceCard}
            onPress={downloadInvoiceFile}>
            <View style={styles.invoiceCard}>
              <FontAwesome5 name="file-invoice" size={20} color="#FF0058" />
              <Text style={styles.downloadInvoiceText}>{downloadInvoice}</Text>
            </View>
            <View>
              <Feather
                style={{ marginTop: 5 }}
                name="download"
                size={20}
                color="#FF0058"
              />
            </View>
          </TouchableOpacity>
        )}
      </View>

      {order.is_enable_cancel_request == 1 ? (
        <TouchableOpacity
          onPress={() => toggleModal()}
          style={styles.requestTouch}>
          <Text style={styles.cancelRequest}>{cancelRequest}</Text>
        </TouchableOpacity>
      ) : null}

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
    justifyContent: 'space-between',
    alignItems: 'center',
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

  packageLeftsideCard: {
    flexDirection: 'row',
    flex: 0.7,
  },

  driverImage: {
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
    marginBottom: 5,
  },
  companyInfo: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    marginBottom: 5,
  },
  companyAddress: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.subText,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '71%',
  },
  cardHeaderValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '74%',
  },
  orderFare: {
    width: '70%',
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
  okButtonText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.white,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    width: 200,
    textAlign: 'center',
  },
});

export default DeliveryDetails;
