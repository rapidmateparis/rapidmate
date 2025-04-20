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
import {Dropdown} from 'react-native-element-dropdown';
import ChoosePhotoByCameraGallaryModal from '../commonComponent/ChoosePhotoByCameraGallaryModal';
import {
  handleCameraLaunchFunction,
  handleImageLibraryLaunchFunction,
  localizationText,
} from '../../utils/common';
import {useUserDetails} from '../commonComponent/StoreContext';
import {uploadDocumentsApi} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';
import {colors} from '../../colors';

const EnterpriseAddMultpleDropDetails = ({route, navigation}) => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [orderid, setOrderid] = useState('');
  const [number, setNumber] = useState('');
  const [dropdownValue, setDropdownValue] = useState('+33');
  const [dropNotes, setDropNotes] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isModalVisibleCamera, setModalVisibleCamera] = useState(false);
  const [photoFileName, setPhotoFileName] = useState('');
  const [selectedId, setSelectedId] = useState();
  const {userDetails} = useUserDetails();
  const [packageImage, setPackageImage] = useState(null);
  const [packageImageId, setPackageImageId] = useState(null);
  const [errors, setErrors] = useState({});
  const {setLoading} = useLoader();
  const component = route?.params?.component ? route?.params?.component : '';
  const branches =
    route?.params?.props?.branches && route?.params?.props?.branches?.length > 0
      ? route?.params?.props.branches
      : [];
  const [branchList, setBranchList] = useState([]);
  const dropInformationText =
    localizationText('Common', 'dropInformation') || 'Drop Information';
  const firstNameText = localizationText('Common', 'firstName') || 'First Name';
  const lastNameText = localizationText('Common', 'lastName') || 'Last Name';
  const companyNameText =
    localizationText('Common', 'companyName') || 'Company Name';
  const emailText = localizationText('Common', 'email') || 'Email';
  const phoneNumber =
    localizationText('Common', 'phoneNumber') || 'Phone Number';
  const dropNotesText = localizationText('Common', 'dropNotes') || 'Drop Notes';
  const typeHereText = localizationText('Common', 'typeHere') || '';

  useEffect(() => {
    const list = [];
    for (const location of branches) {
      const branchID = route?.params?.props?.branch_id
        ? route?.params?.props?.branch_id
        : '';
      if (branchID) {
        list.push({...location, branch_id: branchID});
      } else {
        list.push({...location});
      }
      setBranchList([...list]);
    }
  }, [branches]);

  const data = [
    {label: '+91', value: '+91'},
    {label: '+33', value: '+33'},
  ];

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{9}$/; // Assuming 9-digit local number without country code
  
    let errors = {};
    let hasError = false;
  
    branchList.forEach((location, index) => {
      let dropErrors = {};
  
      if (!location.drop_first_name || location.drop_first_name.trim().length < 3) {
        dropErrors.drop_first_name = 'First name is required and must be at least 3 characters.';
      }
  
      if (!location.drop_email || !emailPattern.test(location.drop_email)) {
        dropErrors.drop_email = 'Valid email is required.';
      }
  
      if (!location.drop_mobile || !phonePattern.test(location.drop_mobile)) {
        dropErrors.drop_mobile = 'Valid phone number (9 digits) is required.';
      }
  
      if (!location.drop_notes || location.drop_notes.trim().length < 1) {
        dropErrors.drop_notes = 'Drop notes are required.';
      }
  
      if (Object.keys(dropErrors).length > 0) {
        hasError = true;
        errors[index] = dropErrors;
      }
    });
  
    setErrors(errors);
  
    if (hasError) {
      Alert.alert('Validation Error', 'Please fill the correct details.');
      return false;
    }
  
    return true;
  };

  const handleNextPress = () => {
    if (!validateForm()) return;
    const includeDropDetails = {
      ...route?.params,
      branches: branchList,
    };
    if (component === 'ENTERPRISE') {
      navigation.navigate('EnterprisePickupOrderPriview', {
        props: includeDropDetails,
      });
    } else {
      navigation.navigate('PickupOrderPreview', {props: includeDropDetails});
    }
  };

  const updateDropDetails = (value, key, index) => {
    const list = [...branchList];
    list[index][key] = value;
    setBranchList([...list]);
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 15}}>
        {branchList.length > 0 &&
          branchList.map((loctaion, index) => {
            return (
              <View style={styles.logFormView}>
                <Text style={styles.dropInformationTitles}>
                  {dropInformationText} {index + 1}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1, marginRight: 5}}>
                    <Text style={styles.textlable}>{firstNameText}*</Text>
                    <TextInput
                      style={styles.inputTextStyle}
                      placeholderTextColor="#999"
                      maxLength={15}
                      placeholder={typeHereText}
                      value={loctaion.drop_first_name}
                      onChangeText={text => {
                        updateDropDetails(text, 'drop_first_name', index);
                      }}
                    />
                  </View>

                  <View style={{flex: 1, marginLeft: 5}}>
                    <Text style={styles.textlable}>{lastNameText}</Text>
                    <TextInput
                      style={styles.inputTextStyle}
                      placeholderTextColor="#999"
                      maxLength={15}
                      placeholder={typeHereText}
                      value={loctaion.drop_last_name}
                      onChangeText={text =>
                        updateDropDetails(text, 'drop_last_name', index)
                      }
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1, marginRight: 5}}>
                    <Text style={styles.textlable}>{companyNameText}</Text>
                    <TextInput
                      style={styles.inputTextStyle}
                      placeholderTextColor="#999"
                      placeholder={typeHereText}
                      value={loctaion.drop_company_name}
                      onChangeText={text =>
                        updateDropDetails(text, 'drop_company_name', index)
                      }
                    />
                  </View>
                  <View style={{flex: 1, marginLeft: 5}}>
                    <Text style={styles.textlable}>{emailText}*</Text>
                    <TextInput
                      style={styles.inputTextStyle}
                      placeholderTextColor="#999"
                      placeholder={typeHereText}
                      value={loctaion.drop_email}
                      onChangeText={text =>
                        updateDropDetails(text, 'drop_email', index)
                      }
                    />
                  </View>
                </View>
                <View>
                  <Text style={styles.textlable}>{phoneNumber}*</Text>
                  <View style={styles.mobileNumberInput}>
                    <View style={{width: 95}}>
                      <View style={styles.containerDropdown}>
                        <Dropdown
                          data={data}
                          search
                          maxHeight={300}
                          itemTextStyle={styles.itemtextStyle}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
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
                      style={[
                        styles.input,
                        {fontFamily: 'Montserrat-Regular', fontSize: 16},
                      ]}
                      placeholder="00 00 00 00 00)"
                      placeholderTextColor="#999"
                      keyboardType="numeric"
                      maxLength={9}
                      value={loctaion.drop_mobile}
                      onChangeText={text =>
                        updateDropDetails(text, 'drop_mobile', index)
                      }
                    />
                  </View>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.textlable}>{dropNotesText}*</Text>
                  <TextInput
                    style={styles.inputTextStyle}
                    multiline={true}
                    numberOfLines={4}
                    placeholderTextColor="#999"
                    placeholder={typeHereText}
                    textAlignVertical="top"
                    value={loctaion.drop_notes}
                    onChangeText={text =>
                      updateDropDetails(text, 'drop_notes', index)
                    }
                  />
                </View>
              </View>
            );
          })}

        <TouchableOpacity
          onPress={() => handleNextPress()}
          style={[styles.logbutton, {backgroundColor: colors.primary}]}>
          <Text style={styles.buttonText}>
            {localizationText('Common', 'next')}
          </Text>
        </TouchableOpacity>
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
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#2C303336',
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
    marginVertical: 30,
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
  textlable: {
    fontFamily: 'Montserrat-Medium',
    marginBottom: 7,
    marginTop: 10,
    fontSize: 12,
    color: colors.text,
  },
  inputTextStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 12,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  dottedLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 8,
    borderWidth: 1,
    borderRadius: 5, // Controls dot size
    borderColor: '#ccc', // Color of the dots
    borderStyle: 'dashed',
    width: '100%', // Full width of the border
  },
  packagePhoto: {
    color: '#999',
    marginLeft: 5,
    paddingTop: 10,
    flex: 1,
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
  },
  packagePhotoPath: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC72B26',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  packagePhotoText: {
    color: colors.text,
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    borderRightWidth: 1,
    paddingRight: 5,
    borderColor: '#2C30331A',
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
  dropInformationTitles: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: colors.text,
    marginTop: 5,
  },
});

export default EnterpriseAddMultpleDropDetails;
