import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../../colors';
import { authenticateUser, getAppVersion } from '../../data_manager';
import { useUserDetails } from '../commonComponent/StoreContext';
import { useLoader } from '../../utils/loaderContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  localizationText,
  requestNotificationPermission,
} from '../../utils/common';
import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';
import { encrypt } from '../commonComponent/PasswordEncrypt';


const LogInScreen = ({ navigation }) => {
  const { saveUserDetails } = useUserDetails();
  const [emailPhone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorResponse, setErrorResponse] = useState('');
  const [successResponse, setSuccessResponse] = useState('');
  const { setLoading } = useLoader();
  const [fcmToken, setFcmToken] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(async () => {
    console.log("WORks")
    var permission = true;
    if (Platform.Version >= 33) {
      permission = await requestNotificationPermission();
    }

    if (permission) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        setFcmToken(fcmToken);
      }
    }

    // getAppVersion(
    //   (response) => {
    //     console.log('App Version:', response);
    //   },
    //   (error) => {
    //     console.log('App Version Error:', error);
    //   }
    // );

  }, []);

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?\d{10,15}$/;

    let errors = {};
    if (!emailPhone.trim()) {
      errors.emailPhone = 'Email is required';
    } else if (
      !emailPattern.test(emailPhone) &&
      !phonePattern.test(emailPhone)
    ) {
      errors.emailPhone = 'Enter a valid email';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveUserDetailsInAsync = async userDetails => {
    await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
  };

  const saveRapidTokenInAsync = async rapidToken => {
    await AsyncStorage.setItem('rapidToken', rapidToken);
  };

  const handleLogin = async () => {
    const isValid = validateForm();

    if (isValid) {
      // Perform login action here based on email or phone number
      setLoading(true);

     
      const encryptedPassword = encrypt(password);

      
      let params = {
        info: {
          userName: emailPhone,
          password: encryptedPassword,
          token: fcmToken,
        },
      };

      console.log('Params::::::::::::::::::::::::::::;>', params)

      authenticateUser(
        params,
        successResponse => {
          if (successResponse[0]._success) {
            setLoading(false);
            if (successResponse[0]._response) {
              if (
                successResponse[0]._response.name == 'NotAuthorizedException'
              ) {
                Alert.alert(
                  'Error Alert',
                  'Username or password is incorrect',
                  [{ text: 'OK', onPress: () => { } }],
                );
              } else if (
                successResponse[0]._response.name == 'UserNotConfirmedException'
              ) {
                Alert.alert('Error Alert', 'Delivery Boy Verification Pending', [
                  { text: 'OK', onPress: () => { } },
                ]);
              } else {
                saveUserDetails({
                  rapidToken: successResponse[0]._response.rapid_token,
                  userInfo: successResponse[0]._response.user?.idToken?.payload,
                  userDetails: successResponse[0]._response.user_profile,
                });
                saveUserDetailsInAsync({
                  rapidToken: successResponse[0]._response.rapid_token,
                  userInfo: successResponse[0]._response.user.idToken.payload,
                  userDetails: successResponse[0]._response.user_profile,
                });
                saveRapidTokenInAsync(successResponse[0]._response.rapid_token);
                console.log('userDetails===>', successResponse[0]._response);
                if (
                  successResponse[0]._response.user_profile[0].role == 'CONSUMER'
                ) {
                  navigation.navigate('PickupBottomNav');
                } else if (
                  successResponse[0]._response.user_profile[0].role == 'DELIVERY_BOY'
                ) {
                  if (
                    successResponse[0]._response.user_profile[0].is_active == 0
                  ) {
                    navigation.navigate('DeliveryboyThanksPage');
                  } else {
                    navigation.navigate('DeliveryboyBottomNav');
                  }
                } else {
                  if (
                    successResponse[0]._response.user_profile[0].is_active == 0
                  ) {
                    navigation.navigate('EnterpriseThanksPage');
                  } else {
                    navigation.navigate('EnterpriseBottomNav');
                  }
                }
              }
            }
          } else {
            setLoading(false);
            Alert.alert('Error Alert', 'Invalid credentials', [
              { text: 'OK', onPress: () => { } },
            ]);
          }
        },
        errorResponse => {
          setLoading(false);
          Alert.alert('Error Alert', errorResponse[0]._errors.message, [
            { text: 'OK', onPress: () => { } },
          ]);
        },
      );
    } else {
      console.log('Invalid email or phone number');
    }
  };

  return (
    <ScrollView style={{ width: '100%', backgroundColor: '#fff' }}>
      <View style={{ paddingHorizontal: 15 }}>
        <Text style={styles.logInText}>
          {localizationText('Common', 'login')}
        </Text>
        <Text style={styles.loginAccessText}>
          {localizationText('Main', 'loginDescription')}
        </Text>
        <View>
          <View style={styles.logFormView}>
            {errors.emailPhone ? (
              <Text style={[{ color: 'red' }]}>{errors.emailPhone}</Text>
            ) : null}
            <View style={styles.textInputDiv}>
              <AntDesign name="user" size={18} color="#131314" />
              <TextInput
                style={[styles.loginput, { fontFamily: 'Montserrat-Regular' }]}
                placeholder={localizationText('Common', 'email')}
                placeholderTextColor="#999"
                value={emailPhone}
                onChangeText={text => setEmailPhone(text)}
              />
            </View>
            {errors.password ? (
              <Text style={[{ color: 'red' }]}>{errors.password}</Text>
            ) : null}
            <View style={styles.textInputDiv}>
              <AntDesign name="lock" size={18} color="#131314" />
              <TextInput
                style={[styles.loginput, { fontFamily: 'Montserrat-Regular' }]}
                placeholder={localizationText('Common', 'password')}
                placeholderTextColor="#999"
                maxLength={10}
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Feather
                  name={passwordVisible ? 'eye' : 'eye-off'}
                  size={15}
                  color="#131314"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('PasswordRecovery')}>
              <Text style={[styles.forgotPasswordText, { color: colors.text }]}>
                {localizationText('Common', 'passwordForgot')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.logbutton, { backgroundColor: colors.primary }]}
              onPress={handleLogin}>
              <Text style={styles.loginBtn}>{localizationText('Common', 'login')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileChoose')}
              style={styles.signUpContainer}>
              <Text style={styles.signUpText}>
                {localizationText('Common', 'dontHaveAccount')}{' '}
                <Text style={{ color: colors.primary }}>
                  {localizationText('Common', 'register')}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logInText: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  loginAccessText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    width: '70%',
    marginTop: 5,
  },
  logFormView: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingTop: 30,
  },
  textInputDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  loginput: {
    fontSize: 12,
    paddingHorizontal: 10,
    width: '90%',
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  forgotPasswordText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 20,
    textAlign: 'right',
    color: colors.black,
  },
  logbutton: {
    width: '100%',
    marginTop: 40,
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpContainer: {
    marginTop: '50%',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  },
  loginBtn: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
});

export default LogInScreen;
