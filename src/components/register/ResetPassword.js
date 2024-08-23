import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../../colors';
import { resetPasswordApi } from '../../data_manager';
import { useForgotPasswordDetails } from '../commonComponent/StoreContext';
import { useLoader } from '../../utils/loaderContext';

const ResetPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { forgotPasswordDetails, saveForgotPasswordDetails } = useForgotPasswordDetails();
  const { setLoading } = useLoader();

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setPasswordVisible(!passwordVisible);
    } else if (field === 'confirmPassword') {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  const handleResetPassword = async () => {
    if (password != confirmPassword) {
      Alert.alert('Error Alert', 'Passwords do not match', [
        {text: 'OK', onPress: () => {}},
      ]);
    } else {
      let params = {
        info: {
          userName:forgotPasswordDetails.userName,
          verificationCode:forgotPasswordDetails.code,
          newPassword:password,
        }
      };
      setLoading(true)
      resetPasswordApi(params, (successResponse) => {
        console.log('successResponse',successResponse)
        setLoading(false)
        if(successResponse[0]._success){
          if(successResponse[0]._response) {
            if(successResponse[0]._response.name == 'CodeMismatchException') {
              Alert.alert('Error Alert', successResponse[0]._response.name, [
                {text: 'OK', onPress: () => {}},
              ]);
            } else if (successResponse[0]._response.name == 'LimitExceededException') {
              Alert.alert('Error Alert', successResponse[0]._response.name, [
                {text: 'OK', onPress: () => {}},
              ]);
            } else {
              navigation.navigate('LogInScreen')
            }
          }
        }
      }, (errorResponse)=> {
        console.log('errorResponse',errorResponse)
        setLoading(false)
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      })
    }
      
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ paddingHorizontal: 15 }}>
        <Text style={[styles.title, { color: colors.text }]}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Thank you for confirming the code. You may now reset the password.
        </Text>
        <View style={styles.inputCardContainer}>
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={18} color="#131314" />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#999"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity onPress={() => togglePasswordVisibility('password')}>
              <Feather
                name={passwordVisible ? 'eye' : 'eye-off'}
                size={15}
                color="#131314"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={18} color="#131314" />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              placeholderTextColor="#999"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
            />
            <TouchableOpacity onPress={() => togglePasswordVisibility('confirmPassword')}>
              <Feather
                name={confirmPasswordVisible ? 'eye' : 'eye-off'}
                size={15}
                color="#131314"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold', 
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    width: '80%',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  input: {
    flex: 1,
    fontSize: 12,
    paddingHorizontal: 10,
    color: '#000',
    fontFamily: 'Montserrat-Regular',
  },
  button: {
    width: '100%',
    borderRadius: 5,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium', 
    color: colors.text,
  },
  inputCardContainer: {
    marginTop: 80,
  },
});

export default ResetPassword;
