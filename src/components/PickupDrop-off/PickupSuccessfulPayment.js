import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {colors} from '../../colors';
import {localizationText} from '../../utils/common';

const PickupSuccessfulPayment = ({navigation}) => {
  return (
    <ScrollView
      style={{width: '100%', height: '100%', backgroundColor: '#FBFAF5'}}
      contentContainerStyle={styles.scrollViewContainer}>
      <View
        style={{
          width: 350,
          height: 500,
          position: 'relative',
          marginVertical: 30,
        }}>
        <View style={styles.container}>
          <Image
            style={styles.paymentSuccuss}
            source={require('../../image/Payment-Sucuss.png')}
          />
          <Text style={styles.text}>
            {localizationText('Common', 'paymentSuccessful')}
          </Text>
          <Text style={styles.subText}>
            {localizationText('Common', 'paymentSuccessfulDescription')}
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('PickupUnsuccessfulPayment')}
          style={styles.goHomeBtn}>
          <Text style={styles.buttonText}>
            {localizationText('Common', 'continue')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  text: {
    color: colors.text,
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 30,
    marginBottom: 5,
    textAlign: 'center',
  },
  subText: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    paddingHorizontal: 50,
  },
  cancelRequest: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  requestTouch: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    paddingHorizontal: 90,
    paddingVertical: 10,
  },
  logbutton: {
    width: '40%',
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
  actionBtnCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  goHomeBtn: {
    borderRadius: 8,
    paddingHorizontal: 50,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.text,
  },
  paymentSuccuss: {
    width: 228,
    height: 151,
  },
});

export default PickupSuccessfulPayment;
