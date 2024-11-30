import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import {
  addConsumerPaymentMethod,
  addEnterprisePaymentMethod,
} from '../../data_manager';
import {useUserDetails} from '../commonComponent/StoreContext';
import {useLoader} from '../../utils/loaderContext';
import moment from 'moment';

const AddPaymentMethod = ({navigation}) => {
  const {setLoading} = useLoader();
  const {userDetails} = useUserDetails();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvvNumber, setCVVNumber] = useState('');

  const toggleCardAdd = () => {
    setToggleCheckBox(!toggleCheckBox);
  };

  const consumerPaymentMethod = () => {
    setLoading(true);
    let params = {
      card_number: cardNumber,
      card_holder_name: nameOnCard,
      cvv: cvvNumber,
      payment_method_type_id: 1,
    };

    if (userDetails.userDetails[0].role == 'CONSUMER') {
      params.consumer_ext_id = userDetails.userDetails[0].ext_id;
      params.expiration_date = expiryDate;
      addConsumerPaymentMethod(
        params,
        successResponse => {
          setLoading(false);
          Alert.alert('Success', successResponse[0]._response.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
        errorResponse => {
          setLoading(false);
          Alert.alert('Error Alert', errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    } else if (userDetails.userDetails[0].role == 'ENTERPRISE') {
      params.enterprise_ext = userDetails.userDetails[0].ext_id;
      params.is_del = 0;
      params.expiration_date = moment(expiryDate, 'MM/YY').format('YYYY-MM-DD');
      console.log('params', params);
      addEnterprisePaymentMethod(
        params,
        successResponse => {
          setLoading(false);
          Alert.alert('Success', successResponse[0]._response.message, [
            {
              text: 'OK',
              onPress: () => {
                navigation.pop();
              },
            },
          ]);
        },
        errorResponse => {
          console.log('errorResponse', errorResponse);
          setLoading(false);
          Alert.alert('Error Alert', errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    } else {
      setLoading(false);
    }
  };

  function formatExpiryDate(value) {
    let formattedValue = value.replace(/\D/g, '');

    if (formattedValue.length > 4) {
      formattedValue = formattedValue.slice(0, 4);
    }

    if (formattedValue.length >= 2) {
      let month = formattedValue.slice(0, 2);
      const year = formattedValue.slice(2);

      if (parseInt(month, 10) > 12) {
        month = '12';
      } else if (parseInt(month, 10) === 0) {
        month = '01';
      }

      return `${month}${year.length ? '/' : ''}${year}`;
    }

    return formattedValue;
  }

  function formatCardNumber(value) {
    let formattedValue = value.replace(/\D/g, '');

    if (formattedValue.length > 16) {
      formattedValue = formattedValue.slice(0, 16);
    }

    return formattedValue.replace(/(.{4})/g, '$1 ');
  }

  return (
    <View style={{backgroundColor: '#FBFAF5', flex: 1}}>
      <View style={{paddingHorizontal: 15, flex: 1}}>
        <TouchableOpacity onPress={toggleCardAdd}>
          <View style={styles.addressCard}>
            <Image source={require('../../image/debitCard.png')} />
            <View style={{marginLeft: 5, flex: 1}}>
              <Text style={styles.paymentPlateform}>Debit/credit card</Text>
            </View>
            <AntDesign name="down" size={15} color="#00000080" />
          </View>
        </TouchableOpacity>
        {toggleCheckBox && (
          <View
            style={{
              backgroundColor: colors.white,
              height: '65%',
              paddingHorizontal: 15,
            }}>
            <View>
              <Text style={styles.textlable}>Name on card</Text>
              <TextInput
                style={styles.inputTextStyle}
                placeholderTextColor="#999"
                placeholder="Type here"
                value={nameOnCard}
                onChangeText={text => setNameOnCard(text)}
              />
            </View>
            <View>
              <Text style={styles.textlable}>Card number</Text>
              <TextInput
                style={styles.inputTextStyle}
                placeholderTextColor="#999"
                placeholder="Type here"
                value={formatCardNumber(cardNumber)}
                onChangeText={text => setCardNumber(text)}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, marginRight: 10}}>
                <Text style={styles.textlable}>Expiry</Text>
                <TextInput
                  style={styles.inputTextStyle}
                  placeholderTextColor="#999"
                  placeholder="Type here"
                  value={formatExpiryDate(expiryDate)}
                  onChangeText={text => setExpiryDate(text)}
                />
              </View>

              <View style={{flex: 1, marginLeft: 10}}>
                <Text style={styles.textlable}>CVV</Text>
                <TextInput
                  style={styles.inputTextStyle}
                  placeholderTextColor="#999"
                  placeholder="Type here"
                  value={cvvNumber}
                  onChangeText={text => setCVVNumber(text)}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={consumerPaymentMethod}
              style={styles.buttonCard}>
              <Text style={styles.okButton}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* <View style={styles.addressCard}>
          <Image source={require('../../image/paypal-icon.png')} />
          <View style={{marginLeft: 5, flex: 1}}>
            <Text style={styles.paymentPlateform}>PayPal</Text>
          </View>
          <TouchableOpacity>
            <AntDesign name="down" size={15} color="#00000080" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <Image source={require('../../image/AppleIcon.png')} />
          <View style={{marginLeft: 5, flex: 1}}>
            <Text style={styles.paymentPlateform}>Apple Pay</Text>
          </View>
          <TouchableOpacity>
            <AntDesign name="down" size={15} color="#00000080" />
          </TouchableOpacity>
        </View> */}
      </View>
      <Image
        style={styles.bgImages}
        source={require('../../image/online_payments_bg.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 20,
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
  cardTitle: {
    fontSize: 14,
    flex: 1,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  paymentPlateform: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  mailId: {
    color: '#131314',
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
  },
  securePayment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  paymentInfo: {
    color: '#1D1617',
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
  },
  bgImages: {
    height: '30%',
    width: '80%',
    resizeMode: 'contain',
    opacity: 0.6,
  },
  textlable: {
    fontFamily: 'Montserrat-Medium',
    marginBottom: 7,
    marginTop: 15,
    fontSize: 12,
    color: colors.text,
  },
  inputTextStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 12,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  buttonCard: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
  },
  okButton: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    width: '80%',
    borderRadius: 8,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    textAlign: 'center',
  },
});

export default AddPaymentMethod;
