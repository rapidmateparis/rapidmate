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
import {addPayment, createPickupOrder} from '../../data_manager';
import BicycleImage from '../../image/Bicycle.png';
import MotorbikeImage from '../../image/Motorbike.png';
import CarImage from '../../image/Car-Img.png';
import PartnerImage from '../../image/Partner.png';
import MiniTruckImage from '../../image/Mini-Truck.png';
import MiniVanImage from '../../image/Mini-Van.png';
import SemiTruckImage from '../../image/Semi-Truck.png';
import OtherImage from '../../image/Big-Package.png';
import {usePlacedOrderDetails} from '../commonComponent/StoreContext';

const PickupPayment = ({route, navigation}) => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [clientSecret, setClientSecret] = useState(null);
  const {setLoading} = useLoader();
  const {userDetails} = useUserDetails();
  const {savePlacedOrderDetails} = usePlacedOrderDetails();
  const [orderResponse, setOrderResponse] = useState();
  const params = route.params.props;
  var paymentAmount;
  if (typeof params.selectedVehiclePrice === 'number') {
    paymentAmount = params.selectedVehiclePrice.toFixed(2);
  } else {
    paymentAmount = params.selectedVehiclePrice;
  }
  const [orderNumber, setOrderNumber] = useState(0);

  const onPayment = async () => {
    placePickUpOrder();
  };

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
    }
  };

  const placePickUpOrder = async () => {
    if (userDetails.userDetails[0]) {
      console.log('params.schedule_date_time', params.schedule_date_time);
      if (params.serviceTypeId == 2) {
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
        ...scheduleParam,
      };
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
          navigation.navigate('PaymentSuccess');
        }
      },
      errorResponse => {
        setLoading(false);
        Alert.alert('Error Alert', '' + JSON.stringify(errorResponse), [
          {text: 'OK', onPress: () => {}},
        ]);
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
          <View style={[styles.distanceTime, {marginVertical: 15}]}>
            <EvilIcons name="location" size={18} color="#606060" />
            <Text style={styles.vehicleCapacity}>
              From{' '}
              {params.sourceLocation.sourceDescription
                ? params.sourceLocation.sourceDescription
                : ''}{' '}
              to{' '}
              {params.destinationLocation.destinationDescription
                ? params.destinationLocation.destinationDescription
                : ''}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.totalAmount, {flex: 1}]}>Total Amount</Text>
            <Text style={styles.totalAmount}>€ {paymentAmount}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('../../image/ticket-discount.png')} />
          <TextInput
            style={styles.input}
            placeholder="Promo code"
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={{
              backgroundColor: colors.secondary,
              paddingHorizontal: 20,
              paddingVertical: 13,
              borderTopRightRadius: 10,
              borderBottomEndRadius: 10,
            }}>
            <AntDesign name="check" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

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
        <View style={styles.ProceedCard}>
          <Text style={styles.proceedPayment}>€ {paymentAmount}</Text>
          <TouchableOpacity onPress={onPayment}>
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
    alignItems: 'center',
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
    marginTop: '50%',
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
