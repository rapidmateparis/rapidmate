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
          Verify It's You
        </Text>
        <Text style={styles.loginAccessText}>
          Please enter your email address linked to your account.
        </Text>
        <View>
          <View style={styles.logFormView}>
            <View style={styles.textInputDiv}>
              <AntDesign
                name="mail"
                size={22}
                color="#131314"
                style={{marginTop: 13}}
              />
              <TextInput
                style={[styles.loginput, {fontFamily: 'Montserrat-Regular',}]}
                placeholder="Email Address"
                placeholderTextColor="#999"
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <TouchableOpacity
              //   onPress={handleResetPassword}
              onPress={() => navigation.navigate('ForgotPassword')}
              style={[styles.logbutton, {backgroundColor: colors.primary}]}>
              <Text style={{fontSize: 18, color: colors.text, fontFamily: 'Montserrat-Medium',}}>Next</Text>
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
    fontFamily: 'Montserrat-SemiBold',
  },
  loginAccessText: {
    fontSize: 15,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
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
    fontSize: 16,
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
    fontSize: 16,
    color: '#000',
  },
});

export default PasswordRecovery;
