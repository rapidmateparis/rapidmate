import React, { useState } from 'react';
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
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../colors';
// import DropDownDropdown from '../common component/dropdown';

const PickupSignup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?\d{10,15}$/;


    let errors = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      errors.email = 'Email address is invalid';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords does not match';
    }
    if (!selectedAccountType) {
      errors.selectedAccountType = 'Please select an account type';
    }
    if (!number.trim()) {
      errors.number = 'Number is required';
    } else if (isNaN(number)) {
      errors.number = 'Number should be numeric';
    }
    if (!dropdownCountryValue) {
      errors.dropdownCountryValue = 'Please select a country';
    }
    console.log(errors);
    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async () => {

    const isValid = validateForm();
    // console.log("Name: " + name);
    if (isValid) {
      console.log("print_data===>valid")
    } else {
      console.log("print_data===>Invalid")
    }
  }

  const data = [
    { label: '+91', value: '+91' },
    { label: '+33', value: '+33' },
  ];

  return (
    <ScrollView style={{ width: '100%', backgroundColor: '#fff' }}>
      <View style={{ paddingHorizontal: 15 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '85%' }}>
            <Text style={[styles.logInText, { color: colors.text }]}>
              Pickup & Drop-off{' '}
              <Text style={{ fontFamily: 'Montserrat-Medium' }}>signup</Text>
            </Text>
            <Text style={styles.loginAccessText}>
              Let’s create your profile so you can have a complete experience of
              the app.
            </Text>
          </View>
          <Image
            style={{ width: 40, height: 40 }}
            source={require('../../image/location-map.png')}
          />
        </View>
        <View style={styles.logFormView}>
        {errors.name ? <Text style={[{color:"red"}]}>{errors.name}</Text> : null}
          <View style={styles.textInputDiv}>
            <AntDesign name="user" size={18} color="#131314" />
            <TextInput
              style={[styles.loginput, { fontFamily: 'Montserrat-Regular' }]}
              placeholder="Name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          {errors.email ? <Text style={[{color:"red"}]}>{errors.email}</Text> : null}
          <View style={styles.textInputDiv}>
            <AntDesign name="mail" size={18} color="#131314" />
            <TextInput
              style={styles.loginput}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          {errors.password ? <Text style={[{color:"red"}]}>{errors.password}</Text> : null}
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={18} color="#131314" />
            <TextInput
              style={[styles.input, { fontFamily: 'Montserrat-Regular' }]}
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
                size={15}
                color="#131314"
              />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword ? <Text style={[{color:"red"}]}>{errors.confirmPassword}</Text> : null}
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
            <TouchableOpacity
              onPress={() => togglePasswordVisibility('confirmPassword')}>
              <Feather
                name={confirmPasswordVisible ? 'eye' : 'eye-off'}
                size={15}
                color="#131314"
              />
            </TouchableOpacity>
          </View>
          {errors.number ? <Text style={[{color:"red"}]}>{errors.number}</Text> : null}
          <View style={styles.mobileNumberInput}>
            <View style={{ width: 95 }}>
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
                      style={{ marginRight: 10 }}
                      source={require('../../image/flagIcon.png')}
                    />
                  )}
                />
              </View>
            </View>
            <TextInput
              style={styles.input}
              placeholder="00 00 00 00 00)"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={11}
              value={number}
              onChangeText={text => setNumber(text)}
            />
          </View>
          {errors.dropdownCountryValue ? <Text style={[{color:"red", marginTop: 20}]}>{errors.dropdownCountryValue}</Text> : null}
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
                  style={{ marginRight: 10 }}
                  name="globe"
                  size={18}
                  color={colors.text}
                />
              )}
            />
          </View>
          {errors.selectedAccountType ? <Text style={[{color:"red"}]}>{errors.selectedAccountType}</Text> : null}
          <View>
            <Text style={styles.accountType}>Create account as:</Text>

            {/* Individual Account Type */}
            <TouchableOpacity
              style={[
                styles.accountCard,
                selectedAccountType !== 'individual' && styles.notSelectedCard,
                selectedAccountType === 'individual' && styles.selectedCard,
              ]}
              onPress={() => handleAccountTypeSelection('individual')}>
              <AntDesign name="user" size={20} color="#131314" />
              <Text style={styles.accountTitle}>Individual</Text>
              {selectedAccountType === 'individual' && (
                <View style={styles.checkIcon}>
                  <MaterialIcons name="check" size={15} color={colors.white} />
                </View>
              )}
              {selectedAccountType !== 'individual' && (
                <View style={styles.cricleRound} />
              )}
            </TouchableOpacity>

            {/* Company Account Type */}
            <TouchableOpacity
              style={[
                styles.accountCard,
                selectedAccountType !== 'company' && styles.notSelectedCard,
                selectedAccountType === 'company' && styles.selectedCard,
              ]}
              onPress={() => handleAccountTypeSelection('company')}>
              <Image source={require('../../image/bulding.png')} />
              <Text style={styles.accountTitle}>Company</Text>
              {selectedAccountType === 'company' && (
                <View style={styles.checkIcon}>
                  <MaterialIcons name="check" size={15} color={colors.white} />
                </View>
              )}
              {selectedAccountType !== 'company' && (
                <View style={styles.cricleRound} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            // onPress={() => navigation.navigate('PickupTakeSelfie')}
            onPress={() => handleSubmit()}
            style={[styles.logbutton, { backgroundColor: colors.primary }]}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LogInScreen')}
            style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Already have an account yet?{' '}
              <Text style={{ color: colors.primary }}>Login</Text>
            </Text>

            <View>
              <Text style={styles.termOfRapidmate}>
                By signing up you agree to{' '}
                <Text style={{ color: colors.primary }}>Privacy policy</Text> &{' '}
                <Text style={{ color: colors.primary }}>Terms</Text> of RapidMate
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logInText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  loginAccessText: {
    fontSize: 11,
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    width: '95%',
    marginTop: 5,
  },
  logFormView: {
    backgroundColor: '#fff',
    marginTop: 20,
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
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
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
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  signUpContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
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
    fontSize: 14,
    paddingHorizontal: 10,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  accountType: {
    fontFamily: 'Montserrat-Regular',
    marginBottom: 20,
    marginTop: 10,
    fontSize: 12,
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
    fontSize: 14,
    marginLeft: 5,
  },
  checkIcon: {
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
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
  termOfRapidmate: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 50,
    lineHeight: 20,
  },
  cricleRound: {
    width: 20,
    height: 20,
    padding: 3,
    borderRadius: 15,
    borderBlockColor: colors.text,
    borderWidth: 1,
  },
});

export default PickupSignup;
