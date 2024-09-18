import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../colors';
import {Dropdown} from 'react-native-element-dropdown';
import {
  addConsumerBillingDetails,
  getCityList,
  getCountryList,
  getStateList,
} from '../../../data_manager';
import {useLoader} from '../../../utils/loaderContext';
import {useUserDetails} from '../../commonComponent/StoreContext';

const PickupBillingDetails = ({navigation}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [accountType, setAccountType] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [postalcode, setPostalCode] = useState(null);
  const [dninumber, setDNINumber] = useState(null);
  const {setLoading} = useLoader();
  const {userDetails} = useUserDetails();

  const [dropdownCountryValue, setDropdownCountryValue] = useState(null);
  const [dropdownStateValue, setDropdownStateValue] = useState(null);
  const [dropdownCityValue, setDropdownCityValue] = useState(null);

  const [masterCountryList, setMasterCountryList] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [masterStateList, setMasterStateList] = useState(null);
  const [masterCityList, setMasterCityList] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const account = [
    {label: 'Individual', value: 'Individual'},
    {label: 'Company', value: 'Company'},
  ];

  useEffect(() => {
    getCountryList(
      {},
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
      {},
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
        setLoading(false);
        console.log('errorResponse', errorResponse[0]._errors.message);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  }, []);

  const submitBillingDetails = () => {
    let params = {
      id: 1,
      consumer_ext_id: userDetails.userDetails[0].ext_id,
      first_name: firstName,
      last_name: lastName,
      address: address,
      city_id: dropdownCityValue.toString(),
      state_id: dropdownStateValue.toString(),
      country_id: dropdownCountryValue.toString(),
      dni_number: dninumber,
      postal_code: postalcode,
    };

    addConsumerBillingDetails(
      params,
      successResponse => {
        Alert.alert('Error Alert', successResponse[0]._response.message, [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      },
      errorResponse => {
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View>
          <Text style={styles.label}>Account</Text>
          <View style={styles.containerCountry}>
            <Dropdown
              data={account}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Individual'}
              searchPlaceholder="Search.."
              value={accountType}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setAccountType(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={{marginRight: 10}}
                  name="user"
                  size={18}
                  color={colors.text}
                />
              )}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={[styles.nameInputDiv, {marginRight: 10}]}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.loginput}
              placeholder="Type here.."
              placeholderTextColor="#999"
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
          </View>

          <View style={styles.nameInputDiv}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.loginput}
              placeholder="Type here.."
              placeholderTextColor="#999"
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.normalInput}
            placeholder="Type here.."
            placeholderTextColor="#999"
            value={address}
            onChangeText={text => setAddress(text)}
          />
        </View>

        <View>
          <Text style={styles.label}>Country</Text>
          <View style={styles.containerCountry}>
            <Dropdown
              data={countryList}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select' : '...'}
              searchPlaceholder="Search.."
              value={country}
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
            />
          </View>
        </View>
        <View>
          <Text style={styles.label}>State</Text>
          <View style={styles.containerCountry}>
            <Dropdown
              data={stateList}
              search
              maxHeight={300}
              itemTextStyle={styles.itemtextStyle}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
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
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>City</Text>
          <View style={styles.containerCountry}>
            <Dropdown
              data={cityList}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select' : '...'}
              searchPlaceholder="Search.."
              value={city}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setDropdownCityValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>Postal Code</Text>
          <TextInput
            style={styles.normalInput}
            placeholder="Type here.."
            placeholderTextColor="#999"
            value={postalcode}
            maxLength={5}
            onChangeText={text => setPostalCode(text)}
          />
        </View>

        <View>
          <Text style={styles.label}>DNI Number</Text>
          <TextInput
            style={styles.normalInput}
            placeholder="Type here.."
            placeholderTextColor="#999"
            value={dninumber}
            onChangeText={text => setDNINumber(text)}
          />
        </View>

        <TouchableOpacity
          onPress={submitBillingDetails}
          style={[styles.logbutton, {backgroundColor: colors.primary}]}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#000',
    marginBottom: 5,
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
  containerCountry: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: colors.white,
  },
  normalInput: {
    fontSize: 12,
    paddingHorizontal: 15,
    width: '100%',
    fontFamily: 'Montserrat-Regular',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#2C303336',
    backgroundColor: colors.white,
    marginBottom: 15,
  },
  loginput: {
    fontSize: 12,
    paddingHorizontal: 15,
    width: '95%',
    fontFamily: 'Montserrat-Regular',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#2C303336',
    backgroundColor: colors.white,
  },
  nameInputDiv: {
    width: '50%',
    marginBottom: 15,
  },
  inputSearchStyle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  placeholderStyle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  selectedTextStyle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
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
  itemtextStyle: {
    color: colors.text,
    fontSize: 12,
  },
});

export default PickupBillingDetails;
