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
import {useStripe} from '@stripe/stripe-react-native';
import {useUserDetails} from '../commonComponent/StoreContext';
import {useLoader} from '../../utils/loaderContext';
import {
  addPayment,
  checkPromoCode,
  createPickupOrder,
  orderStatusUpdate,
} from '../../data_manager';
import BicycleImage from '../../image/Bicycle.png';
import MotorbikeImage from '../../image/Motorbike.png';
import CarImage from '../../image/Car-Img.png';
import PartnerImage from '../../image/Partner.png';
import MiniTruckImage from '../../image/Mini-Truck.png';
import MiniVanImage from '../../image/Mini-Van.png';
import SemiTruckImage from '../../image/Semi-Truck.png';
import OtherImage from '../../image/Big-Package.png';
import {usePlacedOrderDetails} from '../commonComponent/StoreContext';
import {debounce} from 'lodash';

const PickupPayment = ({route, navigation}) => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [clientSecret, setClientSecret] = useState(null);
  const {setLoading} = useLoader();
  const {userDetails} = useUserDetails();
  const {savePlacedOrderDetails} = usePlacedOrderDetails();
  const [orderResponse, setOrderResponse] = useState();
  const [promoCode, setPromoCode] = useState('');
  const params = route.params.props;
  const [totalAmount, setTotalAmount] = useState(
    typeof params.selectedVehiclePrice === 'number'
      ? params.selectedVehiclePrice.toFixed(2)
      : params.selectedVehiclePrice,
  );
  const [paymentAmount, setPaymentAmount] = useState(totalAmount);
  const [promoCodeResponse, setPromoCodeResponse] = useState();
  const [orderNumber, setOrderNumber] = useState(0);
  const [offerDiscount, setOfferDiscount] = useState(params.paymentDiscount);

  const onPayment = async () => {
    placePickUpOrder();
  };

  function calculateFinalPrice(originalPrice, discountPercentage) {
    console.log(originalPrice, discountPercentage);
    const discount = (originalPrice * discountPercentage) / 100;
    const finalPrice = originalPrice - discount;
    console.log(finalPrice);
    return finalPrice.toFixed(2);
  }

  useEffect(() => {
    {
      offerDiscount > 0 &&
        setPaymentAmount(calculateFinalPrice(paymentAmount, offerDiscount));
    }
  }, []);

  useEffect(() => {
    if (orderNumber) {
      createPaymentIntent();
    }
  }, [orderNumber]);

  useEffect(() => {}, [orderResponse]);

  const createPaymentIntent = async () => {
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
            amount: parseInt(paymentAmount * 100), // Amount in cents
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
      Alert.alert('Error', error.message);
    }
  };

  const setup = async client_secret => {
    console.log('setup called ' + client_secret);
    const {error} = await initPaymentSheet({
      merchantDisplayName: 'RapidMate LLC',
      paymentIntentClientSecret: client_secret, // retrieve this from your server
    });
    if (!error) {
      checkout();
    } else {
      Alert.alert('Payment Error', error.message);
    }
  };

  const checkout = async () => {
    const {error} = await presentPaymentSheet();
    console.log('érror', error);
    if (!error) {
      createPayment();
    } else {
      Alert.alert('Error Alert', error.message, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Go Home',
          onPress: () => navigation.navigate('PickupBottomNav'),
        },
      ]);
    }
  };


  const getCurrentDateAndTime =()=>{ // return format like YYYY-MM-DD HH:mm:ss
    const currentDate = new Date()
    const date = currentDate.getDate() > 9 ? currentDate.getDate() :'0'+currentDate.getDate()
    const month = currentDate.getMonth()+1  > 9 ? currentDate.getMonth()+1 :'0'+currentDate.getMonth()+1
    const year = currentDate.getFullYear()

    const hour = currentDate.getHours() > 9 ? currentDate.getHours() :'0'+currentDate.getHours()
    const min = currentDate.getMinutes() > 9 ? currentDate.getMinutes() :'0'+currentDate.getMinutes()
    const sec = currentDate.getSeconds() > 9 ? currentDate.getSeconds() :'0'+currentDate.getSeconds()

    return `${year}-${month}-${date} ${hour}:${min}:${sec}`

  }

  const placePickUpOrder = async () => {
    if (userDetails.userDetails[0]) {
      console.log('params.schedule_date_time', params.schedule_date_time);
      if (params.serviceTypeId == 1) {
        var scheduleParam = {schedule_date_time: params.schedule_date_time};
      }
      let requestParams = {
        consumer_ext_id: userDetails.userDetails[0].ext_id,
        service_type_id: params.serviceTypeId,
        vehicle_type_id: params.selectedVehicleDetails.id,
        pickup_location_id: params.sourceLocationId
          ? params.sourceLocationId
          : 1,
        dropoff_location_id: params.destinationLocationId
          ? params.destinationLocationId
          : 2,
        distance: parseFloat(params.distanceTime.distance.toFixed(1)),
        total_amount: parseFloat(paymentAmount),
        discount: offerDiscount,
        pickup_notes: params.userDetails.pickupNotes,
        company_name: params.userDetails.company,
        ...scheduleParam,

        drop_first_name: params.drop_details.drop_first_name,
        drop_last_name: params.drop_details.drop_last_name,
        drop_mobile: params.drop_details.drop_mobile,
        drop_notes: params.drop_details.drop_notes,
        drop_email: params.drop_details.drop_email,
        drop_company_name: params.drop_details.drop_company_name,
        order_date: getCurrentDateAndTime()
      };

      if (promoCodeResponse) {
        requestParams.promo_code = promoCodeResponse.promoCode;
        requestParams.promo_value = promoCodeResponse.discount;
        requestParams.order_amount = parseFloat(totalAmount);
      }

      setLoading(true);
      createPickupOrder(
        requestParams,
        successResponse => {
          if (successResponse[0]._success) {
            console.log('placePickUpOrder', successResponse[0]._response);
            savePlacedOrderDetails(successResponse[0]._response);
            setOrderResponse(successResponse[0]._response);
            setLoading(false);
            setOrderNumber(successResponse[0]._response[0].order_number);
          }
        },
        errorResponse => {
          setLoading(false);
          console.log('createPickupOrder==>errorResponse', errorResponse[0]);
          Alert.alert('Error Alert', errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    } else {
      Alert.alert('Error Alert', 'Consumer extended ID missing', [
        {text: 'OK', onPress: () => {}},
      ]);
    }
  };

  const createPayment = async () => {
    let requestParams = {
      order_number: orderNumber,
      amount: paymentAmount,
    };
    setLoading(true);
    addPayment(
      requestParams,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          navigation.navigate('PaymentSuccess',{
            schedule_date_time: params.schedule_date_time,
            serviceTypeId:params.serviceTypeId
          });
        }
      },
      errorResponse => {
        Alert.alert('Error Alert', '' + errorResponse[0]._errors.message, [
          {
            text: 'OK',
            onPress: () => {
              let params = {
                order_number: orderNumber,
                status: 'Payment Failed',
              };
              orderStatusUpdate(
                params,
                successResponse => {
                  console.log('message===>', JSON.stringify(successResponse));
                },
                errorResponse => {
                  setLoading(false);
                  console.log('message===>', JSON.stringify(errorResponse));
                },
              );
            },
          },
        ]);
      },
    );
  };

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

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.pickupCard}>
          <View style={styles.semiTruckDetails}>
            <View style={{marginRight: 15}}>
              <Image
                style={[styles.vehicleImage, {width: 100, height: 100}]}
                source={
                  params.selectedVehicle == 'Cycle'
                    ? BicycleImage
                    : params.selectedVehicle == 'Scooter'
                    ? MotorbikeImage
                    : params.selectedVehicle == 'Car'
                    ? CarImage
                    : params.selectedVehicle == 'Partner'
                    ? PartnerImage
                    : params.selectedVehicle == 'Pickup'
                    ? MiniTruckImage
                    : params.selectedVehicle == 'Van'
                    ? MiniVanImage
                    : params.selectedVehicle == 'Truck'
                    ? SemiTruckImage
                    : OtherImage
                }
              />
            </View>
            <View>
              <Text style={styles.vehicleName}>Order Summary</Text>
              <Text style={styles.vehicleCapacity}>
                {params.selectedVehicle}{' '}
                {params.selectedVehicleDetails.capacity}
              </Text>
              <View style={styles.distanceTime}>
                <Text style={[styles.vehicleCapacity, {marginRight: 10}]}>
                  {params.distanceTime.distance.toFixed(1)} Km
                </Text>
                <Text style={styles.vehicleCapacity}>
                  {params.distanceTime.time.toFixed(0)} min
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.distanceTime, {marginVertical: 3}]}>
            <EvilIcons name="location" size={18} color="#606060" />
            <Text style={styles.vehicleCapacity}>
              From:{' '}
              {params.sourceLocation.sourceDescription
                ? params.sourceLocation.sourceDescription
                : ''}{' '}
            </Text>
          </View>

          <View style={styles.distanceTime}>
            <EvilIcons name="location" size={18} color="#606060" />
            <Text style={styles.vehicleCapacity}>
              To:{' '}
              {params.destinationLocation.destinationDescription
                ? params.destinationLocation.destinationDescription
                : ''}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.totalAmount, {flex: 1}]}>Total Amount</Text>
            <Text style={styles.totalAmount}>€ {totalAmount}</Text>
          </View>
        </View>

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: promoCodeResponse
                ? colors.lightGrey
                : colors.white,
            },
          ]}>
          <Image source={require('../../image/ticket-discount.png')} />
          <TextInput
            style={styles.input}
            placeholder="Promo code"
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
            Discount: € {promoCodeResponse.discount}
          </Text>
        )}

        <View>
          <Text style={styles.selectPaymentMethod}>Credit & Debit Cards</Text>
        </View>

        <View style={styles.discountCard}>
          <Image
            style={{marginRight: 20}}
            source={require('../../image/Group.png')}
          />
          <Text style={styles.discountInfo}>
            20% off on city bank credit card!
          </Text>
        </View>

        {offerDiscount > 0 && (
          <View style={styles.discountCard}>
            <Image
              style={{marginRight: 20}}
              source={require('../../image/Group.png')}
            />
            <Text style={styles.discountInfo}>
              {offerDiscount}% off on{' '}
              {params.serviceTypeId == 2
                ? 'Schedule Order'
                : 'Pickup&Drop Order'}
            </Text>
          </View>
        )}

        <View style={styles.ProceedCard}>
          <Text style={styles.proceedPayment}>€ {paymentAmount}</Text>
          <TouchableOpacity onPress={debounce(onPayment, 500)}>
            <Text style={styles.PayText}>Proceed to pay</Text>
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
    // alignItems: 'center',
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
    marginVertical: 15,
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
    marginTop: 100,
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

export default PickupPayment;
