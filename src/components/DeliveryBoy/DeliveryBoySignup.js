import React, {useEffect, useState} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../../colors';
import CheckBox from '@react-native-community/checkbox';
import {useLoader} from '../../utils/loaderContext';
import {
  getCityList,
  getCountryList,
  getStateList,
  signUpUser,
} from '../../data_manager';
// import DropDownDropdown from '../common component/dropdown';

const DeliveryBoySignup = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [number, setNumber] = useState('');
  const [siret, setSiret] = useState('');
  const [openDropDown, setOpenDropDown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('+33');
  const [dropdownCountryValue, setDropdownCountryValue] = useState(null);
  const [dropdownStateValue, setDropdownStateValue] = useState(null);
  const [dropdownCityValue, setDropdownCityValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isModalVisibleCamera, setModalVisibleCamera] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {setLoading} = useLoader();
  const [masterCountryList, setMasterCountryList] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [masterStateList, setMasterStateList] = useState(null);
  const [masterCityList, setMasterCityList] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
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

  useEffect(() => {
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
              successResponse[0]._response.forEach(element => {
                formattedCountryList.push({
                  label: element.country_name,
                  value: element.id,
                });
              });
              setCountryList(formattedCountryList);
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

    getStateList(
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
              setMasterStateList(successResponse[0]._response);
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

    getCityList(
      null,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == 'NotAuthorizedException') {
              Alert.alert('Error Alert', successResponse[0]._response.name, [
                {text: 'OK', onPress: () => {}},
              ]);
            } else {
              setMasterCityList(successResponse[0]._response);
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

  const data = [
    {label: '+91', value: '+91'},
    {label: '+33', value: '+33'},
  ];

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?\d{10,15}$/;

    let errors = {};
    if (!name.trim()) {
      errors.name = 'First name is required';
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
    if (!number.trim()) {
      errors.number = 'Number is required';
    } else if (isNaN(number)) {
      errors.number = 'Number should be numeric';
    }
    if (!dropdownCountryValue) {
      errors.dropdownCountryValue = 'Please select a country';
    }
    if (!dropdownStateValue) {
      errors.dropdownStateValue = 'Please select a state';
    }
    if (!dropdownCityValue) {
      errors.dropdownCityValue = 'Please select a city';
    }
    console.log(errors);
    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSignUp = async () => {
    const isValid = validateForm();

    if (isValid) {
      let params = {
        info: {
          userName: email,
          email: email,
          phoneNumber: dropdownValue + number,
          password: password,
          userrole: 'DELIVERY_BOY',
          firstName: name,
          lastName: lastname,
          city: dropdownCityValue.toString(),
          state: dropdownStateValue.toString(),
          country: dropdownCountryValue.toString(),
          siretNo: '4352354',
          termone: 1,
        },
      };
      setLoading(true);
      signUpUser(
        params,
        successResponse => {
          console.log('successResponse', successResponse);
          setLoading(false);
          if (successResponse[0]._success) {
            if (successResponse[0]._response) {
              if (
                successResponse[0]._response.name == 'NotAuthorizedException'
              ) {
                Alert.alert('Error Alert', successResponse[0]._response.name, [
                  {text: 'OK', onPress: () => {}},
                ]);
              } else if (successResponse[0]._httpsStatusCode == 200) {
                navigation.navigate('DeliveryboyTakeSelfie', {
                  delivery_boy_details: successResponse[0]._response,
                });
              }
            }
          }
        },
        errorResponse => {
          console.log('errorResponse', errorResponse[0]._errors.message[0]);
          setLoading(false);
          Alert.alert('Error Alert', errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    }
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 15, marginTop: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '85%'}}>
            <Text style={[styles.logInText, {color: colors.text}]}>
              Delivery Boy{' '}
              <Text style={{fontFamily: 'Montserrat-Medium'}}>signup</Text>
            </Text>
            <Text style={styles.loginAccessText}>
              Let’s create your profile so you can have complete experience of
              the app.
            </Text>
          </View>
          <View style={styles.profilePhotoCard}>
            <Image
              style={{width: 40, height: 60}}
              source={require('../../image/DeliveryBoy-Icon.png')}
            />
          </View>
        </View>
        <View style={styles.logFormView}>
          {errors.name ? (
            <Text style={[{color: 'red'}]}>{errors.name}</Text>
          ) : null}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={styles.nameInputDiv}>
              <AntDesign
                name="user"
                size={18}
                color="#131314"
                style={{marginTop: 13}}
              />
              <TextInput
                style={styles.loginput}
                placeholder="First Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={text => setName(text)}
              />
            </View>

            <View style={styles.nameInputDiv}>
              <AntDesign
                name="user"
                size={18}
                color="#131314"
                style={{marginTop: 13}}
              />
              <TextInput
                style={styles.loginput}
                placeholder="Last Name"
                placeholderTextColor="#999"
                value={lastname}
                onChangeText={text => setLastname(text)}
              />
            </View>
          </View>
          {errors.email ? (
            <Text style={[{color: 'red'}]}>{errors.email}</Text>
          ) : null}
          <View style={styles.textInputDiv}>
            <AntDesign
              name="mail"
              size={18}
              color="#131314"
              style={{marginTop: 13}}
            />
            <TextInput
              style={styles.loginput}
              placeholder="Email"
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
              style={styles.input}
              placeholder="Password"
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
          {errors.confirmPassword ? (
            <Text style={[{color: 'red'}]}>{errors.confirmPassword}</Text>
          ) : null}
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={18} color="#131314" />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
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
          {errors.number ? (
            <Text style={[{color: 'red'}]}>{errors.number}</Text>
          ) : null}
          <View style={styles.mobileNumberInput}>
            <View style={{width: 95}}>
              <View style={styles.containerDropdown}>
                <Dropdown
                  data={data}
                  search
                  maxHeight={300}
                  itemTextStyle={{color: colors.text}}
                  selectedTextStyle={{color: colors.text}}
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
              style={styles.input}
              placeholder="00 00 00 00 00)"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={11}
              value={number}
              onChangeText={text => setNumber(text)}
            />
          </View>
          {errors.dropdownCountryValue ? (
            <Text style={[{color: 'red', marginTop: 20, marginBottom: -20}]}>
              {errors.dropdownCountryValue}
            </Text>
          ) : null}
          <View style={styles.containerCountry}>
            <Dropdown
              data={countryList}
              search
              maxHeight={300}
              itemTextStyle={{color: colors.text}}
              selectedTextStyle={{color: colors.text}}
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
                var formattedStateList = [];
                masterStateList.forEach(element => {
                  if (item.value == element.country_id) {
                    formattedStateList.push({
                      label: element.state_name,
                      value: element.id,
                    });
                  }
                });
                setStateList(formattedStateList);
              }}
              renderLeftIcon={() => (
                <FontAwesome6
                  style={{marginRight: 10}}
                  name="globe"
                  size={18}
                  color={colors.text}
                />
              )}
            />
          </View>
          {errors.dropdownStateValue ? (
            <Text style={[{color: 'red'}]}>{errors.dropdownStateValue}</Text>
          ) : null}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={styles.containerCity}>
              <Dropdown
                data={stateList}
                search
                maxHeight={300}
                itemTextStyle={{color: colors.text}}
                selectedTextStyle={{color: colors.text}}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Ain' : '...'}
                searchPlaceholder="Search.."
                value={dropdownStateValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setDropdownStateValue(item.value);
                  setIsFocus(false);
                  var formattedCityList = [];
                  masterCityList.forEach(element => {
                    if (item.value == element.state_id) {
                      formattedCityList.push({
                        label: element.city_name,
                        value: element.id,
                      });
                    }
                  });
                  setCityList(formattedCityList);
                }}
                renderLeftIcon={() => (
                  <FontAwesome6
                    style={{marginRight: 10}}
                    name="globe"
                    size={18}
                    color={colors.text}
                  />
                )}
              />
            </View>

            <View style={styles.containerCity}>
              <Dropdown
                data={cityList}
                search
                maxHeight={300}
                itemTextStyle={{color: colors.text}}
                selectedTextStyle={{color: colors.text}}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'ambérieu-e...' : '...'}
                searchPlaceholder="Search.."
                value={dropdownCountryValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setDropdownCityValue(item.value);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <FontAwesome6
                    style={{marginRight: 10}}
                    name="globe"
                    size={18}
                    color={colors.text}
                  />
                )}
              />
            </View>
          </View>
          <View style={styles.textInputDiv}>
            <Ionicons
              name="location-outline"
              size={18}
              color="#131314"
              style={{marginTop: 13}}
            />
            <TextInput
              style={styles.loginput}
              placeholder="Siret"
              placeholderTextColor="#999"
              value={siret}
              onChangeText={text => setSiret(text)}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              style={{alignSelf: 'flex-start'}}
            />
            <Text style={styles.checkboxText}>
              We collect this data for the purposes of processing your
              application to become a courier. By clicking this box, you
              acknowledge that you have read and understood the{' '}
              <TouchableOpacity>
                <Text style={styles.pirvacyTextBold}>Privacy Policy</Text>
              </TouchableOpacity>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleSignUp();
            }}
            style={[styles.logbutton, {backgroundColor: colors.primary}]}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LogInScreen')}
            style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Already have an account?{' '}
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
    paddingTop: 20,
  },
  textInputDiv: {
    flexDirection: 'row',
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
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
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
    marginVertical: 30,
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
    fontSize: 12,
    paddingHorizontal: 10,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
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
    paddingHorizontal: 10,
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
    marginBottom: 20,
  },
  nameInputDiv: {
    width: '48%',
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  containerCity: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    marginLeft: 5,
  },
  pirvacyTextBold: {
    fontFamily: 'Montserrat-Bold',
    color: colors.primary,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 25,
  },
});

export default DeliveryBoySignup;
