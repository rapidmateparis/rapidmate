import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../../colors';
import {useSignUpDetails} from '../commonComponent/StoreContext';
import {getCountryList, signUpUser} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';
import {localizationText} from '../../utils/common';
// import DropDownDropdown from '../common component/dropdown';

const PickupSignup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedAccountType, setSelectedAccountType] = useState('');
  const [number, setNumber] = useState('');
  const [dropdownValue, setDropdownValue] = useState('33');
  const [dropdownCountryCodeValue, setDropdownCountryCodeValue] =
    useState('33');
  const [dropdownCountryValue, setDropdownCountryValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const {signUpDetails, saveSignUpDetails} = useSignUpDetails();
  const [errors, setErrors] = useState({});
  const {setLoading} = useLoader();
  const [masterCountryList, setMasterCountryList] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [countryCodeList, setCountryCodeList] = useState([]);

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
    } else if (name.length < 3) {
      errors.name = 'Name must be at least 3 characters long';
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
    /* if (!selectedAccountType) {
      errors.selectedAccountType = 'Please select an account type';
    } */
    if (!number.trim()) {
      errors.number = 'Number is required';
    } else if (isNaN(number)) {
      errors.number = 'Number should be numeric';
    } else if (number.trim().length < 9) {
      errors.number = 'Invalid number';
    }
    if (!dropdownCountryValue) {
      errors.dropdownCountryValue = 'Please select a country';
    }
    console.log(errors);
    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const data = [
    {label: '+91', value: '+91'},
    {label: '+33', value: '+33'},
  ];

  useEffect(() => {
    setLoading(true);
    getCountryList(
      (param = {}),
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == 'NotAuthorizedException') {
              Alert.alert('Error Alert', successResponse[0]._response.name, [
                {text: 'OK', onPress: () => {}},
              ]);
            } else {
              setMasterCountryList(successResponse[0]._response);
              var formattedCountryList = [];
              var formattedCountryCodeList = [];
              successResponse[0]._response.forEach(element => {
                formattedCountryList.push({
                  label: element.country_name,
                  value: element.id,
                  code: element.phone_code,
                });
                formattedCountryCodeList.push({
                  label: '+' + element.phone_code,
                  value: element.id,
                });
              });
              setCountryList(formattedCountryList);
              setCountryCodeList(formattedCountryCodeList);
              setDropdownValue(formattedCountryCodeList[0].value);
              setDropdownCountryCodeValue(formattedCountryCodeList[0].label);
            }
          }
        }
      },
      errorResponse => {
        console.log('errorResponse', errorResponse[0]._errors.message);
        setLoading(false);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  }, []);

  const handleSignUp = async () => {
    const isValid = validateForm();

    if (isValid) {
      let params = {
        info: {
          userName: email,
          email: email,
          phoneNumber: number,
          password: password,
          userrole: 'CONSUMER',
          firstName: name,
          lastName: '',
          phone_code: dropdownCountryCodeValue.toString(),
          country: dropdownCountryValue.toString(),
        },
      };
      setLoading(true);
      signUpUser(
        params,
        successResponse => {
          setLoading(false);
          console.log('successResponse =====>', successResponse);
          if (successResponse[0]._success) {
            if (successResponse[0]._response) {
              if (
                successResponse[0]._response.name == 'NotAuthorizedException'
              ) {
                Alert.alert('Error Alert', successResponse[0]._response.name, [
                  {text: 'OK', onPress: () => {}},
                ]);
              } else {
                saveSignUpDetails({
                  ...signUpDetails,
                  userName: email,
                  password: password,
                });
                navigation.navigate('SignUpVerify');
              }
            }
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
    // else {
    //   // Show error message for invalid email or phone number
    //   console.log('Invalid email or phone number');
    //   Alert.alert('Error Alert', 'Invalid email or phone number', [
    //     {text: 'OK', onPress: () => {}},
    //   ]);
    // }
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '85%'}}>
            <Text style={[styles.logInText, {color: colors.black}]}>
              {localizationText('Common', 'pickupAndDropoff')}{' '}
              <Text style={{fontFamily: 'Montserrat-Medium'}}>
                {localizationText('Common', 'signup')}
              </Text>
            </Text>
            <Text style={styles.loginAccessText}>
              {localizationText('Main', 'pickupDropSignupDescription')}
            </Text>
          </View>
          <Image
            style={{width: 40, height: 40}}
            source={require('../../image/location-map.png')}
          />
        </View>
        <View style={styles.logFormView}>
          {errors.name ? (
            <Text style={[{color: 'red'}]}>{errors.name}</Text>
          ) : null}
          <View style={styles.textInputDiv}>
            <AntDesign name="user" size={18} color="#131314" />
            <TextInput
              style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
              placeholder={localizationText('Common', 'fullName')}
              placeholderTextColor="#999"
              maxLength={15}
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          {errors.email ? (
            <Text style={[{color: 'red'}]}>{errors.email}</Text>
          ) : null}
          <View style={styles.textInputDiv}>
            <AntDesign name="mail" size={18} color="#131314" />
            <TextInput
              style={styles.loginput}
              placeholder={localizationText('Common', 'email')}
              placeholderTextColor="#999"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          {errors.password ? (
            <Text style={[{color: 'red'}]}>{errors.password}</Text>
          ) : null}
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={18} color="#131314" />
            <TextInput
              style={[styles.input, {fontFamily: 'Montserrat-Regular'}]}
              placeholder={localizationText('Common', 'password')}
              placeholderTextColor="#999"
              maxLength={10}
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
          {errors.confirmPassword ? (
            <Text style={[{color: 'red'}]}>{errors.confirmPassword}</Text>
          ) : null}
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={18} color="#131314" />
            <TextInput
              style={styles.input}
              placeholder={localizationText('Common', 'confirmPassword')}
              placeholderTextColor="#999"
              maxLength={10}
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
          {errors.number ? (
            <Text style={[{color: 'red'}]}>{errors.number}</Text>
          ) : null}
          <View style={styles.mobileNumberInput}>
            <View style={{width: 95}}>
              <View style={styles.containerDropdown}>
                <Dropdown
                  data={countryCodeList}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  itemTextStyle={styles.itemtextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  style={{color: colors.black}}
                  placeholder={!isFocus ? '+33' : '...'}
                  searchPlaceholder="+.."
                  value={dropdownValue}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setDropdownValue(item.value);
                    setDropdownCountryCodeValue(item.label);
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
              style={styles.input}
              placeholder="00 00 00 00 00)"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={9}
              value={number}
              onChangeText={text => setNumber(text)}
            />
          </View>
          {errors.dropdownCountryValue ? (
            <Text style={[{color: 'red', marginTop: 20}]}>
              {errors.dropdownCountryValue}
            </Text>
          ) : null}
          <View style={styles.containerCountry}>
            <Dropdown
              data={countryList}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              itemTextStyle={styles.itemtextStyle}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
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
                  size={18}
                  color={colors.black}
                />
              )}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              handleSignUp();
            }}
            style={[styles.logbutton, {backgroundColor: colors.primary}]}>
            <Text style={styles.buttonText}>
              {localizationText('Common', 'continue')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LogInScreen')}
            style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              {localizationText('Common', 'alreadyHaveAccount')}{' '}
              <Text style={{color: colors.primary}}>
                {localizationText('Common', 'login')}
              </Text>
            </Text>

            <View>
              <Text style={styles.termOfRapidmate}>
                {localizationText('Common', 'bySigningAgreeText')}{' '}
                <Text
                  onPress={() => navigation.navigate('PrivacyPolicy')}
                  style={{color: colors.primary}}>
                  {localizationText('Common', 'privacyPolicy')}
                </Text>{' '}
                &{' '}
                <Text
                  onPress={() => navigation.navigate('TermsAndConditions')}
                  style={{color: colors.primary}}>
                  {localizationText('Common', 'termsOfRapidmate')}
                </Text>{' '}
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
    color: colors.black,
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
    color: colors.black,
    fontFamily: 'Montserrat-Medium',
  },
  signUpContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  notSelectedCard: {},
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
    color: colors.black,
    fontFamily: 'Montserrat-Regular',
  },
  accountType: {
    fontFamily: 'Montserrat-Regular',
    marginBottom: 20,
    marginTop: 10,
    fontSize: 12,
    color: colors.black,
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
    color: colors.black,
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
    color: colors.black,
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
    borderBlockColor: colors.black,
    borderWidth: 1,
  },
  placeholderStyle: {
    color: '#999',
    fontSize: 12,
  },
  selectedTextStyle: {
    color: '#999',
    fontSize: 12,
  },
  inputSearchStyle: {
    color: '#999',
    fontSize: 12,
  },
  itemtextStyle: {
    color: colors.text,
    fontSize: 12,
  },
});

export default PickupSignup;
