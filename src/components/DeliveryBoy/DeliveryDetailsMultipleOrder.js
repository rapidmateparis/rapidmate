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
import MapDeliveryDetails from '../commonComponent/MapDeliveryDetails';
import DeliveryboyPackagePreviewModal from '../commonComponent/DeliveryboyPackagePreviewModal';
import DeliveryboySubmitOTPModal from '../commonComponent/DeliveryboySubmitOTPModal';
import {useUserDetails} from '../commonComponent/StoreContext';
import {
  orderOPTVerify,
  orderOPTVerifyForDelivery,
  orderRequestAction,
  orderStatusUpdate,
} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';
import { localizationText } from '../../utils/common';

const DeliveryDetailsMultipleOrder = ({route, navigation}) => {
  const [delivered, setDelivered] = useState(false);
  const handleMarkAsDelivered = () => {
    setDelivered(true);
  };
  const {setLoading} = useLoader();

  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isOTPModalVisible, setOTPModalVisible] = useState(false);
  const {userDetails} = useUserDetails();
  const orderID = localizationText('Common', 'orderID') || 'Order ID';
  const vehicleText = localizationText('Common', 'vehicle') || 'Vehicle';
  const packagePhoto = localizationText('Common', 'packagePhoto') || 'Package Photo';
  const orderClosedEarned =
      localizationText('Common', 'orderClosedEarned') ||
      'This order is closed, you earned';

  const [isOTP, setIsOTP] = useState();
  const [lineId, setLineId] = useState(null);

  const toggleModal = () => {
    setImageModalVisible(!isImageModalVisible);
  };
  const toggleModalOTP = () => {
    setOTPModalVisible(!isOTPModalVisible);
  };

  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    // route.params.orderItem.next_action_status,
    if (route?.params?.orderItem) {
      setOrderDetails(route?.params?.orderItem);
    } else {
      setOrderDetails({});
    }
  }, []);
  console.log('orderDetails===>', orderDetails);

  const validateOtp = otpValue => {
    let params = {
      delivery_boy_ext_id: userDetails.userDetails[0].ext_id,
      order_number: orderDetails.order_number,
      otp: otpValue,
      line_id: lineId,
    };
    console.log('print_data==<<<<', isOTP, otpValue, params);
    if (isOTP) {
      orderOPTVerify(
        params,
        successResponse => {
          console.log('successResponse==<<<<', successResponse);

          setLineId(null);
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
          setLineId(null);
          Alert.alert('Error Alert', '' + errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    } else {
      orderOPTVerifyForDelivery(
        params,
        successResponse => {
          setLineId(null);
          const data = successResponse[0]._response.next_action_status;
          Alert.alert('Success', 'Delivered OPT verified successfully', [
            {
              text: 'OK',
              onPress: () => {
                toggleModalOTP();
                navigation.goBack();
                // setUpdateStatus(data);
              },
            },
          ]);
        },
        errorResponse => {
          setLineId(null);
          Alert.alert('Error Alert', '' + errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    }
  };

  const handleStatusUpdated = (updateStatus, location) => {
    console.log('location.id ----<>', updateStatus, location.id);

    if (updateStatus == 'Enter OTP') {
      setLineId(location.id);
      toggleModalOTP();
      setIsOTP(true);
    } else if (updateStatus == 'Enter Delivered OTP') {
      console.log('location.id ---->', location.id);
      setLineId(location.id);
      toggleModalOTP();
      setIsOTP(false);
    } else {
      setLoading(true);
      let params = {
        order_number: location.order_number,
        status: updateStatus,
        line_id: location.id,
      };
      orderStatusUpdate(
        params,
        successResponse => {
          setLoading(false);
          navigation.goBack();
          // setUpdateStatus(successResponse[0]._response.next_action_status);
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

  const handleOrderRequest = value => {
    let params = {
      delivery_boy_ext_id: userDetails.userDetails[0].ext_id,
      order_number: orderDetails.order_number,
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
              <Text style={styles.dropInfo}>{localizationText('Main', 'pickupInformation')}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DeliveryDetailsMultipleInvoice')
                }>
                <TouchableOpacity
                  onPress={() => {
                    const address = orderDetails.address;
                    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      address,
                    )}`;
                    Linking.openURL(url);
                  }}>
                  <Image
                    style={styles.startIcon}
                    source={require('../../image/Start-Icon.png')}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            <View style={styles.companyInfosmain}>
              <View style={{width: '65%'}}>
                <Text style={styles.companyInfo}>
                  {orderDetails.company_name}
                </Text>
                <Text style={styles.dropInfo}>{orderDetails.address}</Text>
                <Text style={styles.dropInfo}>{orderDetails.pickup_notes}</Text>
              </View>
              <View style={styles.contactInfoIcons}>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => {
                    const smsNumber = `sms:${orderDetails.enterpirse_mobile}`;
                    Linking.openURL(smsNumber);
                  }}>
                  <Image
                    style={{width: 32, height: 32}}
                    source={require('../../image/chat-icon.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    const phoneNumber = `tel:${orderDetails.enterpirse_mobile}`;
                    Linking.openURL(phoneNumber);
                  }}>
                  <Image
                    style={{width: 32, height: 32}}
                    source={require('../../image/call-icon.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {orderDetails?.locations &&
          orderDetails?.locations.map((location, index) => {
            const updateStatus = location.next_action_status;
            console.log('updateStatus ====>', updateStatus);
            return (
              <View key={index}>
                <View style={styles.packageCard}>
                  <View style={{width: '10%'}}>
                    <Image
                      style={styles.packageManager}
                      source={require('../../image/package-img.png')}
                    />
                  </View>
                  <View style={{marginLeft: 5, width: '89%'}}>
                    <View style={styles.pickupCardHeader}>
                      <Text style={styles.dropInfo}>{`Drop off ${
                        index + 1
                      } information`}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          const address = encodeURIComponent(
                            location.destination_description,
                          );
                          const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
                          Linking.openURL(url).catch(err =>
                            console.error('Failed to open Google Maps', err),
                          );
                        }}>
                        <Image
                          style={styles.startIcon}
                          source={require('../../image/Start-Icon.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.companyInfosmain}>
                      <View style={{width: '65%'}}>
                        <Text style={styles.companyInfo}>
                          {location.drop_company_name}
                        </Text>
                        <Text style={styles.dropInfo}>
                          {location.destination_description}
                        </Text>
                        <Text style={styles.dropInfo}>
                          {location?.drop_notes}
                        </Text>
                      </View>
                      <View style={styles.contactInfoIcons}>
                        <TouchableOpacity
                          style={{marginRight: 10}}
                          onPress={() => {
                            const smsNumber = `sms:${location.drop_mobile}`;
                            Linking.openURL(smsNumber);
                          }}>
                          <Image
                            style={{width: 32, height: 32}}
                            source={require('../../image/chat-icon.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            const phoneNumber = `tel:${location.drop_mobile}`;
                            Linking.openURL(phoneNumber);
                          }}>
                          <Image
                            style={{width: 32, height: 32}}
                            source={require('../../image/call-icon.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.borderShowOff} />

                    <View style={styles.packageBasicInfo}>
                      <Text style={styles.headingOTP}>{vehicleText}</Text>
                      <Text style={styles.subheadingOTP}>
                        {orderDetails.vehicle_type}
                      </Text>
                    </View>

                    <View style={styles.borderShowOff} />

                    <View style={styles.packageBasicInfo}>
                      <Text style={styles.headingOTP}>{orderID}:</Text>
                      <Text style={styles.subheadingOTP}>
                        {location.order_number}
                      </Text>
                    </View>

                    <View style={styles.borderShowOff} />

                    <View style={styles.packageBasicInfo}>
                      <Text style={styles.headingOTP}>{packagePhoto}</Text>
                      <TouchableOpacity onPress={() => toggleModal()}>
                        {orderDetails?.package_photo ? (
                          <Image
                            style={styles.packagePhoto}
                            source={{
                              uri: orderDetails?.package_photo,
                            }}
                          />
                        ) : (
                          <Image
                            style={styles.packagePhoto}
                            source={require('../../image/PackagePhoto.png')}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {route.params.orderItem.order_status ==
                'ORDER_ALLOCATED' ? null : (
                  //   <View
                  //   style={{
                  //     flexDirection: 'row',
                  //     justifyContent: 'space-evenly',
                  //     marginTop: 7,
                  //     marginBottom: 10,
                  //   }}>
                  //   <TouchableOpacity
                  //     onPress={() => {
                  //       handleOrderRequest(true);
                  //     }}
                  //     style={[styles.acceptOrReject, {backgroundColor: colors.primary}]}>
                  //     <Text style={styles.buttonText}>Accept</Text>
                  //   </TouchableOpacity>
                  //   <View style={{width: '1%'}} />
                  //   <TouchableOpacity
                  //     onPress={() => {
                  //       handleOrderRequest(false);
                  //     }}
                  //     style={[styles.acceptOrReject, {backgroundColor: colors.primary}]}>
                  //     <Text style={styles.buttonText}>Reject</Text>
                  //   </TouchableOpacity>
                  // </View>

                  <View style={styles.deliveryStatusCard}>
                    <View style={styles.deliveryinfo}>
                      <View style={styles.statusAboutDelivery}>
                        {/* <AntDesign name="check" size={15} color={'#FF0058'} /> */}
                        {/* <Octicons
                        name={ 'dot-fill'}
                        size={15}
                        color={
                          '#D9D9D9'
                        }
                      /> */}

                        <Octicons
                          name={
                            updateStatus == 'Ready to pickup' ||
                            updateStatus === null
                              ? 'dot-fill'
                              : 'check'
                          }
                          size={15}
                          color={
                            updateStatus == 'Ready to pickup' ||
                            updateStatus === null
                              ? '#D9D9D9'
                              : '#FF0058'
                          }
                        />
                        <Text style={styles.statusInfo}>{localizationText('Common', 'goingToPickup')}</Text>
                      </View>
                      <View style={styles.borderStyle} />

                      <View style={styles.statusAboutDelivery}>
                        {/* <AntDesign name="check" size={15} color={'#FF0058'} /> */}
                        <Octicons
                          name={
                            updateStatus == 'Reached' ||
                            updateStatus == 'Ready to pickup' ||
                            updateStatus === null
                              ? 'dot-fill'
                              : 'check'
                          }
                          size={15}
                          color={
                            updateStatus == 'Reached' ||
                            updateStatus == 'Ready to pickup' ||
                            updateStatus === null
                              ? '#D9D9D9'
                              : '#FF0058'
                          }
                        />
                        <Text style={styles.statusInfo}>{localizationText('Common', 'reached')}</Text>
                      </View>
                      <View style={styles.borderStyle} />

                      <View style={styles.statusAboutDelivery}>
                        <Octicons
                          name={
                            updateStatus == 'Completed' ? 'check' : 'dot-fill'
                          }
                          size={15}
                          color={
                            updateStatus == 'Completed' ? '#FF0058' : '#D9D9D9'
                          }
                        />
                        <Text style={styles.statusInfo}>{localizationText('Common', 'delivered')}</Text>
                      </View>
                    </View>
                    <View style={styles.earningCard}>
                      {delivered && (
                        <Text style={styles.boyEarning}>
                          This order is closed, you earned{' '}
                          <Text style={styles.earnedMoney}>€34</Text>
                        </Text>
                      )}
                    </View>
                    {updateStatus !== 'Completed' && (
                      <TouchableOpacity
                        onPress={() =>
                          handleStatusUpdated(updateStatus, location)
                        }
                        style={[
                          styles.logbutton,
                          {backgroundColor: colors.primary},
                        ]}
                        disabled={updateStatus == 'Completed' ? true : false}>
                        <Text style={styles.buttonText}>{updateStatus}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            );
          })}

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
              style={[
                styles.acceptOrReject,
                {backgroundColor: colors.primary},
              ]}>
              <Text style={styles.buttonText}>{localizationText('Common', 'accept')}</Text>
            </TouchableOpacity>
            <View style={{width: '1%'}} />
            <TouchableOpacity
              onPress={() => {
                handleOrderRequest(false);
              }}
              style={[
                styles.acceptOrReject,
                {backgroundColor: colors.primary},
              ]}>
              <Text style={styles.buttonText}>{localizationText('Common', 'reject')}</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* <View>
          <View style={styles.packageCard}>
            <View style={{width: '10%'}}>
              <Image
                style={styles.packageManager}
                source={require('../../image/package-img.png')}
              />
            </View>
            <View style={{marginLeft: 5, width: '89%'}}>
              <View style={styles.pickupCardHeader}>
                <Text style={styles.dropInfo}>Drop off 1 information</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DeliveryDetailsMultipleInvoice')
                  }>
                  <Image source={require('../../image/Track-Icon.png')} />
                </TouchableOpacity>
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
                <Text style={styles.headingOTP}>Vehicle:</Text>
                <Text style={styles.subheadingOTP}>Pickup Truck</Text>
              </View>

              <View style={styles.borderShowOff} />

              <View style={styles.packageBasicInfo}>
                <Text style={styles.headingOTP}>Package photo</Text>
                <TouchableOpacity onPress={() => toggleModal()}>
                  <Image
                    style={styles.packagePhoto}
                    source={require('../../image/PackagePhoto.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.borderShowOff} />

              <View>
                <Text style={styles.headingOTP}>Pickup notes</Text>
                <Text style={styles.dropInfo}>
                  Lorem ipsum dolor sit amet conse ctetur. Ridiculus nunc platea
                  sed.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.deliveryStatusCard}>
            <View style={styles.deliveryinfo}>
              <View style={styles.statusAboutDelivery}>
                <AntDesign name="check" size={15} color={'#FF0058'} />
                <Text style={styles.statusInfo}>Going to Pickupd</Text>
              </View>
              <View style={styles.borderStyle} />

              <View style={styles.statusAboutDelivery}>
                <AntDesign name="check" size={15} color={'#FF0058'} />
                <Text style={styles.statusInfo}>Reached</Text>
              </View>
              <View style={styles.borderStyle} />

              <View style={styles.statusAboutDelivery}>
                <Octicons
                  name={delivered ? 'check' : 'dot-fill'}
                  size={15}
                  color={delivered ? '#FF0058' : '#D9D9D9'}
                />
                <Text style={styles.statusInfo}>Delivered</Text>
              </View>
            </View>
            <View style={styles.earningCard}>
              {delivered && (
                <Text style={styles.boyEarning}>
                  This order is closed, you earned{' '}
                  <Text style={styles.earnedMoney}>€34</Text>
                </Text>
              )}
            </View>
            {!delivered && (
              <TouchableOpacity
                // onPress={handleMarkAsDelivered}
                onPress={() => toggleModalOTP()}
                style={[styles.logbutton, {backgroundColor: colors.primary}]}>
                <Text style={styles.buttonText}>Mark as Delivered</Text>
              </TouchableOpacity>
            )}
          </View>
        </View> */}

        {/* <View>
          <View style={styles.packageCard}>
            <View style={{width: '10%'}}>
              <Image
                style={styles.packageManager}
                source={require('../../image/package-img.png')}
              />
            </View>
            <View style={{marginLeft: 5, width: '89%'}}>
              <View style={styles.pickupCardHeader}>
                <Text style={styles.dropInfo}>Drop off 2 information</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DeliveryDetailsMultipleInvoice')
                  }>
                  <Image source={require('../../image/Track-Icon.png')} />
                </TouchableOpacity>
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
                <Text style={styles.headingOTP}>Vehicle:</Text>
                <Text style={styles.subheadingOTP}>Pickup Truck</Text>
              </View>
              
              <View style={styles.borderShowOff} />

              <View style={styles.packageBasicInfo}>
                <Text style={styles.headingOTP}>Package photo</Text>
                <TouchableOpacity onPress={() => toggleModal()}>
                  <Image
                    style={styles.packagePhoto}
                    source={require('../../image/PackagePhoto.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.borderShowOff} />

              <View>
                <Text style={styles.headingOTP}>Pickup notes</Text>
                <Text style={styles.dropInfo}>
                  Lorem ipsum dolor sit amet conse ctetur. Ridiculus nunc platea
                  sed.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.deliveryStatusCard}>
            <View style={styles.deliveryinfo}>
              <View style={styles.statusAboutDelivery}>
                <AntDesign name="check" size={15} color={'#FF0058'} />
                <Text style={styles.statusInfo}>Going to Pickupd</Text>
              </View>
              <View style={styles.borderStyle} />

              <View style={styles.statusAboutDelivery}>
                <AntDesign name="check" size={15} color={'#FF0058'} />
                <Text style={styles.statusInfo}>Reached</Text>
              </View>
              <View style={styles.borderStyle} />

              <View style={styles.statusAboutDelivery}>
                <Octicons
                  name={delivered ? 'check' : 'dot-fill'}
                  size={15}
                  color={delivered ? '#FF0058' : '#D9D9D9'}
                />
                <Text style={styles.statusInfo}>Delivered</Text>
              </View>
            </View>
            <View style={styles.earningCard}>
              {delivered && (
                <Text style={styles.boyEarning}>
                  This order is closed, you earned{' '}
                  <Text style={styles.earnedMoney}>€34</Text>
                </Text>
              )}
            </View>
            {!delivered && (
              <TouchableOpacity
                // onPress={handleMarkAsDelivered}
                onPress={() => toggleModalOTP()}
                style={[styles.logbutton, {backgroundColor: colors.primary}]}>
                <Text style={styles.buttonText}>Mark as Delivered</Text>
              </TouchableOpacity>
            )}
          </View>
        </View> */}
      </View>
      {/* Modal start here  */}
      <DeliveryboyPackagePreviewModal
        isImageModalVisible={isImageModalVisible}
        setImageModalVisible={setImageModalVisible}
      />
      {/* <DeliveryboySubmitOTPModal
        isOTPModalVisible={isOTPModalVisible}
        setOTPModalVisible={setOTPModalVisible}
      /> */}
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
    fontSize: 14,
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
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: '#f1f1f1',
    width: 15,
  },
  deliveryinfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusInfo: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    paddingHorizontal: 5,
  },
  statusAboutDelivery: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logbutton: {
    width: '100%',
    borderRadius: 5,
    marginVertical: 10,
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
    marginVertical: 10,
  },
  packageManager: {
    width: 30,
    height: 30,
  },
  acceptOrReject: {
    width: '48%',
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startIcon: {
    height: 23,
    width: 60,
  },
});

export default DeliveryDetailsMultipleOrder;
