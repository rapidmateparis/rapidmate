import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../../colors';
import { useLoader } from '../../../utils/loaderContext';
import { useUserDetails } from '../../commonComponent/StoreContext';
import { getCityList, getCountryList, getDeliveryBoyBillingDetails, getStateList, updateDeliveryBoyBillingDetails } from '../../../data_manager';

const DeliveryboyBillingDetails = () => {
  const [accountType, setAccountType] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [postalcode, setPostalCode] = useState('');
  const [dninumber, setDNINumber] = useState('');
  const [dropdownCountryValue, setDropdownCountryValue] = useState(1);
  const [dropdownStateValue, setDropdownStateValue] = useState(1);
  const [dropdownCityValue, setDropdownCityValue] = useState(1);
  const {setLoading} = useLoader();
  const {userDetails,saveUserDetails} = useUserDetails();

  const account = [
    {label: 'Individual', value: 1},
    {label: 'Company', value: 2},
  ];


  const [countryList, setCountryList] = useState([]);
  const [masterStateList, setMasterStateList] = useState(null);
  const [masterCityList, setMasterCityList] = useState(null);

  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [billingDetails, setBillingDetails] = useState({});

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
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
    getBillingDetails()
  }, []);


  useEffect(()=>{
    if(masterStateList?.length > 0){
    var formattedStateList = [];
      masterStateList.forEach(element => {
        if (billingDetails.country_id == element.country_id) {
          formattedStateList.push({
            label: element.state_name,
            value: element.id,
          });
        }
      });
      setStateList(formattedStateList);
    }

    if(masterCityList?.length > 0){
      var formattedCityList = [];
        masterCityList.forEach(element => {
          if (billingDetails.state_id == element.state_id) {
            formattedCityList.push({
              label: element.city_name,
              value: element.id,
            });
          }
        });
        setCityList(formattedCityList);
      }
  },[billingDetails,masterCityList,masterStateList])

  const getBillingDetails=()=>{
    setLoading(true);
    
    getDeliveryBoyBillingDetails(
      userDetails.userDetails[0].ext_id,
      successResponse => {
        setLoading(false);
        console.log('get details', JSON.stringify(successResponse));

        if(successResponse[0]?._response){

          const details = successResponse[0]?._response
          setFirstName(details.first_name)
          setLastName(details.last_name)
          setAddress(details.address)
          setPostalCode(details.postal_code)
          setDNINumber(details.dni_number)
          setAccountType(details.account_type)
          setDropdownCountryValue(details.country_id)
          setDropdownStateValue(details.state_id)
          setDropdownCityValue(details.city_id)
          setBillingDetails(details)
        }
        
      },
      errorResponse => {
        setLoading(false);
        console.log('updateUserProfile', errorResponse);
      },
    );
  }


  const updateBillingDetails=()=>{
    setLoading(true);
    let profileParams = {

      delivery_boy_ext_id: userDetails.userDetails[0].ext_id,
      first_name: firstName,
      last_name: lastName,
      address: address,
      city_id: dropdownCityValue,
      state_id: dropdownStateValue,
      country_id: dropdownCountryValue,
      dni_number: dninumber,
      postal_code: postalcode,
      account_type:accountType
    };
    updateDeliveryBoyBillingDetails(
      profileParams,
      successResponse => {
        setLoading(false);
        console.log('updatebilling details', successResponse);
        Alert.alert('Success', '' + 'Billing details updated successful', [
          {
            text: 'OK',
            onPress: () => {
              // navigation.goBack();
            },
          },
        ]);
      },
      errorResponse => {
        setLoading(false);
        console.log('updateUserProfile', errorResponse);
      },
    );
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15, marginVertical: 15}}>
        <View>
          <Text style={styles.label}>Account</Text>
          <View style={styles.containerCountry}>
            <Dropdown
              data={account}
              itemTextStyle={styles.itemtextStyle}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={accountType}
              onChange={item => setAccountType(item.value)}
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
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
          </View>
          <View style={styles.nameInputDiv}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.loginput}
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.normalInput}
            value={address}
            onChangeText={text => setAddress(text)}
          />
        </View>

        <View>
          <Text style={styles.label}>Country</Text>
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

              onChange={item => {
                setDropdownCountryValue(item.value);
                // setIsFocus(false);
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


              // onChange={item => setDropdownCountryValue(item.value)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>State</Text>
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
              // onChange={item => setDropdownStateValue(item.value)}
              onChange={item => {
                setDropdownStateValue(item.value);
                // setIsFocus(false);
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
          <Text style={styles.label}>Postal Code</Text>
          <TextInput
            style={styles.normalInput}
            value={postalcode}
            onChangeText={text => setPostalCode(text)}
          />
        </View>

        <View>
          <Text style={styles.label}>DNI Number</Text>
          <TextInput
            style={styles.normalInput}
            value={dninumber}
            onChangeText={text => setDNINumber(text)}
          />
        </View>

        <TouchableOpacity
          onPress={()=>updateBillingDetails()}
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

export default DeliveryboyBillingDetails;
