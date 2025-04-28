import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert, // Import Alert for user feedback
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChoosePhotoByCameraGallaryModal from '../commonComponent/ChoosePhotoByCameraGallaryModal';
import {
  handleCameraLaunchFunction,
  handleImageLibraryLaunchFunction,
} from '../../utils/common';
import {RadioButton, RadioGroup} from 'react-native-radio-buttons-group';
import {useUserDetails} from '../commonComponent/StoreContext';
import {uploadDocumentsApi} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';

const EnterpriseShiftAddDetsils = ({route, navigation}) => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [orderid, setOrderid] = useState('');
  const [number, setNumber] = useState('');
  const [dropdownValue, setDropdownValue] = useState('+33');
  const [pickupNotes, setPickupNotes] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isModalVisibleCamera, setModalVisibleCamera] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [photoFileName, setPhotoFileName] = useState('');
  const [selectedId, setSelectedId] = useState();
  const {userDetails} = useUserDetails();
  const [packageImage, setPackageImage] = useState(null);
  const [packageImageId, setPackageImageId] = useState(null);
  const {setLoading} = useLoader();

  const toggleModal = () => {
    setModalVisibleCamera(!isModalVisibleCamera);
  };
  const handlePhotoOpenClose = visible => {
    setModalVisibleCamera(!visible);
  };

  const data = [
    {label: '+33', value: '+33'},
  ];

  const uploadImage = async packageImage => {
    var photo = {
      uri: packageImage?.data?.uri,
      type: packageImage?.data?.type,
      name: packageImage?.data?.fileName,
    };
    const formdata = new FormData();
    formdata.append('file', photo);
    setLoading(true);
    uploadDocumentsApi(
      formdata,
      successResponse => {
        setLoading(false);
        console.log(
          'print_data==>successResponseuploadDocumentsApi',
          '' + JSON.parse(successResponse).id,
        );
        setPackageImageId(JSON.parse(successResponse).id);
      },
      errorResponse => {
        console.log(
          'print_data==>errorResponseuploadDocumentsApi',
          '' + errorResponse,
        );
        setLoading(false);
        Alert.alert('Error Alert', 'Server busy. Please try again!!!', [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  };

  const handleCameraLaunch = async () => {
    setModalVisibleCamera(!isModalVisibleCamera);
    try {
      let cameraData = await handleCameraLaunchFunction();
      if (cameraData.status === 'success') {
        console.log('print_data===>', '' + JSON.stringify(cameraData.data.uri));
        setPhotoFileName(getFileName(cameraData.data.uri));
        setPackageImage(cameraData);
        uploadImage(cameraData);
      }
    } catch (error) {
      // Handle errors here
    }
  };

  const handleImageLibraryLaunch = async () => {
    setModalVisibleCamera(!isModalVisibleCamera);
    try {
      let imageData = await handleImageLibraryLaunchFunction();
      if (imageData.status === 'success') {
        console.log('print_data===>', imageData);
        setPhotoFileName(getFileName(imageData.data.uri));
        setPackageImage(imageData);
        uploadImage(cameraData);
      }
    } catch (error) {
      // Handle errors here
    }
  };

  const getFileName = uri => {
    if (!uri) return '';
    const startIndex = uri.lastIndexOf('/') + 1;
    let fileName = uri.substr(startIndex);
    fileName = fileName.substr(-35);
    return fileName.length > 35 ? '...' + fileName : fileName;
  };

  useEffect(() => {
    if (selectedId === '1') {
      const updatedNumber = userDetails.userInfo.phone_number
        ? userDetails.userInfo.phone_number.startsWith('+91')
          ? userDetails.userInfo.phone_number.slice(3)
          : userDetails.userInfo.phone_number
        : null;
      setName(
        userDetails.userDetails[0].first_name
          ? userDetails.userDetails[0].first_name
          : '',
      );
      setLastname(
        userDetails.userDetails[0].last_name
          ? userDetails.userDetails[0].last_name
          : '',
      );
      setEmail(userDetails.userInfo.email ? userDetails.userInfo.email : '');
      setNumber(updatedNumber);
    } else {
      setName('');
      setLastname('');
      setEmail('');
      setNumber('');
    }
  }, [selectedId]);

  const validateForm = () => {
    if (
      !name ||
      !lastname ||
      !email ||
      !number ||
      !dropdownValue ||
      !orderid ||
      !pickupNotes
    ) {
      Alert.alert('Validation Error', 'Please fill all the required fields.');
      return false;
    }
    return true;
  };

  //   const handleNextPress = () => {
  //     if (validateForm()) {
  //       let userDetails = {
  //         name: name,
  //         lastname: lastname,
  //         email: email,
  //         number: number,
  //         company: company,
  //         pickupNotes: pickupNotes,
  //       };
  //       if (packageImageId) {
  //         userDetails.package_photo = packageImageId;
  //       }
  //       route.params.userDetails = userDetails;
  //       navigation.navigate('PickupOrderPreview', {props: route.params});
  //     }
  //   };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.logFormView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, marginRight: 10}}>
              <Text style={styles.textlable}>First name*</Text>
              <TextInput
                style={styles.inputTextStyle}
                placeholderTextColor="#999"
                placeholder="Type here"
                value={name}
                onChangeText={text => setName(text)}
              />
            </View>

            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={styles.textlable}>Last name*</Text>
              <TextInput
                style={styles.inputTextStyle}
                placeholderTextColor="#999"
                placeholder="Type here"
                value={lastname}
                onChangeText={text => setLastname(text)}
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.textlable}>Company</Text>
            <TextInput
              style={styles.inputTextStyle}
              placeholderTextColor="#999"
              placeholder="Type here"
              value={company}
              onChangeText={text => setCompany(text)}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.textlable}>Email*</Text>
            <TextInput
              style={styles.inputTextStyle}
              placeholderTextColor="#999"
              placeholder="Type here"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View>
            <Text style={styles.textlable}>Phone number*</Text>
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
                maxLength={11}
                value={number}
                onChangeText={text => setNumber(text)}
              />
            </View>
          </View>
          <TouchableOpacity onPress={toggleModal} style={{flex: 1}}>
            <Text style={styles.textlable}>Package photo</Text>
            <View style={styles.dottedLine}>
              <Entypo
                name="attachment"
                size={13}
                color="#131314"
                style={{marginTop: 13}}
              />
              <Text style={styles.packagePhoto}>Package photo</Text>
              <View style={styles.packagePhotoPath}>
                <Text style={styles.packagePhotoText}>{photoFileName}</Text>
                <MaterialCommunityIcons
                  onPress={() => {
                    setPhotoFileName(null);
                  }}
                  name="close"
                  color="#000"
                  size={13}
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <Text style={styles.textlable}>Package ID*</Text>
            <TextInput
              style={styles.inputTextStyle}
              placeholderTextColor="#999"
              placeholder="Type here"
              value={orderid}
              onChangeText={text => setOrderid(text)}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.textlable}>Pickup notes*</Text>
            <TextInput
              style={styles.inputTextStyle}
              multiline={true}
              numberOfLines={4}
              placeholderTextColor="#999"
              placeholder="Type here"
              textAlignVertical="top"
              value={pickupNotes}
              onChangeText={text => setPickupNotes(text)}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('EnterpriseShiftOrderPreview')}
            style={[styles.logbutton, {backgroundColor: colors.primary}]}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* -------------- Modal --------------------- */}
      <ChoosePhotoByCameraGallaryModal
        visible={isModalVisibleCamera}
        handlePhotoOpenClose={handlePhotoOpenClose}
        handleCameraLaunch={handleCameraLaunch}
        handleImageLibraryLaunch={handleImageLibraryLaunch}
      />
      {/* -------------- Modal --------------------- */}
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

export default EnterpriseShiftAddDetsils;
