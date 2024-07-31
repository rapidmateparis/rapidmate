import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import { authenticateUser } from '../../data_manager';
import { useUserDetails } from '../commonComponent/StoreContext';
import { useLoader } from '../../utils/loaderContext';

const LogInScreen = ({navigation}) => {
  const { saveUserDetails } = useUserDetails();
  const [emailPhone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to track password visibility
  const [errors, setErrors] = useState({});
  const [errorResponse, setErrorResponse] = useState("");
  const [successResponse, setSuccessResponse] = useState("");
  const { setLoading } = useLoader();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?\d{10,15}$/;
   
    let errors = {};
    if (!emailPhone.trim()) {
      errors.emailPhone = 'Email is required';
    } else if (!emailPattern.test(emailPhone) && !phonePattern.test(emailPhone)) {
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

  const handleLogin = async () => {

    const isValid = validateForm();

    if (isValid) {
      // Perform login action here based on email or phone number
      setLoading(true);
      let params = {
        info: {
          userName: emailPhone,// "syszoomail@gmail.com"
          password: password, //"Syszoo12!"
        }
      };
      authenticateUser(params, (successResponse) => {
        if(successResponse[0]._success){
          setLoading(false);
          if(successResponse[0]._response) {
            if(successResponse[0]._response.name == 'NotAuthorizedException') {
              Alert.alert('Error Alert', successResponse[0]._response.name, [
                {text: 'OK', onPress: () => {}},
              ]);
            } else {
              console.log("print_login===>", successResponse[0])
              saveUserDetails({userInfo : successResponse[0]._response.user.idToken.payload, userDetails: successResponse[0]._response.user_profile});
              if(successResponse[0]._response.user_profile[0].role == "CONSUMER") {
                navigation.navigate('PickupBottomNav');
              } else if (successResponse[0]._response.user_profile[0].role == "DELIVERY_BOY") {
                navigation.navigate('DeliveryboyBottomNav');
              } else {
                navigation.navigate('EnterpriseBottomNav');
              }
            }
          }
        }
      }, (errorResponse)=> {
        setLoading(false);
        Alert.alert('Error Alert', errorResponse, [
          {text: 'OK', onPress: () => {}},
        ]);
      })
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
          {errors.emailPhone ? <Text style={[{color:"red"}]}>{errors.emailPhone}</Text> : null}
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
            {errors.password ? <Text style={[{color:"red"}]}>{errors.password}</Text> : null}
            <View style={styles.textInputDiv}>
              <AntDesign name="lock" size={18} color="#131314" />
              <TextInput
                style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
                placeholder="Password"
                placeholderTextColor="#999"
                maxLength={10}
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
});

export default LogInScreen;
