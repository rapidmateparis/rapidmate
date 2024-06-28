import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';

const AddPaymentMethod = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
      <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5',}}>
        <View style={{paddingHorizontal: 15, zIndex: 2,}}>
          <View style={styles.addressCard}>
            <Image source={require('../../image/debitCard.png')} />
            <View style={{marginLeft: 5, flex: 1}}>
              <Text style={styles.paymentPlateform}>Debit/credit card</Text>
            </View>
            <TouchableOpacity>
              <AntDesign name="down" size={15} color="#00000080" />
            </TouchableOpacity>
          </View>

          <View style={styles.addressCard}>
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
          </View>

        </View>
        <ImageBackground
          style={styles.bgImages}
          source={require('../../image/online_payments_bg.png')}
        />
      </ScrollView>
 
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 280,
    resizeMode: 'cover',
    zIndex: 0,
  },
});

export default AddPaymentMethod;
