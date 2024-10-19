import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../colors';
import {useUserDetails} from '../../commonComponent/StoreContext';
import {changeUserPassword} from '../../../data_manager';
import { useLoader } from '../../../utils/loaderContext';

const PickupChangePassword = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const {userDetails} = useUserDetails();
  const {setLoading} = useLoader();

  const togglePasswordVisibility = field => {
    if (field === 'currentPassword') {
      setCurrentPasswordVisible(!currentPasswordVisible);
    } else if (field === 'newPassword') {
      setNewPasswordVisible(!newPasswordVisible);
    } else if (field === 'confirmPassword') {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  const handleResetPassword = () => {
    if (currentPassword == '' || newPassword == '') {
      Alert.alert('Error', 'Password fill the required password fields.', [
        {
          text: 'OK',
          onPress: () => {
          },
        },
      ]);
    } else if (newPassword != confirmNewPassword){
      Alert.alert('Error', 'Passwords do not match.', [
        {
          text: 'OK',
          onPress: () => {
          },
        },
      ]);
    } else {
      let params = {
        info: {
          userName: userDetails.userDetails[0].username,
          oldPassword: currentPassword,
          newPassword: newPassword,
        },
      };
      setLoading(true);
      changeUserPassword(
        params,
        successResponse => {
          if (successResponse[0]._success) {
            setLoading(false);
            Alert.alert('Success', 'Password updated successfully', [
              {
                text: 'OK',
                onPress: () => {
                  navigation.goBack();
                },
              },
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
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 15}}>
        <Text style={styles.subtitle}>
          Before setting up a new password, please confirm your current password
        </Text>
        <View>
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={20} color="#131314" />
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              placeholderTextColor="#999"
              secureTextEntry={!currentPasswordVisible}
              value={currentPassword}
              onChangeText={text => setCurrentPassword(text)}
            />
            <TouchableOpacity
              onPress={() => togglePasswordVisibility('currentPassword')}>
              <Feather
                name={currentPasswordVisible ? 'eye' : 'eye-off'}
                size={15}
                color="#131314"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('PasswordRecovery')}
            style={styles.forgotPasswordLink}>
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.subtitle}>
              Use at least 12 characters, mixing uppercase, lowercase, numbers,
              and symbols.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={20} color="#131314" />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#999"
              secureTextEntry={!newPasswordVisible}
              value={newPassword}
              onChangeText={text => setNewPassword(text)}
            />
            <TouchableOpacity
              onPress={() => togglePasswordVisibility('newPassword')}>
              <Feather
                name={newPasswordVisible ? 'eye' : 'eye-off'}
                size={15}
                color="#131314"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={20} color="#131314" />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              placeholderTextColor="#999"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmNewPassword}
              onChangeText={text => setConfirmNewPassword(text)}
            />
            <TouchableOpacity
              onPress={() => togglePasswordVisibility('confirmPassword')}>
              <Feather
                name={confirmPasswordVisible ? 'eye' : 'eye-off'}
                size={15}
                color="#131314"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: colors.primary}]}
            onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  input: {
    flex: 1,
    fontSize: 13,
    paddingHorizontal: 10,
    color: colors.text,
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
  forgotPasswordLink: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: colors.text,
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
  },
});

export default PickupChangePassword;
