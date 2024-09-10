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
  createEnterpriseOrder,
  createPickupOrder,
} from '../../data_manager';
import {
  usePlacedOrderDetails,
  useUserDetails,
} from '../commonComponent/StoreContext';
import {useStripe} from '@stripe/stripe-react-native';

const EnterpriseOrderPayment = ({route, navigation}) => {
  const params = route.params;
  const {setLoading} = useLoader();
  const [orderNumber, setOrderNumber] = useState(null);
  const {savePlacedOrderDetails} = usePlacedOrderDetails();
  const [orderResponse, setOrderResponse] = useState();
  const [clientSecret, setClientSecret] = useState(null);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const {userDetails} = useUserDetails();

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
      createPaymentIntent();
    }
  }, [orderNumber]);

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
            amount: params.amount * 100, // Amount in cents
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
    console.log('érror', error);
    if (!error) {
      checkout();
    } else {
      Alert.alert('Payment Error', error.message);
    }
  };

  const checkout = async () => {
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
    console.log('requestParams', requestParams);
    setLoading(true);
    addPayment(
      requestParams,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          navigation.navigate('EnterpriseLookingForDriver');
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

  const onPayment = async () => {
    placeEnterpriseOrder();
  };

  const placeEnterpriseOrder = async () => {
    let requestParams = {
      enterprise_ext_id: userDetails.userDetails[0].ext_id,
      branch_id: params.branch_id,
      delivery_type_id: 1,
      service_type_id: 2,
      vehicle_type_id: params.vehicle_type.vehicle_type_id,
      pickup_date: params.pickup_date,
      pickup_time: params.pickup_time,
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
      package_note: params.package_note,
      is_same_dropoff_location: 0,
      repeat_dropoff_location_id: '',
      distance: parseFloat(params.distance).toFixed(1),
      total_amount: parseFloat(params.amount),
      package_photo: 'https://example.com/package.jpg',
      repeat_mode: params.repeat_mode,
      repeat_every: params.repeat_every,
      repeat_until: params.repeat_until,
    };
    console.log('requestParams', requestParams);
    setLoading(true);
    createEnterpriseOrder(
      requestParams,
      successResponse => {
        if (successResponse[0]._success) {
          console.log('createEnterpriseOrder', successResponse[0]._response);
          savePlacedOrderDetails(successResponse[0]._response);
          setOrderResponse(successResponse[0]._response);
          setLoading(false);
          setOrderNumber(successResponse[0]._response[0].order_number);
        }
      },
      errorResponse => {
        setLoading(false);
        console.log('createEnterpriseOrder==>errorResponse', errorResponse[0]);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
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
                source={getVechicleImage(params.vehicle_type.vehicle_type_id)}
              />
            </View>
            <View>
              <Text style={styles.vehicleName}>Order Summary</Text>
              <Text style={styles.vehicleCapacity}>
                {params.vehicle_type.vehicle_type}
              </Text>
              <View style={styles.distanceTime}>
                <Text style={[styles.vehicleCapacity, {marginRight: 10}]}>
                  {params.distance} Km
                </Text>
                <Text style={styles.vehicleCapacity}>{params.time} min</Text>
              </View>
            </View>
          </View>
          <View style={[styles.distanceTime, {marginVertical: 15}]}>
            <EvilIcons name="location" size={18} color="#606060" />
            <Text style={styles.vehicleCapacity}>
              From {params.pickup_location.sourceDescription}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.totalAmount, {flex: 1}]}>Total Amount</Text>
            <Text style={styles.totalAmount}>
              <Text>€</Text> {params.amount}
            </Text>
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
          <Text style={styles.selectPaymentMethod}>Credi & Debit Cards</Text>
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
          <Text style={styles.proceedPayment}>
            <Text>€</Text>
            {params.amount}
          </Text>
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

export default EnterpriseOrderPayment;
