import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../../colors';
// import DropDownDropdown from '../common component/dropdown';

const PickupSignup = ({navigation}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedAccountType, setSelectedAccountType] = useState('');
  const [number, setNumber] = useState('');
  const [openDropDown, setOpenDropDown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('+33');
  const [dropdownCountryValue, setDropdownCountryValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const togglePasswordVisibility = field => {
    if (field === 'password') {
      setPasswordVisible(!passwordVisible);
    } else if (field === 'confirmPassword') {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  const handleAccountTypeSelection = accountType => {
    setSelectedAccountType(accountType);
  };

  const data = [
    {label: '+91', value: '+91'},
    {label: '+33', value: '+33'},
  ];

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '85%'}}>
            <Text style={[styles.logInText, {color: colors.text}]}>
              Pickup & Drop-off{' '}
              <Text style={{fontFamily: 'Montserrat-Medium'}}>signup</Text>
            </Text>
            <Text style={styles.loginAccessText}>
              Let’s create your profile so you can have a complete experience of
              the app.
            </Text>
          </View>
          <Image source={require('../../image/location-map.png')} />
        </View>
        <View style={styles.logFormView}>
          <View style={styles.textInputDiv}>
            <AntDesign
              name="mail"
              size={22}
              color="#131314"
              style={{marginTop: 13}}
            />
            <TextInput
              style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
              placeholder="Email"
              placeholderTextColor="#999"
              value={''}
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={22} color="#131314" />
            <TextInput
              style={[styles.input, {fontFamily: 'Montserrat-Regular'}]}
              placeholder="New Password"
              placeholderTextColor="#999"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => togglePasswordVisibility('password')}>
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
              style={[styles.input, {fontFamily: 'Montserrat-Regular'}]}
              placeholder="Confirm New Password"
              placeholderTextColor="#999"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
            />
            <TouchableOpacity
              onPress={() => togglePasswordVisibility('confirmPassword')}>
              <Feather
                name={confirmPasswordVisible ? 'eye' : 'eye-off'}
                size={20}
                color="#131314"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.mobileNumberInput}>
            <View style={{width: 95}}>
              <View style={styles.containerDropdown}>
                <Dropdown
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? '+33' : '...'}
                  searchPlaceholder="+.."
                  value={dropdownValue}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setDropdownValue(item.value);
                    setIsFocus(false);
                  }}
                  renderLeftIcon={() => (
                    <Image
                      style={{marginRight: 10}}
                      source={require('../../image/flagIcon.png')}
                    />
                  )}
                />
              </View>
            </View>
            <TextInput
              style={[styles.input, {fontFamily: 'Montserrat-Regular'}]}
              placeholder="00 00 00 00 00)"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={11}
              value={number}
              onChangeText={text => setNumber(text)}
            />
          </View>
          <View style={styles.containerCountry}>
            <Dropdown
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Country' : '...'}
              searchPlaceholder="Search.."
              value={dropdownCountryValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setDropdownCountryValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <FontAwesome6
                  style={{marginRight: 10}}
                  name="globe"
                  size={21}
                  color={colors.text}
                />
              )}
            />
          </View>
          <View>
            <Text style={styles.accountType}>Create account as:</Text>
            <TouchableOpacity
              style={[
                styles.accountCard,
                selectedAccountType === 'individual' && styles.selectedCard,
              ]}
              onPress={() => handleAccountTypeSelection('individual')}>
              <AntDesign name="user" size={20} color="#131314" />
              <Text style={styles.accountTitle}>Individual</Text>
              {selectedAccountType === 'individual' && (
                <View style={styles.checkIcon}>
                  <MaterialIcons name="check" size={21} color={colors.white} />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.accountCard,
                selectedAccountType === 'company' && styles.selectedCard,
              ]}
              onPress={() => handleAccountTypeSelection('company')}>
              <Image source={require('../../image/bulding.png')} />
              <Text style={styles.accountTitle}>Company</Text>
              {selectedAccountType === 'company' && (
                <View style={styles.checkIcon}>
                  <MaterialIcons name="check" size={21} color={colors.white} />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddPickupdetails')}
            style={[styles.logbutton, {backgroundColor: colors.primary}]}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LogInScreen')}
            style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Already have an account yet?{' '}
              <Text style={{color: colors.primary}}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logInText: {
    fontSize: 21,
    fontFamily: 'Montserrat-Bold',
  },
  loginAccessText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    width: '95%',
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
    fontSize: 15,
    paddingHorizontal: 10,
    width: '90%',
  },
  mobileNumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  logbutton: {
    width: '100%',
    marginTop: 20,
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  signUpContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  containerDropdown: {
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 2,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 10,
    color: colors.text,
  },
  accountType: {
    fontFamily: 'Montserrat-Regular',
    marginBottom: 20,
    marginTop: 10,
    fontSize: 15,
    color: colors.text,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  selectedCard: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  accountTitle: {
    flex: 1,
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    marginLeft: 5,
  },
  checkIcon: {
    backgroundColor: colors.primary,
    width: 25,
    height: 25,
    padding: 2,
    borderRadius: 15,
  },
  containerCountry: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default PickupSignup;
