import React, {useState} from 'react';
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
import Entypo from 'react-native-vector-icons/Entypo';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChoosePhotoByCameraGallaryModal from '../commonComponent/ChoosePhotoByCameraGallaryModal';
import {
  handleCameraLaunchFunction,
  handleImageLibraryLaunchFunction,
  localizationText,
} from '../../utils/common';
import {useLoader} from '../../utils/loaderContext';
import {addVehicleApi, uploadDocumentsApi} from '../../data_manager';
import BicycleImage from '../../image/Cycle-Icon.png';
import MotorbikeImage from '../../image/Motorbike.png';
import CarImage from '../../image/Car-Icon.png';
import PartnerImage from '../../image/Partner-icon.png';
import VanImage from '../../image/Van-Icon.png';
import PickupImage from '../../image/Pickup-Icon.png';
import TruckImage from '../../image/Truck-Icon.png';
import MiniTruckImage from '../../image/Mini-Truck.png';
import MiniVanImage from '../../image/Mini-Van.png';
import SemiTruckImage from '../../image/Semi-Truck.png';
import BigTruckImage from '../../image/Big-Package.png';

const AddPickupVehicle = ({route, navigation}) => {
  const [vehicleNo, setVehicleNo] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleVariant, setVehicleVariant] = useState('');
  const [isModalVisibleCamera, setModalVisibleCamera] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageFileVehicleReg, setImageFileNameVehicleReg] = useState([]);
  const [imageFileDrivingLicense, setImageFileDrivingLicense] = useState([]);
  const [imageFileVehicleInsurance, setImageFileVehicleInsurance] = useState(
    [],
  );
  const [imageFilePassport, setImageFilePassport] = useState([]);
  const [imageFileUrl, setImageFileUrl] = useState();
  const {setLoading} = useLoader();
  const [errors, setErrors] = useState({});

  const [regDocId, setRegDocId] = useState(null);
  const [drivingLicenseDocId, setDrivingLicenseDocId] = useState(null);
  const [insuranceDocId, setInsuranceDocId] = useState(null);
  const [passportDocId, setPassportDocId] = useState(null);

  const toggleModal = item => {
    setImageFileUrl(item);
    setModalVisibleCamera(!isModalVisibleCamera);
  };
  const handlePhotoOpenClose = visible => {
    setModalVisibleCamera(!visible);
  };

  const updateImageState = imageData => {
    switch (imageFileUrl) {
      case 'VehicleRegistration':
        setImageFileNameVehicleReg(imageData);
        break;
      case 'DrivingLicense':
        setImageFileDrivingLicense(imageData);
        break;
      case 'VehicleInsurance':
        setImageFileVehicleInsurance(imageData);
        break;
      case 'Passport':
        setImageFilePassport(imageData);
        break;
      default:
        console.error('Unknown image type:', imageFileUrl);
    }
  };

  // const uploadImage = async image => {
  //   setLoading(true);
  //   if (image != null) {
  //     var photo = {
  //       uri: image.data.uri,
  //       type: image.data.type,
  //       name: image.data.fileName,
  //     };
  //     const formdata = new FormData();
  //     formdata.append('file', photo);
  //     uploadDocumentsApi(
  //       formdata,
  //       successResponse => {
  //         console.log(successResponse, 'UpoladDocumentApi')
  //         setLoading(false);
  //         if (imageFileUrl === 'VehicleRegistration') {
  //           setRegDocId(JSON.parse(successResponse).id);
  //         } else if (imageFileUrl === 'DrivingLicense') {
  //           setDrivingLicenseDocId(JSON.parse(successResponse).id);
  //         } else if (imageFileUrl === 'VehicleInsurance') {
  //           setInsuranceDocId(JSON.parse(successResponse).id);
  //         } else if (imageFileUrl === 'Passport') {
  //           setPassportDocId(JSON.parse(successResponse).id);
  //         }
  //       },
  //       errorResponse => {
  //         console.log(
  //           'print_data==>errorResponseuploadDocumentsApi',
  //           '' + errorResponse,
  //         );
  //         setLoading(false);
  //         Alert.alert('Error Alert', '' + errorResponse, [
  //           {text: 'OK', onPress: () => {}},
  //         ]);
  //       },
  //     );
  //   } else {
  //     Alert.alert('Error Alert', 'Please choose a picture', [
  //       {text: 'OK', onPress: () => {}},
  //     ]);
  //   }
  // };

  const uploadImage = async image => {
    if (!image) {
      Alert.alert('Error Alert', 'Please choose a picture', [{ text: 'OK', onPress: () => {} }]);
      return; 
    }

    setLoading(true);
    try {
      const photo = {
        uri: image.data.uri,
        type: image.data.type,
        name: image.data.fileName,
      };

      const formdata = new FormData();
      formdata.append('file', photo);

      uploadDocumentsApi(
        formdata,
        successResponse => {
          console.log(successResponse, 'UploadDocumentApi');
          setLoading(false);
          
          const responseData = JSON.parse(successResponse);
          if (imageFileUrl === 'VehicleRegistration') {
            setRegDocId(responseData.id);
          } else if (imageFileUrl === 'DrivingLicense') {
            setDrivingLicenseDocId(responseData.id);
          } else if (imageFileUrl === 'VehicleInsurance') {
            setInsuranceDocId(responseData.id);
          } else if (imageFileUrl === 'Passport') {
            setPassportDocId(responseData.id);
          }
        },
        errorResponse => {
          console.log('print_data==>errorResponseuploadDocumentsApi', errorResponse);
          setLoading(false);
          Alert.alert('Error Alert', "Server busy. Please try again!!!", [{ text: 'OK', onPress: () => {} }]);
        }
      );
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Error Alert', 'Server busy. Please try again!!!', [{ text: 'OK', onPress: () => {} }]);
      setLoading(false);
    }
};


  const handleCameraLaunch = async item => {
    setModalVisibleCamera(!isModalVisibleCamera);
    try {
      let cameraData = await handleCameraLaunchFunction();
      if (cameraData.status == 'success') {
        updateImageState(cameraData.data);
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
      if (imageData.status == 'success') {
        updateImageState(imageData.data);
        uploadImage(imageData);
      }
    } catch (error) {
      // Handle errors here
    }
  };

  const getFileName = uri => {
    if (!uri) return '';
    const startIndex = uri.lastIndexOf('/') + 1;
    let fileName = uri.substr(startIndex);
    // Get last 20 characters or the whole string if shorter
    fileName = fileName.substr(-20);
    return fileName.length > 20 ? '...' + fileName : fileName;
  };

  const validateForm = () => {
    let errors = {};
    if (!vehicleNo.trim()) {
      errors.vehicleNo = 'Vehicle number is required';
    }
    if (!vehicleModel.trim()) {
      errors.vehicleModel = 'Vehicle model is required';
    }
    if (!vehicleMake.trim()) {
      errors.vehicleMake = 'Vehicle make is required';
    }
    if (!vehicleVariant.trim()) {
      errors.vehicleVariant = 'Vehicle Variant is required';
    }
    console.log(errors);
    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = () => {
    const isValid = validateForm();

    if (isValid) {
      let params = {
        delivery_boy_ext_id: route.params.delivery_boy_details.extId,
        vehicle_type_id: route.params.selectedVehicle.vehicle_id,
        plat_no: vehicleNo,
        modal: vehicleModel,
        make: vehicleMake,
        variant: vehicleVariant,
        reg_doc: regDocId,
        driving_license: drivingLicenseDocId,
        insurance: insuranceDocId,
        passport: passportDocId,
      };
      console.log('print_data===>', params);
      setLoading(true);
      addVehicleApi(
        params,
        successResponse => {
          console.log('successResponse', successResponse);
          setLoading(false);
          if (successResponse[0]._success) {
            if (successResponse[0]._response) {
              console.log('print_data==>addVehicle', successResponse[0]);
              if (
                successResponse[0]._response.name == 'NotAuthorizedException'
              ) {
                Alert.alert('Error Alert', successResponse[0]._response.name, [
                  {text: 'OK', onPress: () => {}},
                ]);
              } else if (successResponse[0]._httpsStatusCode == 200) {
                navigation.navigate('ChooseDeliveryType');
              }
            }
          }
        },
        errorResponse => {
          setLoading(false);
          console.log('print_data===>', JSON.stringify(errorResponse));
          // Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          //   {text: 'OK', onPress: () => {}},
          // ]);
        },
      );
    }
  };

  const getVechicleImage = vehicleTypeId => {
    switch (vehicleTypeId) {
      case 1:
        return BicycleImage;
      case 2:
        return MotorbikeImage;
      case 3:
        return CarImage;
      case 4:
        return PartnerImage;
      case 5:
        return VanImage;
      case 6:
        return PickupImage;
      case 7:
        return TruckImage;
      default:
        return BigTruckImage;
    }
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#fbfaf5'}}>
      {console.log(route.params.selectedVehicle.vehicle_id)}
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.headerMiniTruck}>
          <Image
            style={{height: 80, width: 80, resizeMode: 'contain'}}
            source={getVechicleImage(route.params.selectedVehicle.vehicle_id)}
          />
        </View>
        <View style={styles.logFormView}>
          <View style={{flex: 1}}>
            <Text style={styles.textlable}>
              {localizationText('Common', 'vehicleNo')}
            </Text>
            {errors.vehicleNo ? (
              <Text style={[{color: 'red'}]}>{errors.vehicleNo}</Text>
            ) : null}
            <TextInput
              style={styles.inputTextStyle}
              placeholder="Type here"
              placeholderTextColor={'#999'}
              maxLength={10}
              value={vehicleNo}
              onChangeText={text => setVehicleNo(text)}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.textlable}>
              {localizationText('Common', 'vehicleModel')}
            </Text>
            {errors.vehicleModel ? (
              <Text style={[{color: 'red'}]}>{errors.vehicleModel}</Text>
            ) : null}
            <TextInput
              style={styles.inputTextStyle}
              placeholder="Type here"
              placeholderTextColor={'#999'}
              maxLength={18}
              value={vehicleModel}
              onChangeText={text => setVehicleModel(text)}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, marginRight: 10}}>
              <Text style={styles.textlable}>
                {localizationText('Common', 'vehicleMake')}
              </Text>
              {errors.vehicleMake ? (
                <Text style={[{color: 'red'}]}>{errors.vehicleMake}</Text>
              ) : null}
              <TextInput
                style={styles.inputTextStyle}
                placeholder="Type here"
                placeholderTextColor={'#999'}
                maxLength={18}
                value={vehicleMake}
                onChangeText={text => setVehicleMake(text)}
              />
            </View>
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={styles.textlable}>
                {localizationText('Common', 'vehicleVariant')}
              </Text>
              {errors.vehicleVariant ? (
                <Text style={[{color: 'red'}]}>{errors.vehicleVariant}</Text>
              ) : null}
              <TextInput
                style={styles.inputTextStyle}
                placeholder="Type here"
                placeholderTextColor={'#999'}
                maxLength={18}
                value={vehicleVariant}
                onChangeText={text => setVehicleVariant(text)}
              />
            </View>
          </View>
          <View>
            <Text style={styles.uploadDoc}>
              {localizationText('Common', 'uploadDocuments')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => toggleModal('VehicleRegistration')}
            style={{flex: 1}}>
            <Text style={styles.textlable}>
              {localizationText('Common', 'vehicleRegistrationDocument')}
            </Text>
            <View style={styles.dottedLine}>
              <Entypo
                name="attachment"
                size={15}
                color="#131314"
                style={{marginTop: 13}}
              />
              <Text style={styles.tapUploadDoc}>
                {localizationText('Common', 'tapToUpload')}
              </Text>
              <View style={styles.docPathCard}>
                <Text style={styles.docPath}>
                  {imageFileVehicleReg
                    ? getFileName(imageFileVehicleReg.uri)
                    : ''}
                </Text>
                <MaterialCommunityIcons name="close" color="#000" size={20} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleModal('DrivingLicense')}
            style={{flex: 1}}>
            <Text style={styles.textlable}>
              {localizationText('Common', 'drivingLicense')}
            </Text>
            <View style={styles.dottedLine}>
              <Entypo
                name="attachment"
                size={15}
                color="#131314"
                style={{marginTop: 13}}
              />
              <Text style={styles.tapUploadDoc}>
                {localizationText('Common', 'tapToUpload')}
              </Text>
              <View style={styles.docPathCard}>
                <Text style={styles.docPath}>
                  {imageFileDrivingLicense
                    ? getFileName(imageFileDrivingLicense.uri)
                    : ''}
                </Text>
                <MaterialCommunityIcons name="close" color="#000" size={20} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleModal('VehicleInsurance')}
            style={{flex: 1}}>
            <Text style={styles.textlable}>
              {localizationText('Common', 'vehicleInsurance')}
            </Text>
            <View style={styles.dottedLine}>
              <Entypo
                name="attachment"
                size={15}
                color="#131314"
                style={{marginTop: 13}}
              />
              <Text style={styles.tapUploadDoc}>
                {localizationText('Common', 'tapToUpload')}
              </Text>
              <View style={styles.docPathCard}>
                <Text style={styles.docPath}>
                  {imageFileVehicleInsurance
                    ? getFileName(imageFileVehicleInsurance.uri)
                    : ''}
                </Text>
                <MaterialCommunityIcons name="close" color="#000" size={20} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleModal('Passport')}
            style={{flex: 1}}>
            <Text style={styles.textlable}>
              {localizationText('Common', 'passport')}
            </Text>
            <View style={styles.dottedLine}>
              <Entypo
                name="attachment"
                size={15}
                color="#131314"
                style={{marginTop: 13}}
              />
              <Text style={styles.tapUploadDoc}>
                {localizationText('Common', 'tapToUpload')}
              </Text>
              <View style={styles.docPathCard}>
                <Text style={styles.docPath}>
                  {imageFilePassport ? getFileName(imageFilePassport.uri) : ''}
                </Text>
                <MaterialCommunityIcons name="close" color="#000" size={20} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleSubmit();
            }}
            style={[styles.logbutton, {backgroundColor: colors.primary}]}>
            <Text style={styles.buttonText}>
              {localizationText('Common', 'next')}
            </Text>
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
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 12,
    padding: 10,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  dottedLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 8,
    borderWidth: 1,
    backgroundColor: '#FFF',
    borderRadius: 5, // Controls dot size
    borderColor: '#ccc', // Color of the dots
    borderStyle: 'dashed',
    width: '100%', // Full width of the border
  },
  headerMiniTruck: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  uploadDoc: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    marginTop: 15,
  },
  tapUploadDoc: {
    color: '#999',
    marginLeft: 5,
    paddingTop: 10,
    flex: 1,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  docPath: {
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
    borderRightWidth: 1,
    paddingRight: 5,
    fontSize: 12,
    borderColor: '#2C30331A',
  },
  docPathCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC72B26',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 8,
  },
});

export default AddPickupVehicle;
