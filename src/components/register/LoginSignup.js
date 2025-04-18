import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import ExStyles from '../../style';
import { colors } from '../../colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LanguageSwitcher from '../../common/LanguageSwitcher';
import { localizationText } from '../../utils/common';
import { getCachedAppVersion } from '../../utils/asyncStorage';

const LoginSignup = ({ navigation }) => {
  const [version, setVersion] = useState('');

  useEffect(() => {
    const loadVersion = async () => {
      const version = await getCachedAppVersion();
      setVersion(version);
    };
  
    loadVersion();
  }, []);
    

  return (
    <View style={{ width: '100%', backgroundColor: colors.primary }}>
      <View>
        <View style={styles.deliveryIconMain}>
          <Image
            source={require('../../image/Logo.png')}
            style={styles.deliveryScootericon}
          />
          <Text style={[styles.companyName, { color: colors.text }]}>
            Rapidmate
          </Text>
        </View>
        <View
          style={[
            styles.loginSignupCard,
            styles.rotatedCard,
            { width: '100%', height: '100%' },
          ]}
        >
          <View style={[styles.rotatedView, styles.shadowStyle]} />
          <LanguageSwitcher />
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileChoose')}
            style={[styles.createAcBtn, { backgroundColor: colors.white }]}
          >
            <Text style={[styles.pageDirections, { color: colors.text }]}>
              {localizationText('Main', 'createAccount')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LogInScreen')}
            style={styles.loginAcBtn}
          >
            <Text style={[styles.pageDirections, { color: colors.white }]}>
              {localizationText('Main', 'loginWithEmail')}
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 10 }}>
            <Text style={[styles.loginDisclemar, { color: colors.white }]}>
              {localizationText('Main', 'loggingRegisteringText')}
            </Text>
            <Text style={[styles.loginDisclemar, { color: colors.white }]}>
              <TouchableOpacity
                style={{ paddingTop: 10 }}
                onPress={() => navigation.navigate('TermsAndConditions')}
              >
                <Text style={styles.termServicesText}>
                  {localizationText('Common', 'termsAndConditions')}
                </Text>
              </TouchableOpacity>{' '}
              <TouchableOpacity>
                <Text style={{ color: colors.white, fontSize: 11 }}>
                  {localizationText('Common', 'and')}{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
                <Text style={styles.termServicesText}>
                  {localizationText('Common', 'privacyPolicy')}
                </Text>
              </TouchableOpacity>
            </Text>
            <View style={styles.versionCard}>
              <Text style={styles.versionText}>Version</Text>
              <Text style={styles.currentVersion}>{version || 'Loading...'}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deliveryIconMain: {
    marginVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryScootericon: {
    height: 80,
    width: 72,
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
  versionText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  currentVersion: {
    color: colors.white,
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  versionCard: {
    paddingTop: 35,
  },
});

export default LoginSignup;
