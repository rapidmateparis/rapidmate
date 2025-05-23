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
  Linking,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {colors} from '../../colors';
import DeliveryboyPackagePreviewModal from '../commonComponent/DeliveryboyPackagePreviewModal';
import DeliveryboySubmitOTPModal from '../commonComponent/DeliveryboySubmitOTPModal';
import {
  getAVehicleByTypeId,
  getLocationById,
  getViewOrderDetail,
  orderOPTVerify,
  orderOPTVerifyForDelivery,
  orderRequestAction,
  orderStatusUpdate,
} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';
import moment from 'moment';
import BicycleImage from '../../image/Cycle-Icon.png';
import MotorbikeImage from '../../image/Motorbike.png';
import CarImage from '../../image/Car-Icon.png';
import PartnerImage from '../../image/Partner-icon.png';
import VanImage from '../../image/Van-Icon.png';
import PickupImage from '../../image/Pickup-Icon.png';
import TruckImage from '../../image/Truck-Icon.png';
import MiniTruckImage from '../../image/Mini-Truck.png';
import MiniVanImage from '../../image/Mini-Van.png';
import SemiTruckImage from '../../image/Semi-Truck.png';
import BigTruckImage from '../../image/Big-Package.png';
import {API} from '../../utils/constant';
import {useUserDetails} from '../commonComponent/StoreContext';
import {localizationText} from '../../utils/common';

