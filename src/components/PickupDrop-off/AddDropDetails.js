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

const AddDropDetails = ({route, navigation}) => {
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
  const params = route.params.props;
  const component = route?.params?.component ? route?.params?.component : '';

  const data = [
    {label: '+33', value: '+33'},
  ];

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?\d{10,15}$/;

    let errors = {};
    if (!name.trim()) {
      errors.name = 'First name is required';
    } else if (name.length < 3) {
      errors.name = 'Name must be at least 3 characters long';
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      console.log("name ======>", name);
      errors.name = 'Names should only contain letters';
    }
   
  if (lastname && !/^[A-Za-z\s]+$/.test(lastname)) {
    errors.name = 'Last name should contain letters only';
  }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      errors.email = 'Email address is invalid';
    }
    if (!number.trim()) {
      errors.number = 'Number is required';
    }else if (!/^\d+$/.test(number)) {
      errors.number = 'Number should be numeric';
    } else if (number.trim().length < 9) {
      errors.number = 'Invalid number';
    }

    if (!dropdownValue) {
      errors.dropdownValue = 'Please select country';
    }
    if (!dropNotes.trim()) {
      errors.dropNotes = 'Drop note is required';
    }
    console.log(errors);
    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleNextPress = () => {
    if (!validateForm()) return;
    const includeDropDetails = {
      ...params,
      drop_details: {
        drop_first_name: name,
        drop_last_name: lastname,
        drop_mobile: number,
        drop_notes: dropNotes,
        drop_email: email,
        drop_company_name: company,
      },
    };
    if (component === 'ENTERPRISE') {
      navigation.navigate('EnterprisePickupOrderPriview', {
        props: includeDropDetails,
      });
    } else {
      navigation.navigate('PickupOrderPreview', {props: includeDropDetails});
    }
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.logFormView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, marginRight: 10}}>
              <Text style={styles.textlable}>
                {localizationText('Common', 'firstName')}*
              </Text>
              <TextInput
                style={styles.inputTextStyle}
                placeholderTextColor="#999"
                maxLength={15}
                placeholder={localizationText('Common', 'typeHere')}
                value={name}
                onChangeText={text => setName(text)}
              />
            </View>

            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={styles.textlable}>
                {localizationText('Common', 'lastName')}
              </Text>
              <TextInput
                style={styles.inputTextStyle}
                placeholderTextColor="#999"
                maxLength={15}
                placeholder={localizationText('Common', 'typeHere')}
                value={lastname}
                onChangeText={text => setLastname(text)}
              />
            </View>
          </View>
          {errors.name ? (
            <Text style={[{color: 'red'}]}>{errors.name}</Text>
          ) : null}
          <View style={{flex: 1}}>
            <Text style={styles.textlable}>
              {localizationText('Common', 'companyName')}
            </Text>
            <TextInput
              style={styles.inputTextStyle}
              placeholderTextColor="#999"
              placeholder={localizationText('Common', 'typeHere')}
              value={company}
              onChangeText={text => setCompany(text)}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.textlable}>
              {localizationText('Common', 'email')}*
            </Text>
            <TextInput
              style={styles.inputTextStyle}
              placeholderTextColor="#999"
              placeholder={localizationText('Common', 'typeHere')}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          {errors.email ? (
            <Text style={[{color: 'red'}]}>{errors.email}</Text>
          ) : null}
          <View>
            <Text style={styles.textlable}>
              {localizationText('Common', 'phoneNumber')}*
            </Text>
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
                value={number}
                onChangeText={text => setNumber(text)}
              />
            </View>
          </View>
          {errors.number ? (
            <Text style={[{color: 'red'}]}>{errors.number}</Text>
          ) : null}
          <View style={{flex: 1}}>
            <Text style={styles.textlable}>
              {localizationText('Common', 'dropNotes')}*
            </Text>
            <TextInput
              style={styles.inputTextStyle}
              multiline={true}
              numberOfLines={4}
              placeholderTextColor="#999"
              placeholder={localizationText('Common', 'typeHere')}
              textAlignVertical="top"
              value={dropNotes}
              onChangeText={text => setDropNotes(text)}
            />
          </View>
          {errors.dropNotes ? (
            <Text style={[{color: 'red'}]}>{errors.dropNotes}</Text>
          ) : null}
          <TouchableOpacity
            onPress={() => handleNextPress()}
            style={[styles.logbutton, {backgroundColor: colors.primary}]}>
            <Text style={styles.buttonText}>
              {localizationText('Common', 'next')}
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
    paddingTop: 10,
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
    marginTop: 15,
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
});

export default AddDropDetails;
