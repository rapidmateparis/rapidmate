import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import ExStyles from '../../style';
import {colors} from '../../colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LanguageSwitcher from '../../common/LanguageSwitcher';
import {localizationText} from '../../utils/common';

const LoginSignup = ({navigation}) => {
  return (
    <View style={{width: '100%', backgroundColor: colors.primary}}>
      <View>
        <View style={styles.deliveryIconMain}>
          <Image
            source={require('../../image/Logo.png')}
            style={styles.deliveryScootericon}
          />
          <Text style={[styles.companyName, {color: colors.text}]}>
            Rapidmate
          </Text>
        </View>
        <View
          style={[
            styles.loginSignupCard,
            styles.rotatedCard,
            {width: '100%', height: '100%'},
          ]}>
          <View style={[styles.rotatedView, styles.shadowStyle]} />
          <LanguageSwitcher />
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileChoose')}
            style={[styles.createAcBtn, {backgroundColor: colors.white}]}>
            <Text style={[styles.pageDirections, {color: colors.text}]}>
              {localizationText('Main', 'createAccount')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LogInScreen')}
            style={styles.loginAcBtn}>
            <Text style={[styles.pageDirections, {color: colors.white}]}>
              {localizationText('Main', 'loginWithEmail')}
            </Text>
          </TouchableOpacity>
          <View style={{marginTop: 10}}>
            <Text style={[styles.loginDisclemar, {color: colors.white}]}>
              {localizationText('Main', 'loggingRegisteringText')}
            </Text>
            <Text style={[styles.loginDisclemar, {color: colors.white}]}>
              <TouchableOpacity
                style={{paddingTop: 10}}
                onPress={() => navigation.navigate('TermsAndConditions')}>
                <Text style={styles.termServicesText}>
                  {localizationText('Common', 'termsAndConditions')}
                </Text>
              </TouchableOpacity>{' '}
              <TouchableOpacity>
                <Text style={{color: colors.white, fontSize: 11,}}>
                  {localizationText('Common', 'and')}{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('PrivacyPolicy')}>
                <Text style={styles.termServicesText}>
                  {localizationText('Common', 'privacyPolicy')}
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deliveryIconMain: {
    marginVertical: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryScootericon: {
    height: 88,
    width: 82,
  },
  loginSignupCard: {
    paddingHorizontal: 20,
    paddingVertical: 80,
  },
  createAcBtn: {
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 25,
  },
  loginAcBtn: {
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#fff',
  },
  pageDirections: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#000',
  },
  companyName: {
    fontSize: 35,
    fontFamily: 'Montserrat-Bold',
    marginTop: 20,
  },
  rotatedView: {
    transform: [{rotate: '3deg'}],
    height: 30,
    width: 500,
    position: 'absolute',
    top: -10,
    left: -1,
    backgroundColor: '#EA0051',
  },
  rotatedCard: {
    marginTop: 30,
    backgroundColor: '#FF0058',
    position: 'relative',
  },
  shadowStyle: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  loginDisclemar: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 20,
    fontFamily: 'Montserrat-Medium',
  },
  termServicesText: {
    textDecorationLine: 'underline',
    color: colors.white,
    fontSize: 11,
  },
});

export default LoginSignup;
