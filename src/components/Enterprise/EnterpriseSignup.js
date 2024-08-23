import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dropdown} from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../colors';
import CheckBox from '@react-native-community/checkbox';
import ChoosePhotoByCameraGallaryModal from '../commonComponent/ChoosePhotoByCameraGallaryModal';
import {
  handleCameraLaunchFunction,
  handleImageLibraryLaunchFunction,
} from '../../utils/common';
import {
  getCityList,
  getCountryList,
  getStateList,
  signUpUser,
} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';
import {useSignUpDetails} from '../commonComponent/StoreContext';
// import DropDownDropdown from '../common component/dropdown';

const EnterpriseSignup = ({navigation}) => {
  const [toggleCheckBoxFirst, setToggleCheckBoxFirst] = useState(false);
  const [toggleCheckBoxSecond, setToggleCheckBoxSecond] = useState(false);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [deliveries, setDeliveries] = useState('');
  const [number, setNumber] = useState('');
  const [siret, setSiret] = useState('');
  const [comments, setComments] = useState('');
  const [openDropDown, setOpenDropDown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('+33');
  const [dropdownCountryValue, setDropdownCountryValue] = useState(null);
  const [dropdownStateValue, setDropdownStateValue] = useState(null);
  const [dropdownCityValue, setDropdownCityValue] = useState(null);
  const [dropdownIndustryValue, setDropdownIndustryValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isModalVisibleCamera, setModalVisibleCamera] = useState(false);
  const {setLoading} = useLoader();
  const [masterCountryList, setMasterCountryList] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [masterStateList, setMasterStateList] = useState(null);
  const [masterCityList, setMasterCityList] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [errors, setErrors] = useState({});
  const {signUpDetails, saveSignUpDetails} = useSignUpDetails();

  const togglePasswordVisibility = field => {
    if (field === 'password') {
      setPasswordVisible(!passwordVisible);
    } else if (field === 'confirmPassword') {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  const toggleIndustrySelection = index => {
    if (selectedIndustry === index) {
      setSelectedIndustry(null); // Deselect if already selected
    } else {
      setSelectedIndustry(index); // Select the industry
    }
  };

  const data = [
    {label: '+91', value: '+91'},
    {label: '+33', value: '+33'},
  ];

  const industryList = [
    {label: 'Restaurants', value: 1},
    {label: 'Hospitals', value: 2},
    {label: 'Logistics', value: 3},
  ];

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
    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (confirmPassword.length < 6) {
      errors.confirmPassword =
        'Confirm password must be at least 6 characters long';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords does not match';
    }
    if (!number.trim()) {
      errors.number = 'Number is required';
    } else if (isNaN(number)) {
      errors.number = 'Number should be numeric';
    }
    if (!companyName.trim()) {
      errors.companyName = 'Company name is required';
    }
    if (!deliveries.trim()) {
      errors.deliveries = 'Deliveries per month is required';
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
    if (!comments) {
      errors.comments = 'Please describe your projects';
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
          userrole: signUpDetails.profile,
          firstName: name,
          lastName: lastname,
          companyName: companyName,
          deliveryMonthHours: deliveries + 'hours',
          description: comments,
          industryId: dropdownIndustryValue.toString(),
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
              saveSignUpDetails({
                ...signUpDetails,
                userName: email,
                password: password,
              });
              navigation.navigate('SignUpVerify');
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
              Enterprise{' '}
              <Text style={{fontFamily: 'Montserrat-Medium'}}>signup</Text>
            </Text>
            <Text style={styles.loginAccessText}>
              Let’s create your profile so you can request continuous scheduled
              deliveries
            </Text>
          </View>
          <Image
            style={{width: 45, height: 45}}
            source={require('../../image/home.png')}
          />
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
              <AntDesign name="user" size={18} color="#131314" />
              <TextInput
                style={styles.loginput}
                placeholder="First Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={text => setName(text)}
              />
            </View>

            <View style={styles.nameInputDiv}>
              <AntDesign name="user" size={18} color="#131314" />
              <TextInput
                style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
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
            <AntDesign name="mail" size={18} color="#131314" />
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
          {errors.companyName ? (
            <Text style={[{color: 'red'}]}>{errors.companyName}</Text>
          ) : null}
          <View style={styles.textInputDiv}>
            <FontAwesome6 name="warehouse" size={15} color="#131314" />
            <TextInput
              style={styles.loginput}
              placeholder="Company name"
              placeholderTextColor="#999"
              value={companyName}
              onChangeText={text => setCompanyName(text)}
            />
          </View>
          <View style={styles.containerCountry}>
            <Dropdown
              data={industryList}
              search
              maxHeight={300}
              itemTextStyle={{color: colors.text}}
              selectedTextStyle={{color: colors.text}}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Industry' : '...'}
              searchPlaceholder="Search.."
              value={dropdownIndustryValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setDropdownIndustryValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={{marginRight: 10}}
                  name="API"
                  size={18}
                  color={colors.text}
                />
              )}
            />
          </View>
          {errors.deliveries ? (
            <Text style={[{color: 'red'}]}>{errors.deliveries}</Text>
          ) : null}
          <View style={styles.textInputDiv}>
            <MaterialCommunityIcons name="package" size={18} color="#131314" />
            <TextInput
              style={styles.loginput}
              placeholder="Deliveries per month / Hours per month"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={deliveries}
              onChangeText={text => setDeliveries(text)}
            />
          </View>
          {errors.dropdownCountryValue ? (
            <Text style={[{color: 'red'}]}>{errors.dropdownCountryValue}</Text>
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
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            {errors.dropdownStateValue ? (
              <Text style={[{color: 'red'}]}>{errors.dropdownStateValue}</Text>
            ) : (
              <Text />
            )}
            {errors.dropdownCityValue ? (
              <Text style={[{color: 'red'}]}>{errors.dropdownCityValue}</Text>
            ) : null}
          </View>
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
                value={dropdownCountryValue}
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
            <Ionicons name="location-outline" size={18} color="#131314" />
            <TextInput
              style={styles.loginput}
              placeholder="Siret"
              placeholderTextColor="#999"
              value={siret}
              onChangeText={text => setSiret(text)}
            />
          </View>
          {errors.comments ? (
            <Text style={[{color: 'red'}]}>{errors.comments}</Text>
          ) : null}
          <View>
            <TextInput
              style={styles.inputTextStyle}
              multiline={true}
              numberOfLines={4} // Set the number of lines you want to display initially
              placeholder="Describe your projects here"
              placeholderTextColor="#999"
              textAlignVertical="top"
              value={comments}
              onChangeText={text => setComments(text)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheckBoxFirst}
              onValueChange={newValue => setToggleCheckBoxFirst(newValue)}
              style={{alignSelf: 'flex-start'}}
              tintColors={{true: '#FFC72B', false: '#000000'}}
            />
            <Text style={styles.checkboxText}>
              By checking this box, I authorise Rapidmate to use my information
              to send me communications regarding Rapidmate products and events.
              You can opt out of any marketing communications or customise your
              preferences at any time.
            </Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheckBoxSecond}
              onValueChange={newValue => setToggleCheckBoxSecond(newValue)}
              style={{alignSelf: 'flex-start'}}
              tintColors={{true: '#FFC72B', false: '#000000'}}
            />
            <View>
              <TouchableOpacity>
                <Text style={styles.checkboxText}>
                  By clicking on this box, you acknowledge that you have read
                  and understood the
                  <Text style={styles.pirvacyTextBold}> Privacy Policy</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleSignUp}
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
    marginBottom: 20,
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
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  nameInputDiv: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
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
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 25,
    paddingRight: 20,
  },
  inputTextStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: colors.text,
    borderRadius: 5,
    padding: 10,
    fontFamily: 'Montserrat-Regular',
  },
  industryMainCard: {
    borderWidth: 1,
    borderColor: '#2C303336',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 8,
    marginBottom: 20,
  },
  selectIndustryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  industryLeftIcons: {
    marginRight: 10,
  },
  industryText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    flex: 1,
  },
  typesIndustryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  industrySelectCircle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 50,
  },
  restaurantImage: {
    width: 14,
    height: 16,
  },
  GroceryImage: {
    width: 13.5,
    height: 15,
  },
  GiftImage: {
    width: 14,
    height: 16,
  },
  HealthImage: {
    width: 14,
    height: 14,
  },
  TechImage: {
    width: 13,
    height: 18,
  },
  ShoppingImage: {
    width: 15,
    height: 15,
  },
  ProfessionalImage: {
    width: 14.8,
    height: 14.8,
  },
  OtherImage: {
    width: 14.8,
    height: 14.8,
  },
});

export default EnterpriseSignup;
