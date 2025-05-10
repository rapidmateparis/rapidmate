import React, {useState, useEffect} from 'react';
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
import {authenticateUser, signUpVerifyApi} from '../../data_manager';
import {
  useSignUpDetails,
  useUserDetails,
} from '../commonComponent/StoreContext';
import {useLoader} from '../../utils/loaderContext';
import {
  localizationText,
  requestNotificationPermission,
} from '../../utils/common';
import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpVerify = ({route, navigation}) => {
  const {saveUserDetails, userDetails} = useUserDetails();
  const {signUpDetails, saveSignUpDetails} = useSignUpDetails();
  const [code, setCode] = useState('');
  const {setLoading} = useLoader();
  const [fcmToken, setFcmToken] = useState('');
 
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
    // onSignIn();
  }, []);

  async function onSignIn() {
    crashlytics().log('User signed in.');
    await Promise.all([
      crashlytics().setUserId(userDetails.userDetails[0].ext_id.toString()),
      crashlytics().setAttributes({
        role: userDetails.userDetails[0].role,
        email: userDetails.userDetails[0].email,
        extId: userDetails.userDetails[0].ext_id,
      }),
    ]);
  }

  const saveUserDetailsInAsync = async userDetails => {
    await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
  };

  const saveRapidTokenInAsync = async rapidToken => {
    await AsyncStorage.setItem('rapidToken', rapidToken);
  };

  const handleVerifyCode = async () => {
    console.log('signUpDetails', signUpDetails);
    if (code) {
      // Perform login action here based on email or phone number
      const userName = signUpDetails?.userName || route.params?.username;
      const role = signUpDetails?.profile || route.params?.role;
      let params ={
        info : {
          userName,
          code,
          role
        }
      }
     
      setLoading(true);
      signUpVerifyApi(
        params,
        successResponse => {
        
          if(signUpDetails === null){
             navigation.navigate('LogInScreen');
          }
          setLoading(false);
          if (successResponse[0]._success) {
            let loginParams = {
              info: {
                userName: signUpDetails?.userName,
                password: signUpDetails.password,
                token: fcmToken,
              },
            };
            setLoading(true);
            authenticateUser(
              loginParams,
              successResponse => {
                setLoading(false);
                if (successResponse[0]._success) {
                  console.log(successResponse[0]._response);
                  saveUserDetails({
                    rapidToken: successResponse[0]._response.rapid_token,
                    userInfo: successResponse[0]._response.user.idToken.payload,
                    userDetails: successResponse[0]._response.user_profile,
                  });

                  saveUserDetailsInAsync({
                    rapidToken: successResponse[0]._response.rapid_token,
                    userInfo: successResponse[0]._response.user.idToken.payload,
                    userDetails: successResponse[0]._response.user_profile,
                  });
                  saveRapidTokenInAsync(
                    successResponse[0]._response.rapid_token,
                  );
                  if (
                    successResponse[0]._response.user_profile[0].role ==
                    'CONSUMER'
                  ) {
                    navigation.navigate('PickupBottomNav');
                  } else if (
                    successResponse[0]._response.user_profile[0].role ==
                    'DELIVERY_BOY'
                  ) {
                    navigation.navigate('DeliveryboyTakeSelfie', {
                      delivery_boy_details: route.params.delivery_boy_details,
                    });
                  } else {
                    navigation.navigate('EnterprisesTakeSelfie');
                  }
                }
              },
              errorResponse => {
                setLoading(false);
                Alert.alert(
                  'Error Alert',
                  '' + errorResponse[0]._errors.message,
                  [{text: 'OK', onPress: () => {}}],
                );
              },
            );
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
        <Text style={styles.logInText}>
          {localizationText('Main', 'verficationCode')}
        </Text>
        <Text style={styles.loginAccessText}>
          {localizationText('Main', 'verficationCodeDescription')}
        </Text>
        <View>
          <View style={styles.logFormView}>
            <View style={styles.textInputDiv}>
              <AntDesign name="user" size={18} color="#131314" />
              <TextInput
                style={styles.input}
                placeholder={localizationText(
                  'Main',
                  'verficationCode',
                )}
                placeholderTextColor="#999"
                keyboardType="numeric"
                maxLength={6}
                value={code}
                onChangeText={text => setCode(text)}
              />
            </View>
            <TouchableOpacity
              style={[styles.logbutton, {backgroundColor: colors.primary}]}
              onPress={handleVerifyCode}>
              <Text style={styles.loginBtn}>{localizationText('Common', 'verify')}</Text>
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
    marginTop: 20,
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
  },
  forgotPasswordText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 20,
    textAlign: 'right',
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
    marginTop: '80%',
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
  input: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 10,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
});

export default SignUpVerify;
