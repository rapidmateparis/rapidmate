import React, {useState} from 'react';
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
import {colors} from '../../colors';

const PasswordRecovery = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    // Implement your password reset logic here
    console.log('Resetting password for email:', email);
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 15}}>
        <Text style={[styles.logInText, {color: colors.text}]}>
          Forgot password
        </Text>
        <Text style={styles.loginAccessText}>
          Please confirm your email address, we will send OTP there
        </Text>
        <View>
          <View style={styles.logFormView}>
            <View style={styles.textInputDiv}>
              <AntDesign
                name="mail"
                size={15}
                color="#131314"
                style={{marginTop: 16}}
              />
              <TextInput
                style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <TouchableOpacity
              //   onPress={handleResetPassword}
              onPress={() => navigation.navigate('AddressBook')}
              style={[styles.logbutton, {backgroundColor: colors.primary}]}>
              <Text
                style={styles.submitBtn}>
                Submit
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
  },
  loginAccessText: {
    fontSize: 13,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
    marginTop: 5,
  },
  logFormView: {
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  textInputDiv: {
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  loginput: {
    fontSize: 13,
    paddingHorizontal: 10,
    width: '90%',
  },
  forgotPasswordText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'right',
  },
  logbutton: {
    width: '100%',
    marginTop: '20%',
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
    fontSize: 16,
    color: '#000',
  },
  submitBtn: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
});

export default PasswordRecovery;
