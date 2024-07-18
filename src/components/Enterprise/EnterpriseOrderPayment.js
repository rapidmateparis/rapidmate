import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';

const EnterpriseOrderPayment = ({navigation}) => {
  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.pickupCard}>
          <View style={styles.semiTruckDetails}>
            <View style={{marginRight: 15}}>
              <Image
                style={{width: 90, height: 70}}
                source={require('../../image/semi-truck-small.png')}
              />
            </View>
            <View>
              <Text style={styles.vehicleName}>Order Summary</Text>
              <Text style={styles.vehicleCapacity}>Semi truck 20000 liter</Text>
              <View style={styles.distanceTime}>
                <Text style={[styles.vehicleCapacity, {marginRight: 10}]}>
                  2.6 Km
                </Text>
                <Text style={styles.vehicleCapacity}>23 min</Text>
              </View>
            </View>
          </View>
          <View style={[styles.distanceTime, {marginVertical: 15}]}>
            <EvilIcons name="location" size={18} color="#606060" />
            <Text style={styles.vehicleCapacity}>
              From North Street to South Street, California
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.totalAmount, {flex: 1}]}>Total Amount</Text>
            <Text style={styles.totalAmount}>
              <Text>€</Text> 34.00
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
            <Text>€</Text>34.00
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('EnterpriseLookingForDriver')}>
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
});

export default EnterpriseOrderPayment;
