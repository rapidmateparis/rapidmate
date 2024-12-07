import React, {useEffect, useState} from 'react';
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
import {colors} from '../../colors';
import {authenticateUser} from '../../data_manager';
import {useUserDetails} from '../commonComponent/StoreContext';
import {useLoader} from '../../utils/loaderContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestNotificationPermission} from '../../utils/common';
import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';

const LogInScreen = ({navigation}) => {
  const {saveUserDetails} = useUserDetails();
  const [emailPhone, setEmailPhone] = useState(''); //poson30700@eixdeal.com
  const [password, setPassword] = useState(''); //Syszoo12!
  const [passwordVisible, setPasswordVisible] = useState(false); // State to track password visibility
  const [errors, setErrors] = useState({});
  const [errorResponse, setErrorResponse] = useState('');
  const [successResponse, setSuccessResponse] = useState('');
  const {setLoading} = useLoader();
  const [fcmToken, setFcmToken] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(async () => {
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

    console.log(errors);
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
      let params = {
        info: {
          userName: emailPhone, // "syszoomail@gmail.com"
          password: password, //"Syszoo12!"
          token: fcmToken,
        },
      };
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
                  [{text: 'OK', onPress: () => {}}],
                );
              } else if (
                successResponse[0]._response.name == 'UserNotConfirmedException'
              ) {
                Alert.alert('Error Alert', 'Delivery Boy Verfication Pending', [
                  {text: 'OK', onPress: () => {}},
                ]);
              } else {
                saveUserDetails({
                  rapidToken : successResponse[0]._response.rapid_token,
                  userInfo: successResponse[0]._response.user?.idToken?.payload,
                  userDetails: successResponse[0]._response.user_profile,
                });
                console.log('userDetials===>', successResponse[0]._response);
                if (
                  successResponse[0]._response.user_profile[0].role ==
                  'CONSUMER'
                ) {
                  navigation.navigate('PickupBottomNav');
                } else if (
                  successResponse[0]._response.user_profile[0].role ==
                  'DELIVERY_BOY'
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
                saveUserDetailsInAsync({
                  rapidToken : successResponse[0]._response.rapid_token,
                  userInfo: successResponse[0]._response.user.idToken.payload,
                  userDetails: successResponse[0]._response.user_profile,
                });
                saveRapidTokenInAsync(successResponse[0]._response.rapid_token);
              }
            }
          } else {
            setLoading(false);
            Alert.alert('Error Alert', 'Invalid credentials', [
              {text: 'OK', onPress: () => {}},
            ]);
          }
        },
        errorResponse => {
          setLoading(false);
          Alert.alert('Error Alert', errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    } else {
      // Show error message for invalid email or phone number
      console.log('Invalid email or phone number');
    }
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 15}}>
        <Text style={styles.logInText}>Login</Text>
        <Text style={styles.loginAccessText}>
          Please login to your account and pick up where you left!
        </Text>
        <View>
          <View style={styles.logFormView}>
            {errors.emailPhone ? (
              <Text style={[{color: 'red'}]}>{errors.emailPhone}</Text>
            ) : null}
            <View style={styles.textInputDiv}>
              <AntDesign name="user" size={18} color="#131314" />
              <TextInput
                style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
                placeholder="Email/Phone"
                placeholderTextColor="#999"
                value={emailPhone}
                onChangeText={text => setEmailPhone(text)}
              />
            </View>
            {errors.password ? (
              <Text style={[{color: 'red'}]}>{errors.password}</Text>
            ) : null}
            <View style={styles.textInputDiv}>
              <AntDesign name="lock" size={18} color="#131314" />
              <TextInput
                style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!passwordVisible} // Use the secureTextEntry prop based on passwordVisible state
                value={password}
                onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Feather
                  name={passwordVisible ? 'eye' : 'eye-off'} // Change the icon based on passwordVisible state
                  size={15}
                  color="#131314"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('PasswordRecovery')}>
              <Text style={[styles.forgotPasswordText, {color: colors.text}]}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.logbutton, {backgroundColor: colors.primary}]}
              onPress={handleLogin}>
              <Text style={styles.loginBtn}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileChoose')}
              style={styles.signUpContainer}>
              <Text style={styles.signUpText}>
                Don't have an account yet?{' '}
                <Text style={{color: colors.primary}}>Register</Text>
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
