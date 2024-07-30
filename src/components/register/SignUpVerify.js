import React, {useState} from 'react';
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
import { authenticateUser, signUpVerifyApi } from '../../data_manager';
import { useSignUpDetails, useUserDetails } from '../commonComponent/StoreContext';
import { useLoader } from '../../utils/loaderContext';

const SignUpVerify = ({navigation}) => {
  const { saveUserDetails } = useUserDetails();
  const { signUpDetails, saveSignUpDetails } = useSignUpDetails();
  const [code, setCode] = useState('');
  const { setLoading } = useLoader();

  const handleVerifyCode = async () => {
    console.log('signUpDetails',signUpDetails)
    if (code) {
      // Perform login action here based on email or phone number
      let params = {
        info: {
          userName: signUpDetails.userName,
          code: code, 
          role: "CONSUMER"
        }
      };
      setLoading(true)
      signUpVerifyApi(params, (successResponse) => {
        setLoading(false)
        if(successResponse[0]._success){
          if(successResponse[0]._response) {
            if(successResponse[0]._response.name == 'NotAuthorizedException') {
              Alert.alert('Error Alert', successResponse[0]._response.name, [
                {text: 'OK', onPress: () => {}},
              ]);
            } else {
            let loginParams = {
              info: {
                userName: signUpDetails.userName,
                password: signUpDetails.password,
              }
            };
            setLoading(true)
            authenticateUser(loginParams, (successResponse) => {
              setLoading(false)
              if(successResponse[0]._success){
                if(successResponse[0]._response) {
                  if(successResponse[0]._response.name == 'NotAuthorizedException') {
                    Alert.alert('Error Alert', successResponse[0]._response.name, [
                      {text: 'OK', onPress: () => {}},
                    ]);
                  } else {
                    saveUserDetails(successResponse[0]._response.idToken.payload);
                    navigation.navigate('PickupBottomNav');
                  }
                }
              }
            }, (errorResponse)=> {
              setLoading(false)
              Alert.alert('Error Alert', errorResponse, [
                {text: 'OK', onPress: () => {}},
              ]);
            })
          }
        }
        }
      }, (errorResponse)=> {
        setLoading(false)
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
        <Text style={styles.logInText}>Verfication Code</Text>
        <Text style={styles.loginAccessText}>
          Please enter the verification code sent to you email
        </Text>
        <View>
          <View style={styles.logFormView}>
            <View style={styles.textInputDiv}>
              <AntDesign name="user" size={18} color="#131314" />
              <TextInput
                style={styles.input}
                placeholder="Verification code"
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
              <Text style={styles.loginBtn}>Verify</Text>
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
    marginTop:20
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
