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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../colors';
import {useUserDetails} from '../../commonComponent/StoreContext';
import {API} from '../../../utils/constant';
import {Dropdown} from 'react-native-element-dropdown';
import {updateUserProfile} from '../../../data_manager';
import {useLoader} from '../../../utils/loaderContext';
import {localizationText} from '../../../utils/common';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeliveryboyManageProfile = ({navigation}) => {
  const {userDetails, saveUserDetails} = useUserDetails();

  const [isFocus, setIsFocus] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('+33');
  const [errors, setErrors] = useState({});
  const [number, setNumber] = useState(
    userDetails?.userDetails[0]?.phone || '',
  );
  const [email, setEmail] = useState(userDetails?.userDetails[0]?.email || '');
  const [vehicleNo, setVehicleNo] = useState(
    userDetails?.userDetails[0]?.plat_no || '',
  );
  const [vehicleModel, setVehicleModel] = useState(
    userDetails?.userDetails[0]?.modal || '',
  );
  const [vehicleMake, setVehicleMake] = useState(
    userDetails?.userDetails[0]?.make || '',
  );
  const [vehicleVariant, setVehicleVariant] = useState(
    userDetails?.userDetails[0]?.variant || '',
  );

  const [firstName, setFirstName] = useState(
    userDetails.userDetails[0].first_name,
  );
  const [lastName, setLastName] = useState(
    userDetails.userDetails[0].last_name,
  );
  const {setLoading} = useLoader();

  useEffect(() => {
    //setUserName(fullName);
  }, [userDetails]);

  const loadUserDetails = async () => {
    try {
      const storedUserDetails = await AsyncStorage.getItem('userDetails');
      if (storedUserDetails) {
        saveUserDetails(JSON.parse(storedUserDetails));
      }
    } catch (error) {
      console.error('Error loading user details:', error);
    }
  };

  useEffect(() => {
    loadUserDetails();
  }, []);

  const data = [
    {label: '+91', value: '+91'},
    {label: '+33', value: '+33'},
  ];
  // const saveUserDetailsInAsync = async userDetails => {
  //   await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
  // };

  const saveUserDetailsInAsync = async updatedUserDetails => {
    try {
      await AsyncStorage.setItem(
        'userDetails',
        JSON.stringify(updatedUserDetails),
      );
      console.log('User details saved successfully');
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  const saveProfileDetails = () => {
    let errors = {};

    // Validation
    if (!firstName.trim()) {
      errors.firstName = 'Name is required';
    } else if (firstName.length < 3) {
      errors.firstName = 'Name must be at least 3 characters long';
    }else if (!/^[A-Za-z\s]+$/.test(firstName)) {
      // console.log("name ======>", name);
      errors.firstName = 'Names should only contain letters';
    }

    if (lastName && !/^[A-Za-z\s]+$/.test(lastName)) {
      errors.lastname = 'Last name should contain letters only';
    }

    if (!number.trim()) {
      errors.number = 'Number is required';
    } else if (!/^\d+$/.test(number)) {
      errors.number = 'Number should be numeric';
    } else if (number.trim().length < 9) {
      errors.number = 'Invalid number';
    }
    if (!dropdownValue) {
      errors.dropdownValue = 'Please select country';
    }
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return false; // Stop if there are validation errors
    }

    setLoading(true);

    const profileParams = {
      ext_id: userDetails.userDetails[0].ext_id,
      first_name: firstName,
      last_name: lastName,
      phone: dropdownValue + number,
      plat_no: vehicleNo,
      modal: vehicleModel,
      make: vehicleMake,
      variant: vehicleVariant,
    };

    updateUserProfile(
      userDetails.userDetails[0].role,
      profileParams,
      successResponse => {
        setLoading(false);

        const updatedUserDetails = {
          ...userDetails,
          userDetails: [
            {
              ...userDetails.userDetails[0],
              email,
              first_name: firstName,
              last_name: lastName,
              phone: number,
              plat_no: vehicleNo,
              modal: vehicleModel,
              make: vehicleMake,
              variant: vehicleVariant,
              profile_pic:
                successResponse?.profile_pic ||
                userDetails.userDetails[0].profile_pic,
            },
          ],
        };

        console.log('Update profile TEST', updatedUserDetails);

        saveUserDetails(updatedUserDetails);
        saveUserDetailsInAsync(updatedUserDetails);

        console.log('updateUserProfile response', successResponse);
        Alert.alert('Success', 'Profile updated successfully', [{text: 'OK'}]);
      },
      errorResponse => {
        setLoading(false);
        console.log('updateUserProfile', errorResponse);
      },
    );

    return true;
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FFF'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.ConsumerProfileCard}>
          {userDetails.userDetails[0].profile_pic ? (
            <Image
              style={styles.profileImg}
              source={{
                uri: API.viewImageUrl + userDetails.userDetails[0].profile_pic,
              }}
            />
          ) : (
            <Image
              style={styles.profileImg}
              source={require('../../../image/settings-profile.jpeg')}
            />
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate('DeliveryboyTakeSelfie')}>
            <AntDesign
              style={styles.cameraIcon}
              name="camerao"
              size={25}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        {errors.firstName ? (
          <Text style={[{color: 'red'}]}>{errors.firstName}</Text>
        ) : null}
        <View style={{flex: 1}}>
          <Text style={styles.textlable}>
            {localizationText('Common', 'firstName')}
          </Text>
          <TextInput
            style={styles.inputTextStyle}
            placeholder={localizationText('Common', 'typeHere')}
            placeholderTextColor={'#999'}
            maxLength={15}
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
        </View>
        {errors.lastname ? (
          <Text style={[{color: 'red'}]}>{errors.lastname}</Text>
        ) : null}
        <View style={{flex: 1}}>
          <Text style={styles.textlable}>
            {localizationText('Common', 'lastName')}
          </Text>
          <TextInput
            style={styles.inputTextStyle}
            placeholder={localizationText('Common', 'typeHere')}
            placeholderTextColor={'#999'}
            maxLength={15}
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
        </View>
        {errors.number ? (
          <Text style={[{color: 'red'}]}>{errors.number}</Text>
        ) : null}
        <View>
          <Text style={styles.textlable}>
            {localizationText('Common', 'phoneNumber')}
          </Text>
          <View style={styles.mobileNumberInput}>
            <View style={{width: 95}}>
              <View style={styles.containerDropdown}>
                <Dropdown
                  data={data}
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
                    setIsFocus(false);
                  }}
                  renderLeftIcon={() => (
                    <Image
                      style={{marginRight: 10}}
                      source={require('../../../image/flagIcon.png')}
                    />
                  )}
                />
              </View>
            </View>
            <TextInput
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                color: colors.text,
              }}
              placeholder="00 00 00 00 00)"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={9}
              value={number}
              onChangeText={text => setNumber(text)}
            />
          </View>
        </View>
        {/* <View style={{flex: 1}}>
          <Text style={styles.textlable}>Email</Text>
          <TextInput
            style={styles.inputTextStyle}
            placeholder="Type here"
            placeholderTextColor={'#999'}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View> */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, marginRight: 10}}>
            <Text style={styles.textlable}>
              {localizationText('Common', 'vehicleNo')}
            </Text>
            <TextInput
              style={styles.inputTextStyle}
              placeholder={localizationText('Common', 'typeHere')}
              placeholderTextColor={'#999'}
              value={vehicleNo}
              onChangeText={text => setVehicleNo(text)}
            />
          </View>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.textlable}>
              {localizationText('Common', 'vehicleModel')}
            </Text>
            <TextInput
              style={styles.inputTextStyle}
              placeholder={localizationText('Common', 'typeHere')}
              placeholderTextColor={'#999'}
              value={vehicleModel}
              onChangeText={text => setVehicleModel(text)}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, marginRight: 10}}>
            <Text style={styles.textlable}>
              {localizationText('Common', 'vehicleMake')}
            </Text>
            <TextInput
              style={styles.inputTextStyle}
              placeholder={localizationText('Common', 'typeHere')}
              placeholderTextColor={'#999'}
              value={vehicleMake}
              onChangeText={text => setVehicleMake(text)}
            />
          </View>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.textlable}>
              {localizationText('Common', 'vehicleVariant')}
            </Text>
            <TextInput
              style={styles.inputTextStyle}
              placeholder={localizationText('Common', 'typeHere')}
              placeholderTextColor={'#999'}
              value={vehicleVariant}
              onChangeText={text => setVehicleVariant(text)}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => saveProfileDetails()}
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
  ConsumerProfileCard: {
    position: 'relative',
    paddingVertical: 20,
    flex: 1,
    alignItems: 'center',
  },
  profileImg: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  cameraIcon: {
    position: 'absolute',
    top: -25,
    left: 10,
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: colors.primary,
    paddingTop: 5,
    paddingLeft: 5,
  },
  textlable: {
    fontFamily: 'Montserrat-Medium',
    marginBottom: 7,
    fontSize: 12,
    color: colors.text,
  },
  inputTextStyle: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 12,
    padding: 10,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 15,
  },
  mobileNumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 15,
  },
  containerDropdown: {
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 2,
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
  logbutton: {
    width: '100%',
    marginVertical: 20,
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
});

export default DeliveryboyManageProfile;