const DeliveryboyDeliveryDetails = ({route, navigation}) => {
  const [delivered, setDelivered] = useState(false);
  const {setLoading} = useLoader();
  const orderNumber = route.params.order_number;
  const [order, setOrder] = useState({});
  const [pickUpLocation, setPickUpLocation] = useState({});
  const [dropOffLocation, setDropOffLocation] = useState({});
  const [vehicleType, setVehicleType] = useState({});
  const [updateStatus, setUpdateStatus] = useState(
    route.params.orderItem.next_action_status,
  );
  const {userDetails} = useUserDetails();
  const [isOTP, setIsOTP] = useState();
  const orderClosedEarned =
    localizationText('Common', 'orderClosedEarned') ||
    'This order is closed, you earned';

  console.log('order', order);

  const handleOrderRequest = value => {
    let params = {
      delivery_boy_ext_id: userDetails.userDetails[0].ext_id,
      order_number: orderNumber,
      status: value ? 'Accepted' : 'Rejected',
    };
    orderRequestAction(
      params,
      successResponse => {
        console.log('successResponse==>', JSON.stringify(successResponse));
        navigation.goBack();
      },
      errorResponse => {
        console.log('errorResponse==>', JSON.stringify(errorResponse));
        navigation.goBack();
      },
    );
  };

  const validateOtp = otpValue => {
    let params = {
      delivery_boy_ext_id: userDetails.userDetails[0].ext_id,
      order_number: orderNumber,
      otp: otpValue,
    };
    console.log('print_data===>', isOTP, otpValue);
    if (isOTP) {
      orderOPTVerify(
        params,
        successResponse => {
          Alert.alert('Success', 'Status updated successfully', [
            {
              text: 'OK',
              onPress: () => {
                toggleModalOTP();
                navigation.goBack();
              },
            },
          ]);
        },
        errorResponse => {
          Alert.alert('Error Alert', '' + errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    } else {
      orderOPTVerifyForDelivery(
        params,
        successResponse => {
          const data = successResponse[0]._response.next_action_status;
          Alert.alert('Success', 'Delivered OTP verified successfully', [
            {
              text: 'OK',
              onPress: () => {
                toggleModalOTP();
                setUpdateStatus(data);
              },
            },
          ]);
        },
        errorResponse => {
          Alert.alert('Error Alert', '' + errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    }
  };

  const handleStatusUpdated = () => {
    if (updateStatus == 'Enter OTP') {
      toggleModalOTP();
      setIsOTP(true);
    } else if (updateStatus == 'Enter Delivered OTP') {
      toggleModalOTP();
      setIsOTP(false);
    } else {
      setLoading(true);
      let params = {
        order_number: orderNumber,
        status: updateStatus,
      };
      orderStatusUpdate(
        params,
        successResponse => {
          setLoading(false);
          setUpdateStatus(successResponse[0]._response.next_action_status);
        },
        errorResponse => {
          setLoading(false);
          console.log('message===>', JSON.stringify(errorResponse));
          // Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          //   {text: 'OK', onPress: () => {}},
          // ]);
        },
      );
    }
  };

  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isOTPModalVisible, setOTPModalVisible] = useState(false);
  const toggleModal = () => {
    setImageModalVisible(!isImageModalVisible);
  };
  const toggleModalOTP = () => {
    setOTPModalVisible(!isOTPModalVisible);
  };

  const handleCall = phoneNumber => {
    const formattedNumber = `+33${phoneNumber}`;
    const url = `tel:${formattedNumber}`;
    Linking.openURL(url).catch(err => {
      console.error('Failed to make the call:', err);
      Alert.alert('Error', 'Unable to make a call');
    });
  };

  const handleChat = phoneNumber => {
    const formattedNumber = `+33${phoneNumber}`;
    Linking.openURL(`sms:${formattedNumber}`).catch(err => {
      console.error('Failed to send the message:', err);
      Alert.alert('Error', 'Unable to send a message');
    });
  };

  useEffect(() => {
    orderDetail();
  }, []);

  console.log('route.params===>', route.params.orderItem);

  const orderDetail = async () => {
    setLoading(true);
    getViewOrderDetail(
      orderNumber,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          setOrder(successResponse[0]._response);
          getPickUpLocation(
            successResponse[0]._response.order.pickup_location_id,
          );
          getDropOffLocation(
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

  const getPickUpLocation = async locationId => {
    setLoading(true);
    getLocationById(
      locationId,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          setPickUpLocation(successResponse[0]._response[0]);
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

  const getDropOffLocation = async locationId => {
    setLoading(true);
    getLocationById(
      locationId,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          setDropOffLocation(successResponse[0]._response[0]);
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

  const getVechicleImage = vehicleTypeId => {
    switch (vehicleTypeId) {
      case 1:
        return BicycleImage;
      case 2:
        return MotorbikeImage;
      case 3:
        return CarImage;
      case 4:
        return PartnerImage;
      case 5:
        return VanImage;
      case 6:
        return PickupImage;
      case 7:
        return TruckImage;
      default:
        return BigTruckImage;
    }
  };

  const openInGoogleMaps = location => {
    if (location) {
      const {address, city, state} = location;
      const formattedAddress = encodeURIComponent(
        `${address}, ${city}, ${state}`,
      );
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
      Linking.openURL(googleMapsUrl);
    }
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.packageCard}>
          <View style={{width: '10%'}}>
            <Image
              style={styles.packageManager}
              source={require('../../image/Pickup-Package-Icon.png')}
            />
          </View>
          <View style={{marginLeft: 5, width: '89%'}}>
            <View style={styles.pickupCardHeader}>
              <Text style={styles.dropInfo}>
                {localizationText('Main', 'pickupInformation')}
              </Text>
              <TouchableOpacity
                onPress={() => openInGoogleMaps(pickUpLocation)}>
                <Image
                  style={styles.startIcon}
                  source={require('../../image/Start-Icon.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.companyInfosmain}>
              <View style={{width: '65%'}}>
                <Text style={styles.companyInfo}>
                  {order.order
                    ? order.order.company_name
                      ? order.order.company_name
                      : ''
                    : ''}
                </Text>
                {pickUpLocation ? (
                  <Text style={styles.dropInfo}>
                    {pickUpLocation?.address || ''}
                    {', '}
                    {pickUpLocation?.city || ''}
                    {', '}
                    {pickUpLocation?.state || ''}
                  </Text>
                ) : order?.pickup_location_id ? null : null}
                <Text style={styles.dropInfo}>
                  {order.order ? order.order.pickup_notes : ''}
                </Text>
              </View>
              <View style={styles.contactInfoIcons}>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => {
                    const phoneNumber =
                      order?.order?.is_my_self === 1
                        ? order?.order?.consumer_mobile
                        : order?.order?.mobile;

                    handleChat(phoneNumber);
                  }}>
                  <Image source={require('../../image/chat-icon.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    handleCall(
                      order?.order.is_my_self === 1
                        ? order?.order.consumer_mobile
                        : order?.order.mobile,
                    )
                  }>
                  <Image source={require('../../image/call-icon.png')} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.borderShowOff} />

            {/* <View style={styles.packageBasicInfo}>
              <Text style={styles.headingOTP}>OTP</Text>
              <Text style={styles.subheadingOTP}>
                {route.params.orderItem ? route.params.orderItem.otp : ''}
              </Text>
            </View>

            <View style={styles.borderShowOff} /> */}

            <View style={styles.packageBasicInfo}>
              <Text style={styles.headingOTP}>
                {localizationText('Common', 'when')}
              </Text>
              <Text style={styles.subheadingOTP}>
                {order.order
                  ? moment().diff(moment(order.order.order_date), 'minutes') <=
                    30
                    ? 'Now'
                    : moment(order.order.order_date).format(
                        'MMM DD, YYYY hh:mm A',
                      )
                  : ''}
              </Text>
            </View>

            <View style={styles.borderShowOff} />

            <View style={styles.packageBasicInfo}>
              <Text style={styles.headingOTP}>
                {localizationText('Common', 'packagePhoto')}
              </Text>
              <TouchableOpacity onPress={() => toggleModal()}>
                {order?.order?.package_photo ? (
                  <View>
                    <TouchableOpacity onPress={() => toggleModal()}>
                      <Image
                        style={styles.packagePhoto}
                        source={{
                          uri: API.viewImageUrl + order.order.package_photo,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  route.params.package_photo && (
                    <View>
                      <TouchableOpacity onPress={() => toggleModal()}>
                        <Image
                          style={styles.packagePhoto}
                          source={{
                            uri: API.viewImageUrl + route.params.package_photo,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  )
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.packageCard}>
          <View style={{width: '10%'}}>
            <Image
              style={styles.packageManager}
              source={require('../../image/package-img.png')}
            />
          </View>
          <View style={{marginLeft: 5, width: '89%'}}>
            <View style={styles.pickupCardHeader}>
              <Text style={styles.dropInfo}>
                {localizationText('Main', 'dropOffInformation')}
              </Text>
              <TouchableOpacity
                onPress={() => openInGoogleMaps(dropOffLocation)}>
                <Image
                  style={styles.startIcon}
                  source={require('../../image/Start-Icon.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.companyInfosmain}>
              <View style={{width: '65%'}}>
                <Text style={styles.companyInfo}>
                  {order.order
                    ? order.order.drop_company_name
                      ? order.order.drop_company_name
                      : ''
                    : ''}
                </Text>
                {dropOffLocation && (
                  <Text style={styles.dropInfo}>
                    {dropOffLocation?.address || ''}
                    {dropOffLocation?.city || ''} {dropOffLocation?.state || ''}
                  </Text>
                )}
                <Text style={styles.dropInfo}>
                  {order.order ? order.order.drop_notes : ''}
                </Text>
              </View>
              <View style={styles.contactInfoIcons}>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => handleChat(order.order.drop_mobile)}>
                  <Image source={require('../../image/chat-icon.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleCall(order.order.drop_mobile)}>
                  <Image source={require('../../image/call-icon.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.packageInformationCard}>
          <Text style={styles.packageTitle}>
            {localizationText('Main', 'packageInformation')}
          </Text>
          <Text style={styles.orderdetails}>
            {localizationText('Common', 'orderID')}:
            <Text style={styles.detailsId}>
              {' '}
              {order.order ? order.order.order_number : '*************'}
            </Text>
          </Text>
          <Text style={styles.orderdetails}>
            {localizationText('Common', 'vehicle')}:
            <Text style={styles.detailsId}> {vehicleType.vehicle_type}</Text>
          </Text>
        </View>

        <View style={styles.vehicleCardInfo}>
          <View>
            <Text style={styles.packageTitle}>
              {localizationText('Common', 'vehicleRequested')}
            </Text>
            <Text style={styles.orderdetails}>{vehicleType.vehicle_type}</Text>
          </View>
          <View>
            <Image
              style={{width: 55, height: 35, resizeMode: 'contain'}}
              source={getVechicleImage(route.params.orderItem.vehicle_type_id)}
            />
          </View>
        </View>
      </View>
      {route.params.orderItem.order_status == 'ORDER_ALLOCATED' ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 7,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              handleOrderRequest(true);
            }}
            style={[styles.acceptOrReject, {backgroundColor: colors.primary}]}>
            <Text style={styles.buttonText}>
              {localizationText('Common', 'accept')}
            </Text>
          </TouchableOpacity>
          <View style={{width: '1%'}} />
          <TouchableOpacity
            onPress={() => {
              handleOrderRequest(false);
            }}
            style={[styles.acceptOrReject, {backgroundColor: colors.primary}]}>
            <Text style={styles.buttonText}>
              {localizationText('Common', 'reject')}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.deliveryStatusCard}>
          <View style={styles.deliveryinfo}>
            <View style={styles.statusAboutDelivery}>
              <Octicons
                name={updateStatus == 'Ready to pickup' ? 'dot-fill' : 'check'}
                size={15}
                color={
                  updateStatus == 'Ready to pickup' ? '#D9D9D9' : '#FF0058'
                }
              />
              <Text style={styles.statusInfo}>
                {localizationText('Common', 'goingToPickup')}
              </Text>
            </View>
            <View style={styles.borderStyle} />

            <View style={styles.statusAboutDelivery}>
              <Octicons
                name={
                  updateStatus == 'Reached' || updateStatus == 'Ready to pickup'
                    ? 'dot-fill'
                    : 'check'
                }
                size={15}
                color={
                  updateStatus == 'Reached' || updateStatus == 'Ready to pickup'
                    ? '#D9D9D9'
                    : '#FF0058'
                }
              />
              <Text style={styles.statusInfo}>
                {localizationText('Common', 'reached')}
              </Text>
            </View>
            <View style={styles.borderStyle} />

            <View style={styles.statusAboutDelivery}>
              <Octicons
                name={updateStatus == 'Completed' ? 'check' : 'dot-fill'}
                size={15}
                color={updateStatus == 'Completed' ? '#FF0058' : '#D9D9D9'}
              />
              <Text style={styles.statusInfo}>
                {localizationText('Common', 'delivered')}
              </Text>
            </View>
          </View>
          <View style={styles.earningCard}>
            {updateStatus === 'Completed' && (
              <Text style={styles.boyEarning}>
                {orderClosedEarned}{' '}
                <Text style={styles.earnedMoney}>
                  €{' '}
                  {parseFloat(
                    route.params.orderItem?.delivery_boy_amount || 0,
                  ).toFixed(2)}
                </Text>
              </Text>
            )}
          </View>

          {updateStatus !== 'Completed' && (
            <TouchableOpacity
              onPress={handleStatusUpdated}
              style={[styles.logbutton, {backgroundColor: colors.primary}]}
              disabled={updateStatus == 'Completed' ? true : false}>
              <Text style={styles.buttonText}>{updateStatus}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Modal start here  */}
      <DeliveryboyPackagePreviewModal
        isImageModalVisible={isImageModalVisible}
        setImageModalVisible={setImageModalVisible}
        previewImage={
          route.params.orderItem.package_photo
            ? route.params.orderItem.package_photo
            : null
        }
      />
      <DeliveryboySubmitOTPModal
        isOTPModalVisible={isOTPModalVisible}
        setOTPModalVisible={setOTPModalVisible}
        submitOTP={validateOtp}
      />
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
    marginBottom: 3,
    marginTop: 3,
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
    marginBottom: 10,
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
    width: 48,
    height: 48,
    borderRadius: 5,
  },
  vehicleCardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 15,
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
    marginTop: 7,
  },
  deliveryStatusCard: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
    marginTop: 7,
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: '#f1f1f1',
    width: 20,
  },
  deliveryinfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusInfo: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    paddingHorizontal: 5,
  },
  statusAboutDelivery: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  logbutton: {
    width: '100%',
    borderRadius: 5,
    marginVertical: 10,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptOrReject: {
    width: '48%',
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  boyEarning: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  earnedMoney: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
  },
  earningCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginVertical: 10,
  },
  packageManager: {
    width: 30,
    height: 30,
  },
  startIcon: {
    height: 23,
    width: 60,
  },
});

export default DeliveryboyDeliveryDetails;
