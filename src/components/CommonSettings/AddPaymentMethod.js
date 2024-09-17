import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import {addConsumerPaymentMethod} from '../../data_manager';
import {useUserDetails} from '../commonComponent/StoreContext';

const AddPaymentMethod = ({navigation}) => {
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
    let params = {
      consumer_ext_id: userDetails.userDetails[0].ext_id,
      card_number: cardNumber,
      card_holder_name: nameOnCard,
      expiration_date: expiryDate,
      cvv: cvvNumber,
      payment_method_type_id: 1,
    };
    addConsumerPaymentMethod(
      params,
      successResponse => {
        console.log('successResponse', JSON.stringify(successResponse));
      },
      errorResponse => {
        console.log('errorResponse', JSON.stringify(errorResponse));
      },
    );
  };

  return (
    <View style={{backgroundColor: '#FBFAF5', flex: 1}}>
      <View style={{paddingHorizontal: 15, flex: 1}}>
        <View style={styles.addressCard}>
          <Image source={require('../../image/debitCard.png')} />
          <View style={{marginLeft: 5, flex: 1}}>
            <Text style={styles.paymentPlateform}>Debit/credit card</Text>
          </View>
          <TouchableOpacity onPress={toggleCardAdd}>
            <AntDesign name="down" size={15} color="#00000080" />
          </TouchableOpacity>
        </View>
        {toggleCheckBox && (
          <View
            style={{
              backgroundColor: colors.white,
              height: '55%',
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
                value={cardNumber}
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
                  value={expiryYear}
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
