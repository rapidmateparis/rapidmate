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
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import BicycleImage from '../../image/Cycle-Icon.png';
import MotorbikeImage from '../../image/Motorbike.png';
import CarImage from '../../image/Car-Icon.png';
import PartnerImage from '../../image/Partner-icon.png';
import VanImage from '../../image/Van-Icon.png';
import PickupImage from '../../image/Pickup-Icon.png';
import TruckImage from '../../image/Truck-Icon.png';
import BigTruckImage from '../../image/Big-Package.png';
import {useLoader} from '../../utils/loaderContext';
import {
  addPayment,
  checkPromoCode,
  createEnterpriseOrder,
  createPickupOrder,
  getEnterprisePaymentMethod,
  getTaxDetails,
} from '../../data_manager';
import {
  usePlacedOrderDetails,
  useUserDetails,
} from '../commonComponent/StoreContext';
import {useStripe} from '@stripe/stripe-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {localizationText, localToUTC} from '../../utils/common';
import {API} from '../../utils/constant';

const EnterpriseOrderPayment = ({route, navigation}) => {
  const params = route.params;
  const {setLoading} = useLoader();
  const [orderNumber, setOrderNumber] = useState(null);
  const [isScheduledOrder, setIsScheduledOrder] = useState(0);
  const [scheduledDateTime, setScheduledDateTime] = useState(null);
  const {savePlacedOrderDetails} = usePlacedOrderDetails();
  const [orderResponse, setOrderResponse] = useState();
  const [clientSecret, setClientSecret] = useState(null);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const {userDetails} = useUserDetails();
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [vechicleTax, setVechicleTax] = useState(20);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(totalAmount);
  const [promoCodeResponse, setPromoCodeResponse] = useState();
  const [promoCode, setPromoCode] = useState('');
  const toText = localizationText('Common', 'to') || 'To';
  const discountText = localizationText('Common', 'discount') || 'Discount';
  const payLaterText = localizationText('Common', 'payLater') || 'Pay Later';
  const creditDebitCards = localizationText('Common', 'creditDebitCards') || '';

  console.log('params =====>,', params);

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

  useEffect(() => {
    if (orderNumber) {
      // setLoading(true)
      if (selectedOptionIndex != 99) {
        // setLoading(false)
      } else {
        if (params.is_scheduled_order === 1) {
          navigation.navigate('ScheduleOrderSuccess', {
            schedule_date_time: scheduledDateTime,
            serviceTypeId: 1,
          });
        } else {
          navigation.navigate('EnterpriseLookingForDriver', {
            cancellable: orderResponse.is_enable_cancel_request,
          });
        }
        // navigation.navigate('EnterpriseLookingForDriver', {
        //   cancellable: orderResponse.is_enable_cancel_request,
        // });
      }
    }
  }, [orderNumber, scheduledDateTime, isScheduledOrder]);

  useEffect(() => {
    if (orderNumber) {
      createPaymentIntent();
    }
  }, [orderNumber]);

  useEffect(() => {
    getTaxDetails(
      success => {
        if (success[0]._response[0].tax_value) {
          setVechicleTax(parseFloat(success[0]._response[0].tax_value));
        }
      },
      error => {
        console.log('error ====== ===== ', error);
      },
    );
  }, []);

  useEffect(() => {
    // console.log(userDetails.userDetails[0]);
    //getPaymentMethod();
  }, []);

  const getPaymentMethod = () => {
    setLoading(true);
    getEnterprisePaymentMethod(
      userDetails.userDetails[0].ext_id,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._response.length > 0) {
          setPaymentMethod(successResponse[0]._response);
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

  const createPaymentIntent = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.stripe.com/v1/payment_intents',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer sk_test_51PgiLhLF5J4TIxENpifRFYuB13xzQzszqugfYchc33Meu4vh6zDM6tDCX0Fbv863qGGfM69PwF1CTHwkiSEm5XHv00wtIuDU2O', // Replace with your test secret key
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            amount: parseInt(paymentAmount * 100),
            // amount: params.amount * 100, // Amount in cents
            currency: 'EUR',
            //payment_method_types: ['card', 'google_pay']
          }).toString(),
        },
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }
      setClientSecret(data.client_secret);
      setup(data.client_secret);
    } catch (error) {
      // Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const setup = async client_secret => {
    console.log('setup called ' + client_secret);
    const {error} = await initPaymentSheet({
      merchantDisplayName: 'RapidMate LLC',
      paymentIntentClientSecret: client_secret, // retrieve this from your server
    });
    console.log('érror', error);
    if (!error) {
      checkout();
    } else {
      Alert.alert('Payment Error', error.message);
    }
  };

  const checkout = async () => {
    console.log('orderNumber=========================>', orderNumber);
    const {error} = await presentPaymentSheet();
    if (!error) {
      createPayment();
    }
  };

  const createPayment = async () => {
    let requestParams = {
      order_number: orderNumber,
      amount: params.amount,
      order_type: 2,
    };
    console.log('requestParams', params);
    setLoading(true);
    addPayment(
      requestParams,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          if (params.is_scheduled_order === 1) {
            navigation.navigate('ScheduleOrderSuccess', {
              schedule_date_time: params.schedule_date_time,
              serviceTypeId: params.delivery_type_id,
            });
          } else {
            navigation.navigate('EnterpriseLookingForDriver', {
              cancellable: orderResponse.is_enable_cancel_request,
            });
          }
        }
      },
      errorResponse => {
        setLoading(false);
        // Alert.alert('Error Alert', '' + JSON.stringify(errorResponse), [
        //   {text: 'OK', onPress: () => {}},
        // ]);
      },
    );
  };

  const onPayment = async () => {
    // if (selectedOptionIndex == -1) {
    //   Alert.alert('Error Alert', 'Please choose a payment method', [
    //     {text: 'OK', onPress: () => {}},
    //   ]);
    // } else {
    placeEnterpriseOrder();
    // }
  };

  const placeEnterpriseOrder = async () => {
    console.log('total_duration ====>');
    console.log('requestParams from props ******', params);
    // paymentAmount
    try {
      const time = params?.distanceTime?.time
        ? parseFloat(params.distanceTime.time).toFixed(2)
        : 0;

      let requestParams = {
        enterprise_ext_id: userDetails.userDetails[0].ext_id,
        branch_id: params.branch_id,
        delivery_type_id: params.delivery_type_id,
        service_type_id: 2,
        vehicle_type_id: params.vehicle_type.vehicle_type_id,
        pickup_location_id: params.pickup_location_id,
        dropoff_location_id: params.dropoff_location_id,
        is_repeat_mode: params.is_repeat_mode,
        repeat_day: '',
        is_my_self: 1,
        first_name: userDetails.userDetails[0].first_name,
        last_name: userDetails.userDetails[0].last_name,
        company_name: params.company_name,
        email: userDetails.userDetails[0].email,
        mobile: params.mobile,
        package_id: params.package_id,
        pickup_notes: params.pickup_notes,
        is_same_dropoff_location: 0,
        repeat_dropoff_location_id: '',
        distance: parseFloat(params.distance).toFixed(1),
        total_duration: time,

        total_amount: parseFloat(paymentAmount),
        package_photo: API.imageViewUrl + params.imageId, //'https://example.com/package.jpg',
        repeat_mode: params.repeat_mode,
        repeat_every: params.repeat_every,
        repeat_until: params.repeat_until,
        // pickup_date: moment(localToUTC(params.pickup_date)).format('YYYY-MM-DD'),  //**
        // pickup_time: moment(localToUTC(params.pickup_time)).format('hh:mm'),  //
        is_scheduled_order: params.is_scheduled_order,
      };

      if (params?.drop_details) {
        requestParams = {
          ...requestParams,
          drop_first_name: params.drop_details.drop_first_name,
          drop_last_name: params.drop_details.drop_last_name,
          drop_mobile: params.drop_details.drop_mobile,
          drop_notes: params.drop_details.drop_notes,
          drop_email: params.drop_details.drop_email,
          drop_company_name: params.drop_details.drop_company_name,
        };
      } else if (params?.dropDetails && params?.dropDetails.length > 0) {
        requestParams = {...requestParams, branches: params?.dropDetails};
      }

      if (params.order_date) {
        requestParams = {
          ...requestParams,
          order_date: localToUTC(params.order_date),
        };
      } else {
        // requestParams={...requestParams,schedule_date_time:localToUTC(params.schedule_date_time)}
        requestParams = {
          ...requestParams,
          order_date: localToUTC(params.schedule_date_time),
        };
      }
      if (promoCodeResponse) {
        requestParams.promo_code = promoCodeResponse.promoCode;
        requestParams.promo_value = promoCodeResponse.discount;
        requestParams.order_amount = parseFloat(totalAmount);
      }
      if (orderNumber) {
        createPaymentIntent();
      } else {
        setLoading(true);
        createEnterpriseOrder(
          requestParams,
          successResponse => {
            setLoading(false);
            if (successResponse[0]._success) {
              console.log(
                'createEnterpriseOrder',
                successResponse[0]._response,
              );
              const orderNumberFromAPI =
                successResponse[0]._response[0].order_number;
              savePlacedOrderDetails(successResponse[0]._response);
              setOrderResponse(successResponse[0]._response[0]);
              setOrderNumber(orderNumberFromAPI);
              setIsScheduledOrder(params.is_scheduled_order);
              setScheduledDateTime(params.schedule_date_time);
              // createPaymentIntent();
            }
          },
          errorResponse => {
            setLoading(false);
            console.log(
              'createEnterpriseOrder==>errorResponse',
              errorResponse[0],
            );
            Alert.alert('Error Alert', errorResponse[0]._errors.message, [
              {text: 'OK', onPress: () => {}},
            ]);
          },
        );
      }
    } catch (error) {
      console.log('error==>errorResponse', error);
    }
  };

  const getTaxAmount = () => {
    const amount =
      typeof params.amount === 'number'
        ? params.amount.toFixed(2)
        : parseFloat(params.amount);
    console.log('amount is ', amount, 'and vechile tax is ', vechicleTax);
    const taxAmount = (parseFloat(amount) * parseFloat(vechicleTax)) / 100;
    return taxAmount ? taxAmount.toFixed(2) : 0;
  };
  useEffect(() => {
    const amount =
      typeof params.amount === 'number'
        ? params.amount.toFixed(2)
        : parseFloat(params.amount);
    console.log('amount is ', amount, 'and vechile tax is ', vechicleTax);
    const taxAmount = (parseFloat(amount) * parseFloat(vechicleTax)) / 100;
    const total_Amount = parseFloat(amount) + taxAmount;
    if (total_Amount) {
      setTotalAmount(total_Amount.toFixed(2));
      setPaymentAmount(total_Amount.toFixed(2));
    }
  }, [vechicleTax]);

  const applyPromoCode = () => {
    let params = {
      promoCode: promoCode,
      orderAmount: paymentAmount,
    };
    checkPromoCode(
      params,
      successResponse => {
        console.log(
          'applyPromoCode==>successResponse',
          JSON.stringify(successResponse),
        );
        if (successResponse[0]._success) {
          const promoResponse = successResponse[0]._response[0];
          setPromoCodeResponse(promoResponse);
          setPaymentAmount(successResponse[0]._response[0].totalAmount);
        }
      },
      errorResponse => {
        console.log(
          'applyPromoCode==>errorResponse',
          JSON.stringify(errorResponse),
        );
      },
    );
  };

  const formatAmount = amount => {
    const [intPart, decimalPart = '00'] = Number(amount).toFixed(2).split('.');
    const paddedInt = intPart.length === 1 ? `0${intPart}` : intPart;
    return `${paddedInt}.${decimalPart}`;
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.pickupCard}>
          <View style={styles.semiTruckDetails}>
            <View style={{marginRight: 15}}>
              <Image
                style={[styles.vehicleImage, {width: 100, height: 100}]}
                source={getVechicleImage(params.vehicle_type.vehicle_type_id)}
              />
            </View>
            <View>
              <Text style={styles.vehicleName}>
                {localizationText('Common', 'orderSummary')}
              </Text>
              <Text style={styles.vehicleCapacity}>
                {params.vehicle_type.vehicle_type}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.vehicleCapacity, {marginRight: 10}]}>
                  {params.distance} Km
                </Text>
                <Text style={styles.vehicleCapacity}>{params.time} min</Text>
              </View>
            </View>
          </View>
          <View style={{marginBottom: 10}}>
            <View style={styles.distanceTime}>
              <EvilIcons name="location" size={18} color="#606060" />
              <Text style={styles.vehicleCapacity}>
                {localizationText('Common', 'from')} -{' '}
                {params.pickup_location?.sourceDescription}
              </Text>
            </View>

            {params?.dropDetails?.length > 0 ? (
              params?.dropDetails.map(dropLocation => {
                return (
                  <View style={styles.distanceTime}>
                    <EvilIcons name="location" size={18} color="#606060" />
                    <Text style={styles.vehicleCapacity}>
                      {toText} - {dropLocation.destinationDescription}
                    </Text>
                  </View>
                );
              })
            ) : (
              <View style={styles.distanceTime}>
                <EvilIcons name="location" size={18} color="#606060" />
                <Text style={styles.vehicleCapacity}>
                  {toText} - {params.dropoff_location.destinationDescription}
                </Text>
              </View>
            )}
          </View>

          <View style={{flexDirection: 'row', marginVertical: 3}}>
            <Text style={[styles.totalAmount, {flex: 1}]}>
              {localizationText('Common', 'orderFare')}
            </Text>
            <Text style={styles.totalAmount}>
              € {formatAmount(params.amount)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 3}}>
            <Text style={[styles.totalAmount, {flex: 1}]}>
              {localizationText('Common', 'tax')}
            </Text>
            <Text style={styles.totalAmount}>
              € {formatAmount(getTaxAmount())}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 3}}>
            <Text style={[styles.totalAmount, {flex: 1}]}>
              {localizationText('Common', 'totalAmount')}
            </Text>
            <Text style={styles.totalAmount}>
              € {formatAmount(totalAmount)}
            </Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('../../image/ticket-discount.png')} />
          <TextInput
            style={styles.input}
            placeholder={localizationText('Common', 'promoCode')}
            placeholderTextColor="#999"
            editable={promoCodeResponse ? false : true}
            onChangeText={text => setPromoCode(text)}
          />

          {promoCodeResponse ? (
            <TouchableOpacity
              style={{
                backgroundColor: colors.secondary,
                paddingHorizontal: 20,
                paddingVertical: 13,
                borderTopRightRadius: 10,
                borderBottomEndRadius: 10,
              }}
              onPress={() => {
                setPromoCodeResponse(null);
                setPaymentAmount(totalAmount);
              }}>
              <AntDesign name="close" size={20} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: colors.secondary,
                paddingHorizontal: 20,
                paddingVertical: 13,
                borderTopRightRadius: 10,
                borderBottomEndRadius: 10,
              }}
              onPress={applyPromoCode}>
              <AntDesign name="check" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {promoCodeResponse && (
          <Text
            style={[
              styles.discountInfo,
              {fontSize: 16, alignSelf: 'flex-end'},
            ]}>
            {discountText}: € {promoCodeResponse.discount}
          </Text>
        )}

        {paymentMethod.length > 0 && (
          <>
            <View>
              <Text style={styles.selectPaymentMethod}>{creditDebitCards}</Text>
            </View>

            <View style={[styles.inputContainer, {flexDirection: 'column'}]}>
              {paymentMethod.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedOptionIndex(index);
                    }}
                    style={{
                      flexDirection: 'row',
                      padding: 15,
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        style={{marginRight: 20}}
                        source={require('../../image/logos_mastercard.png')}
                      />
                      <Text
                        style={[styles.selectPaymentMethod, {marginRight: 10}]}>
                        {item.card_holder_name}
                      </Text>
                      <Text style={styles.selectPaymentMethod}>
                        {item.card_number}
                      </Text>
                    </View>

                    {selectedOptionIndex == index ? (
                      <FontAwesome
                        name="dot-circle-o"
                        size={25}
                        color={colors.secondary}
                      />
                    ) : (
                      <FontAwesome
                        name="circle-thin"
                        size={25}
                        color={colors.text}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
              {userDetails.userDetails[0].is_pay_later == 1 ? (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedOptionIndex(99);
                  }}
                  style={{
                    flexDirection: 'row',
                    padding: 15,
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.selectPaymentMethod}>
                      {payLaterText}
                    </Text>
                  </View>

                  {selectedOptionIndex == 99 ? (
                    <FontAwesome
                      name="dot-circle-o"
                      size={25}
                      color={colors.secondary}
                    />
                  ) : (
                    <FontAwesome
                      name="circle-thin"
                      size={25}
                      color={colors.text}
                    />
                  )}
                </TouchableOpacity>
              ) : null}
            </View>
          </>
        )}

        {/* <View style={styles.discountCard}>
          <Image
            style={{marginRight: 20}}
            source={require('../../image/Group.png')}
          />
          <Text style={styles.discountInfo}>
            20% {localizationText('Common', 'creditCardsOff')}
          </Text>
        </View> */}
        <View style={styles.ProceedCard}>
          <Text style={styles.proceedPayment}>
            <Text>€</Text>
            {paymentAmount}
          </Text>
          <TouchableOpacity onPress={onPayment}>
            <Text style={styles.PayText}>
              {localizationText('Common', 'proceedToPay')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  vehicleCard: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 5,
    marginTop: 5,
  },
  semiTruckDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleName: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  vehicleCapacity: {
    color: colors.subText,
    fontSize: 12,
    marginVertical: 2,
    fontFamily: 'Montserrat-Regular',
  },
  pickupCard: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 5,
    marginTop: 5,
  },
  pickupDetails: {
    marginBottom: 10,
    color: colors.text,
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
  },
  pickupManDetails: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginVertical: 10,
  },
  contactInfo: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 3,
    color: colors.text,
  },
  pickupinfoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickupNotes: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  bookininfo: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: colors.text,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  logbutton: {
    width: '100%',
    marginTop: 20,
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  distanceTime: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  totalAmount: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
    color: colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingLeft: 20,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 10,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  selectPaymentMethod: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: colors.text,
  },
  discountCard: {
    backgroundColor: '#FF00580F',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  discountInfo: {
    color: colors.secondary,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  ProceedCard: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 20,
  },
  PayText: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    borderRadius: 8,
    color: colors.text,
    opacity: 0.7,
  },
  proceedPayment: {
    color: colors.text,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  vehicleImage: {
    height: 62,
    resizeMode: 'center',
  },
});

export default EnterpriseOrderPayment;
