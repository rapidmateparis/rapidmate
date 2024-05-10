import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../../colors';

const LogInScreen = ({ navigation }) => {
  const [emailPhone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to track password visibility

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    // Check if the input is a valid email
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailPhone);

    // Check if the input is a valid phone number
    const isPhone = /^\d{10}$/.test(emailPhone);

    if (isEmail || isPhone) {
      // Perform login action here based on email or phone number
      navigation.navigate('MainScreen');
      // Loader(true);
      // let tempData = {
      //   emailPhone: emailPhone,
      //   password: password,
      // };
      // try {
      //   let res = await postData('sendOtp', tempData);
      //   if (res.statusCode === 200) {
      //     console.log('success-------------');
      //   }
      // } catch (error) {
      //   console.error('Error:', error);
      // } finally {
      //   Loader(false);
      // }
    } else {
      // Show error message for invalid email or phone number
      console.log('Invalid email or phone number');
    }
  };

  return (
    <ScrollView style={{ width: '100%', backgroundColor: '#fff' }}>
      <View style={{ paddingHorizontal: 15 }}>
        <Text style={[styles.logInText, { color: colors.text }]}>Login</Text>
        <Text style={styles.loginAccessText}>
          Please login to your account and pick up where you left!
        </Text>
        <View>
          <View style={styles.logFormView}>
            <View style={styles.textInputDiv}>
              <AntDesign
                name="user"
                size={22}
                color="#131314"
                style={{ marginTop: 13 }}
              />
              <TextInput
                style={[styles.loginput, {fontFamily: 'Montserrat-Regular',}]}
                placeholder="Email/Phone"
                placeholderTextColor="#999"
                value={emailPhone}
                onChangeText={(text) => setEmailPhone(text)}
              />
            </View>
            <View style={styles.textInputDiv}>
              <AntDesign
                name="lock"
                size={22}
                color="#131314"
                style={{ marginTop: 15 }}
              />
              <TextInput
                style={[styles.loginput, {fontFamily: 'Montserrat-Regular',}]}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!passwordVisible} // Use the secureTextEntry prop based on passwordVisible state
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Feather
                  name={passwordVisible ? 'eye' : 'eye-off'} // Change the icon based on passwordVisible state
                  size={20}
                  color="#131314"
                  style={{ marginTop: 15 }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('PasswordRecovery')}>
              <Text style={[styles.forgotPasswordText, {color: colors.text}]}>Forgot your password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.logbutton, {backgroundColor: colors.primary}]} onPress={handleLogin}>
              <Text style={{ fontSize: 18, color: colors.text, fontFamily: 'Montserrat-Medium'}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileChoose')}
              style={styles.signUpContainer}>
              <Text style={styles.signUpText}>
              Don’t have an account yet?{' '}
                <Text style={{color: colors.primary,}}>Register</Text>
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
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold'
  },
  loginAccessText: {
    fontSize: 15,
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
    borderRadius: 5,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  loginput: {
    fontSize: 17,
    paddingHorizontal: 10,
    width: '90%',
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 20,
    textAlign: 'right',
  },
  logbutton: {
    width: '100%',
    marginTop: 20,
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpContainer: {
    marginTop: 240,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  },
});

export default LogInScreen;
