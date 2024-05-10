import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../../colors';

const ResetPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setPasswordVisible(!passwordVisible);
    } else if (field === 'confirmPassword') {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  const handleResetPassword = async () => {
    // Implement password reset logic here
    // Example: Call API to reset password
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
            <AntDesign name="lock" size={22} color="#131314" />
            <TextInput
              style={[styles.input, {fontFamily: 'Montserrat-Regular',}]}
              placeholder="New Password"
              placeholderTextColor="#999"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity onPress={() => togglePasswordVisibility('password')}>
              <Feather
                name={passwordVisible ? 'eye' : 'eye-off'}
                size={20}
                color="#131314"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={22} color="#131314" />
            <TextInput
              style={[styles.input, {fontFamily: 'Montserrat-Regular',}]}
              placeholder="Confirm New Password"
              placeholderTextColor="#999"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
            />
            <TouchableOpacity onPress={() => togglePasswordVisibility('confirmPassword')}>
              <Feather
                name={confirmPasswordVisible ? 'eye' : 'eye-off'}
                size={20}
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
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold', 
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  input: {
    flex: 1,
    fontSize: 17,
    paddingHorizontal: 10,
    color: '#000',
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
    fontSize: 17,
    fontFamily: 'Montserrat-Medium', 
    color: colors.text,
  },
  inputCardContainer: {
    marginTop: 80,
  },
});

export default ResetPassword;
