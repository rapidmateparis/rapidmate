import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../../colors';
import {localizationText} from '../../../utils/common';
import {useUserDetails} from '../../commonComponent/StoreContext';
import {
  getBillingAddressDetails,
  updateBillingAddressDetails,
} from '../../../data_manager';
import {useLoader} from '../../../utils/loaderContext';

const EnterpriseBillingDetail = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [postalcode, setPostalCode] = useState('');
  const [dninumber, setDNINumber] = useState('');
  const [dropdownCountryValue, setDropdownCountryValue] = useState(1);
  const [dropdownStateValue, setDropdownStateValue] = useState(1);
  const [dropdownCityValue, setDropdownCityValue] = useState(1);
  const {userDetails} = useUserDetails();
  const {setLoading} = useLoader();

  const setBillingDetails = billingDetails => {
    setFirstName(billingDetails.first_name);
    setLastName(billingDetails.last_name);
    setAddress(billingDetails?.address);
    setDNINumber(billingDetails?.dni_number);
    setDropdownStateValue(billingDetails?.state_id);
    setDropdownCityValue(billingDetails?.city_id);
    setDropdownCountryValue(billingDetails?.country_id);
    setPostalCode(billingDetails?.postal_code);
  };

  const getBillingDetails = () => {
    setLoading(true);
    getBillingAddressDetails(
      userDetails.userDetails[0].ext_id,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._response.length > 0) {
          const billingDetails = successResponse[0]._response[0];
          setBillingDetails(billingDetails);
        }
      },
      errorResponse => {
        console.log('errorResponse Billing Details', errorResponse);
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    getBillingDetails();
  }, [userDetails.userDetails[0].ext_id]);

  const account = [
    {label: 'Individual', value: 1},
    {label: 'Company', value: 2},
  ];

  const countryList = [
    {label: 'USA', value: 1},
    {label: 'Canada', value: 2},
  ];

  const stateList = [
    {label: 'California', value: 1},
    {label: 'Ontario', value: 2},
  ];

  const cityList = [
    {label: 'Los Angeles', value: 1},
    {label: 'Toronto', value: 2},
  ];

  const updateBillingDetails = () => {
    if (!validateFields()) return;

    setLoading(true);
    const body = {
      first_name: firstName,
      last_name: lastName,
      address,
      postal_code: postalcode,
      dni_number: dninumber,
      country_id: dropdownCountryValue,
      state_id: dropdownStateValue,
      city_id: dropdownCityValue,
      enterprise_ext_id: userDetails.userDetails[0].ext_id,
    };

    updateBillingAddressDetails(
      userDetails.userDetails[0].ext_id,
      body,
      successResponse => {
        setLoading(false);
        const billingDetails = successResponse[0]._response;
        setBillingDetails(billingDetails);
      },
      errorResponse => {
        setLoading(false);
        console.log('error message===>', JSON.stringify(errorResponse));
      },
    );
  };

  const validateFields = () => {
    if (!firstName.trim()) {
      Alert.alert('Validation Error', 'First name is required');
      return false;
    }
    if (!lastName.trim()) {
      Alert.alert('Validation Error', 'Last name is required');
      return false;
    }
    if (!address.trim()) {
      Alert.alert('Validation Error', 'Address is required');
      return false;
    }
    if (!postalcode.trim()) {
      Alert.alert('Validation Error', 'Postal code is required');
      return false;
    }
    if (!dninumber.trim()) {
      Alert.alert('Validation Error', 'DNI number is required');
      return false;
    }
    return true;
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15, marginVertical: 15}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={[styles.nameInputDiv, {marginRight: 10}]}>
            <Text style={styles.label}>
              {localizationText('Common', 'firstName')}
            </Text>
            <TextInput
              style={styles.loginput}
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
          </View>
          <View style={styles.nameInputDiv}>
            <Text style={styles.label}>
              {localizationText('Common', 'lastName')}
            </Text>
            <TextInput
              style={styles.loginput}
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>
            {localizationText('Common', 'address')}
          </Text>
          <TextInput
            style={styles.normalInput}
            value={address}
            onChangeText={text => setAddress(text)}
          />
        </View>

        <View>
          <Text style={styles.label}>
            {localizationText('Common', 'country')}
          </Text>
          <View style={styles.containerCountry}>
            <Dropdown
              data={countryList}
              itemTextStyle={styles.itemtextStyle}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={dropdownCountryValue}
              onChange={item => setDropdownCountryValue(item.value)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>
            {localizationText('Common', 'state')}
          </Text>
          <View style={styles.containerCountry}>
            <Dropdown
              data={stateList}
              itemTextStyle={styles.itemtextStyle}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={dropdownStateValue}
              onChange={item => setDropdownStateValue(item.value)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>{localizationText('Common', 'city')}</Text>
          <View style={styles.containerCountry}>
            <Dropdown
              data={cityList}
              itemTextStyle={styles.itemtextStyle}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={dropdownCityValue}
              onChange={item => setDropdownCityValue(item.value)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>
            {localizationText('Common', 'postalCode')}
          </Text>
          <TextInput
            style={styles.normalInput}
            value={postalcode}
            onChangeText={text => setPostalCode(text)}
          />
        </View>

        <View>
          <Text style={styles.label}>
            {localizationText('Common', 'dniNumber')}
          </Text>
          <TextInput
            style={styles.normalInput}
            value={dninumber}
            onChangeText={text => setDNINumber(text)}
          />
        </View>

        <TouchableOpacity
          onPress={() => updateBillingDetails()}
          style={[styles.logbutton, {backgroundColor: colors.primary}]}>
          <Text style={styles.buttonText}>
            {localizationText('Common', 'save')}
          </Text>
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
    color: colors.black,
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
    color: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#2C303336',
    backgroundColor: colors.white,
  },
  nameInputDiv: {
    width: '50%',
    marginBottom: 15,
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

export default EnterpriseBillingDetail;
